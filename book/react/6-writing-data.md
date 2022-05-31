---
title: 6 - Writing Data | React
pagination_next: exercise-wrap-up
---
import Chat from '../_chat.mdx';

# 6 - Writing Data

In this chapter we'll move on to our next new feature. We'll follow the process of outside-in TDD once again, with an outer and inner red-green-refactor loop. We'll also see how to tackle some of the unique challenges that arise when testing forms and when saving data to an API.

This work is represented by the next story in Trello, "Add Restaurants". Drag it to "In Progress".

When we did the "Load Restaurants" story we saved the edge cases for a separate story, as a way to take smaller steps. Now that we have some practice with these techniques, we'll handle both the main functionality and edge cases under the same story.

## Main Functionality

Create a new branch for this story:

```sh
$ git checkout -b creating-a-restaurant
```

It's been a while since we wrote a new E2E test because the last few chapters were all focused on a single user-facing features. But now that we're building a new feature, we follow the outside-in TDD loop, starting with creating an E2E test that specifies that feature.

### End-to-End Test

Create a file `cypress/integration/creating-a-restaurant.spec.js` and add the following:

```js
describe('Creating a Restaurant', () => {
  it('allows adding restaurants', () => {
    const restaurantId = 27;
    const restaurantName = 'Sushi Place';

    cy.intercept(
      'GET',
      'https://outside-in-dev-api.herokuapp.com/*/restaurants',
      [],
    );

    cy.intercept(
      'POST',
      'https://outside-in-dev-api.herokuapp.com/*/restaurants',
      {
        id: restaurantId,
        name: restaurantName,
      },
    ).as('addRestaurant');

    cy.visit('/');

    cy.get('[placeholder="Add Restaurant"]').type(restaurantName);
    cy.contains('Add').click();

    cy.wait('@addRestaurant').its('request.body').should('deep.equal', {
      name: restaurantName,
    });

    cy.contains(restaurantName);
  });
});
```

As in our previous E2E test, we stub the GET request to load the restaurants. This time we don't need any pre-existing restaurants for the test, so we return an empty array.

We also configure Cypress to intercept a POST request, which is the request we'll use to create a restaurant. From that request, we return an object containing the data for the new restaurant that is created. After we call `cy.intercept()` we chain on a call to `.as()`, which allows us to give the request the name `addRestaurant`. We'll see why this name is useful in a moment.

We visit the home page, and this time we interact with the page:

- We find an element with a placeholder of "Add Restaurant" (so, presumably a text input), and we type a restaurant name into it.
- We find an element "Add" and click it.

Next, we call `cy.wait()`, which waits for an HTTP request to be sent. We pass the name of the request we want to wait for, prepending an `@` to it—our `addRestaurant` request in this case. The reason we call `cy.wait()` here is to make an assertion on the request that was sent: checking that the restaurant name is correctly sent in the body of the request. In Cypress, this kind of check is done with a declarative approach: chaining the `.its()` method call to retrieve the property `'request.body'`, then chaining the `.should()` method call to do a `'deep.equal'` comparison. (To learn more, check out Cypress's docs for [its()](https://docs.cypress.io/api/commands/its), [should()](https://docs.cypress.io/api/commands/should), and [BDD Assertions](https://docs.cypress.io/guides/references/assertions#BDD-Assertions).)

The reason we're making an assertion on the request body is because, for API calls that change data on the backend, it's not enough to stub the request to return the data the application expects. If the application sent the wrong data to the backend then it would not be saved correctly, so we need to confirm our app is sending the *right* data.

:::tip
If you've used other E2E testing tools, you may have bad memories of `wait` statements. Older test tools require you to `wait` to prevent timing issues, and those `wait` statements clutter up your test, slow it down, and can introduce flake. Cypress doesn't need `wait` statements for any of those reasons: Cypress will automatically retry commands up to a configured timeout to give network requests, animations, and other operations time to finish. As a result, Cypress tests tend to be less cluttered, faster, and more robust than those of older E2E tools.

In this case, for example, even if we removed the `cy.wait()` statement, the `cy.contains(restaurantName)` check would still succeed even if it takes a few seconds for a network request to finish. We don't need `cy.wait()` to give the network request time; we only need it to get access to the request to make an assertion, as described above.
:::

Finally, we confirm that the restaurant name is shown on the page, showing that the restaurant has been added to the list.

Start your app with `yarn start`, then start Cypress with `yarn cypress`. Choose the "Creating a Restaurant" test. It fails, showing the first bit of functionality we need to implement:

> CypressError: Timed out retrying after 4000ms: Expected to find element: '[placeholder="Add Restaurant"]', but never found it.

We need an "Add Restaurant" text input. What component should it be in? We discussed in ["Vertical Slice"](./3-vertical-slice.md) that `RestaurantScreen` would hold both the restaurant list and new restaurant form. The text input should live in the New Restaurant Form, so it's time to create that component.

Create the file `src/components/NewRestaurantForm.js`, and add the following:

```js
import TextField from '@mui/material/TextField';

export function NewRestaurantForm() {
  return (
    <form>
      <TextField placeholder="Add Restaurant" fullWidth variant="filled" />
    </form>
  );
}

export default NewRestaurantForm;
```

Note a few things:

- We're using MUI's `TextField` component instead of a plain `<input type="text" />`
- We're exporting the form both as a named and default export. This is because we'll be connecting the default export to Redux, and we know we'll want the unconnected component for testing

Next, add the form to the `RestaurantScreen` component:

```diff
 import RestaurantList from './RestaurantList';
+import NewRestaurantForm from './NewRestaurantForm';

 export default function RestaurantScreen() {
   return (
     <Card>
       <CardContent>
         <Typography variant="h5">Restaurants</Typography>
+        <NewRestaurantForm />
         <RestaurantList />
```

Rerun the E2E tests and they should successfully find and type into the "Add Restaurant" input. The next error is:

> CypressError: Timed out retrying after 4000ms: Expected to find content: 'Add' but never did.

To fix this error, we add a button to `NewRestaurantForm` but don't wire it up to anything yet:

```diff
 import TextField from '@mui/material/TextField';
+import Button from '@mui/material/Button';

 export function NewRestaurantForm() {
   return (
     <form>
       <TextField placeholder="Add Restaurant" fullWidth variant="filled" />
+      <Button variant="contained" color="primary">
+        Add
+      </Button>
     </form>
   );
```

Rerun the E2E tests and we get this failure:

> CypressError: Timed out retrying after 5000ms: cy.wait() timed out waiting 5000ms for the 1st request to the route: 'addRestaurant'. No request ever occurred.

So now we need to send the request is our backend service. This is missing logic, so we will want to step down to unit tests to add it. How will it work?

- The `NewRestaurantForm` component will dispatch an asynchronous Redux action.
- The action will call a function in our API client.
- The API client will make an HTTP `POST` request.

### Unit Testing the Component

Starting from the outside as usual, we'll start with the `NewRestaurantForm` component. We want to reproduce the E2E tests's failure at the unit level. We should specify that when you click the send button a function prop is called—a function which in production will be wired to an action in our store. Now, the E2E test failure didn't tell us that we need to send along the restaurant name entered in the form, but we can go ahead and specify that, too.

Create the file `src/components/NewRestaurantForm.spec.js` and start out by setting up the component and a mock function in a `renderComponent` helper function:

```js
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {NewRestaurantForm} from './NewRestaurantForm';

describe('NewRestaurantForm', () => {
  const restaurantName = 'Sushi Place';

  let createRestaurant;

  function renderComponent() {
    createRestaurant = jest.fn().mockName('createRestaurant');
    render(<NewRestaurantForm createRestaurant={createRestaurant} />);
  }
});
```

Next, let's try to proactively organize our test file. Since we're taking the approach of having one behavior per test, it's likely that we will ultimately have multiple tests for each situation. So let's group situations with a `describe` block with a situation-specific setup helper function, even there there will only be one expectation at first. Add the following:

```js
describe('when filled in', () => {
  async function fillInForm() {
    renderComponent();
    await userEvent.type(
      screen.getByPlaceholderText('Add Restaurant'),
      restaurantName,
    );
    userEvent.click(screen.getByText('Add'));
  }

  it('calls createRestaurant with the name', async () => {
    await fillInForm();
    expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
  });
});
```

We describe the situation when the form is filled in. We enter a restaurant name into a text field, then click the submit button. Note that `userEvent.type()` requires `await`ing afterward, but `userEvent.click()` does not.

Note that we now have two levels of helper functions: our test calls `fillInForm()`, which in turn calls `renderComponent()`. After rendering is complete, `fillInForm()` simulates the user actions of filling in the form, then our test runs an expectation. We'll see below that other `describe` blocks will have other helper functions, each of which calls `renderComponent()`. In cases like this with nontrivial setup, using explicit helper functions instead of `beforeEach` blocks can make it easier to follow what's going on.

In `RestaurantList` we didn't pass any arguments to our function prop, so all we had to confirm was that it was called. But in this test we need to ensure the restaurant name is passed as an argument to the action function, and we can do that with the `.toHaveBeenCalledWith()` matcher. We pass one argument to it, confirming that the correct `restaurantName` is passed through.

Save the file and we get an assertion failure:

```sh
  ● NewRestaurantForm › when filled in › calls createRestaurant with the name

    expect(createRestaurant).toHaveBeenCalledWith(...expected)

    Expected: "Sushi Place"

    Number of calls: 0

      26 |     it('calls createRestaurant with the name', async () => {
      27 |       await fillInForm();
    > 28 |       expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
         |                                ^
```

The test failure reports the action wasn't called at all. This is because our button isn't currently hooked up to anything. The typical way to set this up in HTML forms is to make the button a `submit` button, so it submits the form:

```diff
 <form>
   <TextField placeholder="Add Restaurant" fullWidth variant="filled" />
-  <Button variant="contained" color="primary">
+  <Button type="submit" variant="contained" color="primary">
     Add
   </Button>
 </form>
```

Now, write just enough production code to get past the current test failure, let's just call the action without any arguments:

```diff
 import Button from '@mui/material/Button';

-export function NewRestaurantForm() {
+export function NewRestaurantForm({createRestaurant}) {
   return (
-    <form>
+    <form onSubmit={() => createRestaurant()}>
       <TextField placeholder="Add Restaurant" fullWidth variant="filled" />
```

We set up an `onSubmit` prop for the form tag, passing an arrow function that calls `createRestaurant`. Why not just pass the `createRestaurant` function to `onSubmit` directly? The reason is that React passes the browser event object as an argument to the `onSubmit` function. We don't want that argument to be passed, and in fact our `.toHaveBeenCalledWith()` matcher would detect that argument, fail, and show it to us in verbose error output. By wrapping `createRestaurant` in an arrow function we can ensure it's called with no arguments.

Save the file and now we get this test error:

```sh
Error: Not implemented: HTMLFormElement.prototype.submit
    at module.exports (/Users/josh/apps/agilefrontend/react/node_modules/jsdom/
    lib/jsdom/browser/not-implemented.js:9:17)
```

It isn't obvious what's going on at first glance, but the problem is that the HTML form is attempting use the default browser mechanism of submitting to the server and refreshing the page. (The reason for this default behavior is that HTML forms predate using JavaScript to make HTTP requests.)

To prevent this default form submission behavior, we need to call the `preventDefault()` method on the event sent to the `onSubmit` event. We can do this by extracting a handler function:

```diff
 export const NewRestaurantForm = ({createRestaurant}) => {
+  function handleSubmit(e) {
+    e.preventDefault();
+    createRestaurant();
+  }
+
   return (
-    <form onSubmit={() => createRestaurant()}>
+    <form onSubmit={handleSubmit}>
       <TextField placeholder="Add Restaurant" fullWidth variant="filled" />
```

Save the file and the test failure has changed:

```sh
  ● NewRestaurantForm › when filled in › calls createRestaurant with the name

    expect(createRestaurant).toHaveBeenCalledWith(...expected)

    Expected: "Sushi Place"
    Received: called with 0 arguments

    Number of calls: 1
```

Now the `createRestaurant` function is successfully called—note the "Number of calls: 1". The problem is that the function didn't receive the argument it expected: it wanted "Sushi Place", but it didn't receive any arguments.

To pass the restaurant name to `createRestaurant`, first we're going to need to set up a state item to track that name:

```diff
+import {useState} from 'react';
 import TextField from '@mui/material/TextField';
 import Button from '@mui/material/Button';

 export function NewRestaurantForm({createRestaurant}) {
+  const [name, setName] = useState('');
+
   function handleSubmit(e) {
```

Then, we'll make `TextField` a controlled component, reading its value from the `name` state item and writing changes back using `setName` in the normal React way:

```diff
 return (
   <form onSubmit={handleSubmit}>
-    <TextField placeholder="Add Restaurant" fullWidth variant="filled" />
+    <TextField
+      value={name}
+      onChange={e => setName(e.target.value)}
+      placeholder="Add Restaurant"
+      fullWidth
+      variant="filled"
+    />
    <Button type="submit" variant="contained" color="primary">
```

Finally, now that the entered text is stored in the `name` variable, we'll pass that as the argument to `createRestaurant()`:

```diff
 function handleSubmit(e) {
   e.preventDefault();
-  createRestaurant();
+  createRestaurant(name);
 };
```

Save the file and the test passes.

### Stepping Back Up

We'll want to add some more edge case functionality to the form at some point, but not right now. Remember the two-level outside-in TDD loop: we've finished test-driving the functionality the E2E test drove us to, so it's time to step back up to the E2E test to see what functionality it directs us to implement next.

Rerun the E2E test and you should see the following failure:

```sh
TypeError: createRestaurant is not a function
```

`createRestaurant` is not defined because we aren't passing it in to `NewRestaurantForm` as a prop. This is just a structural error, not a logic error, so let's fix this error directly instead of stepping down to a unit test yet.

We want the `createRestaurant` prop to be provided by Redux and correspond to a `createRestaurant` action that we don't have yet. Let's write the code we wish we had, importing that `createRestaurant` action. We'll direct Redux to connect it to our component, then we'll make that connected component the default export:

```diff
 import {useState} from 'react';
+import {connect} from 'react-redux';
 import TextField from '@mui/material/TextField';
 import Button from '@mui/material/Button';
+import {createRestaurant} from '../store/restaurants/actions';

 export function NewRestaurantForm({createRestaurant}) {
...
 }

-export default NewRestaurantForm;
+const mapStateToProps = null;
+const mapDispatchToProps = {createRestaurant};
+
+export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
```

Next we need to define that `createRestaurant` action that we wish we had. Add it in `src/store/restaurants/actions.js`. Because we know this will be an async action, we can go ahead and implement it as a thunk:

```js
export const createRestaurant = () => () => {};
```

Rerun the E2E test, and it fails on a new error:

> CypressError: Timed out retrying after 5000ms: cy.wait() timed out waiting 5000ms for the 1st request to the route: 'addRestaurant'. No request ever occurred.

Now our component is correctly calling our `createRestaurant` async action, but that function isn't doing anything. We need it to make the appropriate call to the API, then dispatch an action that results in the reducer adding the new restaurant to the list. That's a logic error, so it's time to step down to a unit test to drive out our store functionality.

### Unit Testing the Store

In `src/store/restaurants.spec.js`, below the "loadRestaurants action" group, add a "createRestaurant action" group, and write a test to confirm the API is called:

```js
describe('createRestaurant action', () => {
  const newRestaurantName = 'Sushi Place';

  let api;
  let store;

  beforeEach(() => {
    api = {
      createRestaurant: jest.fn().mockName('createRestaurant'),
    };

    const initialState = {};

    store = createStore(
      restaurantsReducer,
      initialState,
      applyMiddleware(thunk.withExtraArgument(api)),
    );
  });

  it('saves the restaurant to the server', () => {
    store.dispatch(createRestaurant(newRestaurantName));
    expect(api.createRestaurant).toHaveBeenCalledWith(newRestaurantName);
  });
});
```

We'll need to add a second expectation shortly so we go ahead and put the setup a `beforeEach`.

We also need to import `createRestaurant`:

```diff
 import restaurantsReducer from './restaurants/reducers';
-import {loadRestaurants} from './restaurants/actions';
+import {loadRestaurants, createRestaurant} from './restaurants/actions';

 describe('restaurants', () => {
```

Save the file, and the test fails because the API method was not called:

```sh
  ● restaurants › createRestaurant action › saves the restaurant to the server

    expect(createRestaurant).toHaveBeenCalledWith(...expected)

    Expected: "Sushi Place"

    Number of calls: 0
```

Update the `createRestaurant` thunk to call it:

```diff
-export const createRestaurant = () => () => {};
+export const createRestaurant = () => async (dispatch, getState, api) => {
+  await api.createRestaurant();
+};
```

This changes the test failure. Now the method is called, but not with the right arguments:

```sh
● restaurants › createRestaurant action › saves the restaurant to the server

    expect(createRestaurant).toHaveBeenCalledWith(...expected)

    Expected: "Sushi Place"
    Received: called with 0 arguments

    Number of calls: 1
```

Our restaurant name is passed in as the first argument of the action, so we can pass it along to the API method:

```diff
-export const createRestaurant = () => async (dispatch, getState, api) => {
+export const createRestaurant = name => async (dispatch, getState, api) => {
-  await api.createRestaurant();
+  await api.createRestaurant(name);
};
```

Save the file and the test passes.

Now we need to specify one more thing that happens when the `create` action is dispatched: the returned restaurant from the API is appended to the restaurant list in the state. To write that test, we're going to need to add a little to the setup as well:

```diff
 describe('createRestaurant action', () => {
   const newRestaurantName = 'Sushi Place';
+  const existingRestaurant = {id: 1, name: 'Pizza Place'};
+  const responseRestaurant = {id: 2, name: newRestaurantName};

   let api;
   let store;

   beforeEach(() => {
     api = {
       createRestaurant: jest.fn().mockName('createRestaurant'),
     };

-    const initialState = {};
+    const initialState = {records: [existingRestaurant]};

     store = createStore(
```

This adds a restaurant to the pre-existing list of restaurants in the store. Save the file and the tests should still pass.

Now we're ready to specify that the returned restaurant is added to the store. Let's add it in a "describe" block:

```js
describe('when save succeeds', () => {
  beforeEach(() => {
    api.createRestaurant.mockResolvedValue(responseRestaurant);
    return store.dispatch(createRestaurant(newRestaurantName));
  });

  it('stores the returned restaurant in the store', () => {
    expect(store.getState().records).toEqual([
      existingRestaurant,
      responseRestaurant,
    ]);
  });
});
```

We ensure that the existing restaurant is still in the store, and the restaurant record returned from the server is added after it. Save the file and the test fails:

```sh
● restaurants › createRestaurant action › when save succeeds › stores the
returned restaurant in the store

  expect(received).toEqual(expected) // deep equality

  - Expected  - 4
  + Received  + 0

    Array [
      Object {
        "id": 1,
        "name": "Pizza Place",
      },
  -   Object {
  -     "id": 2,
  -     "name": "Sushi Place",
  -   },
    ]
```

The store only contains the restaurant it was initialized with, not the new one the server responds with. Let's update `createRestaurant` to handle the server response data:

```diff
 export const RECORD_LOADING_ERROR = 'RECORD_LOADING_ERROR';
+export const ADD_RESTAURANT = 'ADD_RESTAURANT';

 export const loadRestaurants = () => async (dispatch, getState, api) => {
...
 export const createRestaurant = name => async (dispatch, getState, api) => {
-  await api.createRestaurant(name);
+  const record = await api.createRestaurant(name);
+  dispatch(addRestaurant(record));
 };
+
+const addRestaurant = record => ({
+  type: ADD_RESTAURANT,
+  record,
+});
```

After `createRestaurant()` resolves, we take the record the API returns to us and dispatch a new `addRestaurant()` action. Now let's handle that action in the reducer:

```diff
   RECORD_LOADING_ERROR,
+  ADD_RESTAURANT,
 } from './actions';
...
 function records(state = [], action) {
   switch (action.type) {
     case STORE_RESTAURANTS:
       return action.records;
+    case ADD_RESTAURANT:
+      return [...state, action.record];
     default:
       return state;
   }
 };
```

When `ADD_RESTAURANT` is dispatched we set records to a new array including the previous array, plus the new record on the end.

Save and all unit tests pass. Our store should now successfully handle creating a new restaurant.

### Creating the API Method

Let's step back up to the E2E level and see if the E2E test has gotten past the previous failure. When we rerun it, we still get the same failure:

> CypressError: Timed out retrying: cy.wait() timed out waiting 5000ms for the 1st request to the route: 'addRestaurant'. No request ever occurred.

What's the cause this time? If you look a little further down in the Cypress test window, you should see:

```sh
TypeError: api.createRestaurant is not a function
```

Our component is successfully dispatching the action to the store, which is successfully calling `api.createRestaurant()`, but we haven't implemented it yet. Let's do that now. Remember, as we discussed in ["Vertical Slice"](./3-vertical-slice.md), we're implementing our API client directly in response to the E2E test, instead of unit testing it.

Let's start by fixing the immediate error by defining an empty `createRestaurant()` method:

```diff
 const api = {
   async loadRestaurants() {
     const response = await client.get('/restaurants');
     return response.data;
   },
+  async createRestaurant() {},
 };
```

When we rerun the E2E test, we get another error:

```sh
TypeError: Cannot read properties of undefined (reading 'name')
```

We aren't getting a name value back from the function, because we still aren't making the HTTP request that kicked off this whole sequence. Fixing this will move us forward better, so let's actually make the HTTP request in the API:

```diff
   },
-  async createRestaurant() {},
+  async createRestaurant() {
+    const response = await client.post('/restaurants', {});
+    return response.data;
+  },
 };
```

Now the `POST` request is made, and we get an error on the assertion we made about the request's body:

> ASSERT expected {} to deeply equal { name: Sushi Place }

So we aren't passing the restaurant name in the `POST` body. That's easy to fix by passing it along from the argument to the method:

```diff
 async createRestaurant() {
   const response = await client.post('/restaurants', {});
   return response.data;
 },
-async createRestaurant() {
+async createRestaurant(name) {
-  const response = await client.post('/restaurants', {});
+  const response = await client.post('/restaurants', {name});
   return response.data;
 },
```

Rerun the E2E test and it passes, and we see Sushi Place added to the restaurant list. Our feature is complete!

Open your app in the browser and try out creating a restaurant for real. Reload the page to make sure it's really persisted to the server.

![Restaurant created](./images/5-1-restaurant-created.png)

## Edge Cases

Now let's think about what edge cases we need to handle. Here are a few:

* The form should clear out the text field after you save a restaurant.
* If the form is submitted with an empty restaurant name, it should show a validation error, and not submit to the server.
* If the request to the server fails an error message should be shown, and the restaurant name should not be cleared.

### Clearing the Text Field

First, let's implement the form clearing out the text field after saving. In `NewRestaurantForm.spec.js`, add a new test:

```diff
describe('when filled in', () => {
...
   it('calls createRestaurant with the name', async () => {
     await fillInForm();
     expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
   });
+
+  it('clears the name', async () => {
+    await fillInForm();
+    expect(screen.getByPlaceholderText('Add Restaurant').value).toEqual('');
+  });
 });
```

Save the test, and we get a test failure confirming that the text field is not yet cleared:

```sh
  ● NewRestaurantForm › when filled in › clears the name

    expect(received).toEqual(expected) // deep equality

    Expected: ""
    Received: "Sushi Place"
```

To make this pass, we need to clear the text field—but where exactly should we write the code to do that? We could clear it before or after calling `createRestaurant()`.

Let's think about what we know right now. We wrote down another upcoming edge case scenario that says the name should *not* be cleared if the web service call fails. But of course we won't know if that call failed or not until after the call is made. That suggests we should clear the text field *after* the call to `createRestaurant`, not before. We don't want to actually add that check for failure until a future test drives us to it, but it *is* okay for us to use that knowledge to decide where to put the code to clear the text field.

Make this change in `NewRestaurantForm.js`:

```diff
-function handleSubmit(e) {
+async function handleSubmit(e) {
   e.preventDefault();
-  createRestaurant(name);
+  await createRestaurant(name);
+  setName('');
 }
```

Save the file but notice that the assertion failure doesn't change. The reason is because our mocked `api.createRestaurant` isn't configured to resolve, so `setName('')` is never reached. Let's fix this:

```diff
 async function fillInForm() {
   renderComponent();
+  createRestaurant.mockResolvedValue();
   await userEvent.type(
```

Save and the test now passes, but we get a warning:

```sh
Warning: An update to NewRestaurantForm inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});

/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser.
```

What exactly is going on here is complex and beyond the scope of this tutorial. Specifically in this case, the React component state is being updated asynchronously, and React is warning us that we may have timing issues.

In this specific case, the easiest fix is to use the `flush-promises` npm package. Add it to your project:

```sh
$ yarn add --dev flush-promises@1.0.2
```

Then add it to your test:

```diff
-import {render, screen} from '@testing-library/react';
+import {act, render, screen} from '@testing-library/react';
 import userEvent from '@testing-library/user-event';
+import flushPromises from 'flush-promises';
 import {NewRestaurantForm} from './NewRestaurantForm';
...
     async function fillInForm() {
...
       userEvent.click(screen.getByText('Add'));
+
+      return act(flushPromises);
     }
```

We call `act()` at the end of our `fillInForm()` helper, passing it the `flushPromises` function. This means that React will call that function and wait for it to resolve, responding to component changes that may have happened appropriately. We return the result of `act`, so that Jest will wait on *that* before running individual tests.

Save the file and our test finally passes cleanly!

If you add a new restaurant in the browser, now you'll see the name field cleared out afterward:

![Name field cleared after submission](./images/5-2-name-field-cleared.png)

### Validation Error

The next edge case for us to handle is:

- If the form is submitted with an empty restaurant name, it should show a validation error, and not submit to the server.

We'll start with the component test. Create a new `describe` block for this situation, below the "when filled in" describe block. Let's write one assertion at a time. First, we'll confirm a validation error message is shown:

```js
describe('when empty', () => {
  async function submitEmptyForm() {
    renderComponent();

    userEvent.click(screen.getByText('Add'));

    return act(flushPromises);
  }

  it('displays a validation error', async () => {
    await submitEmptyForm();
    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });
});
```

Note that we don't type into the text field; this ensures it will keep the default value, which is the empty string.

Save the file and the test fails, because the validation error message is not found:

```sh
  ● NewRestaurantForm › when empty › displays a validation error

    TestingLibraryElementError: Unable to find an element with the text: Name
    is required.
```

Let's fix this error in the simplest way possible by adding the validation error unconditionally:

```diff
 import Button from '@mui/material/Button';
+import Alert from '@mui/material/Alert';
 import {createRestaurant} from './store/restaurants/actions';
...
   return (
     <form onSubmit={handleSubmit}>
+      <Alert severity="error">Name is required</Alert>
       <TextField
```

The tests pass. Now how can we write a test to drive out hiding that validation error in other circumstances? Well, we can check that it's not shown when the form is first rendered.

In preparation, let's move the validation error text we're searching for to a constant directly under our top-level `describe`:

```diff
 describe('NewRestaurantForm', () => {
   const restaurantName = 'Sushi Place';
+  const requiredError = 'Name is required';
+
   let createRestaurant;
...
     it('displays a validation error', async () => {
       await submitEmptyForm();
-      expect(screen.getByText('Name is required')).toBeInTheDocument();
+      expect(screen.getByText(requiredError)).toBeInTheDocument();
     });
```

Save and confirm the tests still pass.

Next, add a new `describe` above the "when filled in" one:

```js
describe('initially', () => {
  it('does not display a validation error', () => {
    renderComponent();
    expect(screen.queryByText(requiredError)).not.toBeInTheDocument();
  });
});
```

The test fails because we are always showing the error right now:

```sh
  ● NewRestaurantForm › initially › does not display a validation error

    expect(element).not.toBeInTheDocument()

    expected document not to contain element, found
    <div class="MuiAlert-message css-acap47-MuiAlert-message">Name is required</div>
    instead
```

Time to add some logic around this error. First, we'll add state to record whether it should be shown:

```diff
 export function NewRestaurantForm({createRestaurant}) {
   const [name, setName] = useState('');
+  const [validationError, setValidationError] = useState(false);

   async function handleSubmit(e) {
...
   return (
     <form onSubmit={handleSubmit}>
-      <Alert severity="error">Name is required</Alert>
+      {validationError && <Alert severity="error">Name is required</Alert>}
       <TextField
```

Now, what logic should we use to set the `validationError` flag? Our tests just specify that initially the error is not shown, and after submitting an invalid form it's shown—that's all. The simplest logic to pass this test is to always show the validation error after saving:

```diff
 async function handleSubmit(e) {
   e.preventDefault();
+  setValidationError(true);
   await createRestaurant(name);
```

Save the file and all tests pass.

This is not the correct final logic, which may feel obvious to you. That should drive us to consider what test we are missing. What should behave differently? Well, when we submit a form with a name filled in, the validation error should not appear. Let's add that test to the "when filled in" `describe` block:

```js
it('does not display a validation error', async () => {
  await fillInForm();
  expect(screen.queryByText(requiredError)).not.toBeInTheDocument();
});
```

We can pass this test by adding a conditional around setting the `validationError` flag:

```diff
 async function handleSubmit(e) {
   e.preventDefault();
+
+  if (!name) {
     setValidationError(true);
+  }
+
   await createRestaurant(name);
```

Save the file and all tests pass.

Now, is there any other time we would want to hide or show the validation error? Well, if the user submits an empty form, gets the error, then adds the missing name and submits it again, we would want the validation error cleared out. Let's create this scenario as another `describe` block, below the "when empty" one:

```js
describe('when correcting a validation error', () => {
  async function fixValidationError() {
    renderComponent();
    createRestaurant.mockResolvedValue();

    userEvent.click(screen.getByText('Add'));

    await userEvent.type(
      screen.getByPlaceholderText('Add Restaurant'),
      restaurantName,
    );
    userEvent.click(screen.getByText('Add'));

    return act(flushPromises);
  }

  it('clears the validation error', async () => {
    await fixValidationError();
    expect(screen.queryByText(requiredError)).not.toBeInTheDocument();
  });
});
```

Note that we repeat the steps from the helper functions from *both* other groups, first submitting the form empty and then submitting it filled in.

:::tip
Sometimes it can be tempting for developers to try to make one test run "after" another test so they can reuse the first test's end state. For example, in this case, we need to test out clearing a validation error, and we already have another test that causes a validation error. It seems duplicative to copy the validation-error-causing code here. Can we make this test run after the validation-error test?

No, we should not try to sequence our tests and reuse state, because it's important for unit tests to be independent. Independent tests can be run by themselves without requiring other tests to have been run first. This independence increases test reliability and makes it easier to troubleshoot test failures. If you find you need to reuse duplicate code and speed up tests, there are other techniques you can reach for—but don't compromise your tests' independence!
:::

Save the test file and we get an assertion failure:

```sh
  ● NewRestaurantForm › when correcting a validation error › clears the
  validation error

    expect(received).not.toBeInTheDocument()

    expected document not to contain element, found
    <div class="MuiAlert-message css-acap47-MuiAlert-message">Name is required</div>
    instead
```

We can fix this by clearing the `validationError` flag when the name is filled in:

```diff
 if (!name) {
   setValidationError(true);
+} else {
+  setValidationError(false);
 }
```

Note that we aren't waiting for the web service to return to clear the validation error flag, the way we clear out the name field. We know right away that the form is valid, so we can clear the validation error flag even before the web service call is made.

Save and the tests pass. Now that we have an `else` branch to that conditional, let's invert the boolean to make it easier to read. Refactor it to:

```js
if (name) {
  setValidationError(false);
} else {
  setValidationError(true);
}
```

Save and the tests should still pass.

With that, we've implemented the first behavior we want when we submit an empty form: displaying a validation error. Now we can move on to the second behavior when we submit an empty form: *not* dispatching the action to save the restaurant to the server.

The test for that new behavior is straightforward. Add the following in the "when empty" `describe` block:

```js
it('does not call createRestaurant', async () => {
  await submitEmptyForm();
  expect(createRestaurant).not.toHaveBeenCalled();
});
```

Save and the test fails.

We can fix this error by moving the call to `createRestaurant()` inside the true branch of the conditional:

```diff
 async function handleSubmit(e) {
   e.preventDefault();

   if (name) {
     setValidationError(false);
+    await createRestaurant(name);
   } else {
     setValidationError(true);
   }

-  await createRestaurant(name);
   setName('');
 }
```

Save the file and the test passes. If you try to submit the form with an empty restaurant name in the browser, you'll see:

![Name is required error](./images/5-3-validation-error.png)

### Server Error

Our third edge case is when the web service call fails. We want to display a server error message.

We'll want to check for the message in a few different places, so let's set it up as a constant in the uppermost `describe` block:

```diff
 describe('NewRestaurantForm', () => {
   const restaurantName = 'Sushi Place';
   const requiredError = 'Name is required';
+  const serverError = 'The restaurant could not be saved. Please try again.';

   let createRestaurant;
```

Since this is a new situation, let's set this up as yet another new `describe` block:

```js
describe('when the store action rejects', () => {
  async function fillInForm() {
    renderComponent();
    createRestaurant.mockRejectedValue();

    await userEvent.type(
      screen.getByPlaceholderText('Add Restaurant'),
      restaurantName,
    );
    userEvent.click(screen.getByText('Add'));

    return act(flushPromises);
  }

  it('displays a server error', async () => {
    await fillInForm();
    expect(screen.getByText(serverError)).toBeInTheDocument();
  });
});
```

This is almost the same as the successful submission case; the only difference is that the setup we call the `mockRejectedValue()` method of the Jest mock function `createRestaurant`. This means that when this function is called, it will return a promise that rejects. In our case we don't actually care about what error it rejects with, so we don't have to pass an argument to `mockRejectedValue()`.

Save and, in addition to an assertion failure, we also get an additional error:

```sh
  ● NewRestaurantForm › when the store action rejects › displays an error message

    thrown: undefined
```

What's happening is that our call to `createRestaurants()` is rejecting, but we aren't handling that promise rejection. Let's handle it with an empty `catch` block, just to silence this warning; we'll add behavior to that `catch()` function momentarily.

```diff
 if (name) {
   setValidationError(false);
+  try {
     await createRestaurant(name);
+  } catch {}
 } else {
   setValidationError(true);
 }
```

Save the file and the "thrown" error goes away, leaving only the expectation failure:

```sh
  ● NewRestaurantForm › when the store action rejects › displays a server error

    TestingLibraryElementError: Unable to find an element with the text: The
    restaurant could not be saved.
```

As usual, we'll first solve this by hard-coding the element into the component:

```diff
 return (
   <form onSubmit={handleSubmit}>
+    <Alert severity="error">
+      The restaurant could not be saved. Please try again.
+    </Alert>
     {validationError && <Alert severity="error">Name is required</Alert>}
```

Save and the test passes.

Now, when do we want the server message *not* to show? If you think it over, here are a few scenarios where we don't want the error message to show:

- When the component first renders
- When the server returns successfully
- When the server is retried after a failure, and succeeds

Let's test-drive these one at a time. First, confirming the server error doesn't display when the component first renders. Add another test to the "initially" describe block:

```js
it('does not display a server error', () => {
  renderComponent();
  expect(screen.queryByText(serverError)).not.toBeInTheDocument();
});
```

Save and the test fails.

To make it pass, we'll add another bit of state to track whether the error should show. We'll start it out hidden and show it if the store action rejects:

```diff
 export function NewRestaurantForm({createRestaurant}) {
   const [name, setName] = useState('');
   const [validationError, setValidationError] = useState(false);
+  const [serverError, setServerError] = useState(false);

   async function handleSubmit(e) {
...
     if (name) {
       setValidationError(false);
       try {
         await createRestaurant(name);
-      } catch {}
+      } catch {
+        setServerError(true);
+      }
     } else {
...
   return (
     <form onSubmit={handleSubmit}>
-      <Alert severity="error">
-        The restaurant could not be saved. Please try again.
-      </Alert>
+      {serverError && (
+        <Alert severity="error">
+          The restaurant could not be saved. Please try again.
+        </Alert>
+      )}
       {validationError && <Alert severity="error">Name is required</Alert>}
```

Save and the tests pass.

Our next scenario was that the server error should not show when the server request returns successfully. In the "when filled in" describe block, add a similar test:

```js
it('does not display a server error', async () => {
  await fillInForm();
  expect(screen.queryByText(serverError)).not.toBeInTheDocument();
});
```

Save and the test passes. This is another instance where the test doesn't drive new behavior, but it's helpful for extra assurance that the code is behaving the way we expect.

Our third and final situation that we don't want the server error to show is when we try to save, the server rejects, then we try again and it succeeds. This is a new situation, so let's create a new `describe` block for it:

```js
describe('when retrying after a server error', () => {
  async function retrySubmittingForm() {
    renderComponent();
    createRestaurant.mockRejectedValueOnce().mockResolvedValueOnce();

    await userEvent.type(
      screen.getByPlaceholderText('Add Restaurant'),
      restaurantName,
    );
    userEvent.click(screen.getByText('Add'));
    userEvent.click(screen.getByText('Add'));

    return act(flushPromises);
  }

  it('clears the server error', async () => {
    await retrySubmittingForm();
    expect(screen.queryByText(serverError)).not.toBeInTheDocument();
  });
});
```

Save the file and you'll get the expected test failure:

```sh
  ● NewRestaurantForm › when retrying after a server error › clears the server error

    expect(element).not.toBeInTheDocument()

    expected document not to contain element, found
    <div class="MuiAlert-message css-acap47-MuiAlert-message">The restaurant could not be saved. Please try again.</div>
    instead
```

We should be able to make this test pass by just clearing the `serverError` flag when attempting to save:

```diff
 if (name) {
   setValidationError(false);
+  setServerError(false);
   try {
     await createRestaurant(name);
```

Save the file, but surprisingly, the test failure doesn't change--the server error is still shown! Why is that?

The way I ended up troubleshooting this is with some good old-fashioned `console.log` debugging. Let's temporarily add some log statements at various points in `handleSubmit` to help us visualize the sequence of code that is running.

Add a log statement each time `setServerError` is called, and after `createRestaurant` succeeds:

```diff
 setValidationError(false);
 setServerError(false);
+console.log('cleared server error');
 try {
   await createRestaurant(name);
+  console.log('succeeded');
 } catch {
+  console.log('set server error');
   setServerError(true);
 }
```

The output we hope to see is:

- "cleared server error" (after the first click)
- "set server error" (after the first response, which rejects)
- "cleared server error" (after the second click)
- "succeeded" (after the second response, which is resolves)

Save the test, and what we see instead is:

- "cleared server error"
- "cleared server error" (again, right away!)
- "set server error"
- "succeeded"

The same four output statements happen, but in a different order. Both "cleared server error" calls happen first. Then the server error is set after that. As a result, the final state is that the server error is still showing.

The root of the problem is that the test clicks the Add button twice, very quickly, without waiting for the first response to return. Instead, we want to wait for the first API request to return and update the state to display the error message, _then_ perform the second click.

We can fix this by waiting for promises to flush after the first click, as well as after the second:

```diff
   await userEvent.type(
     screen.getByPlaceholderText('Add Restaurant'),
     restaurantName,
   );
   userEvent.click(screen.getByText('Add'));
+  await act(flushPromises);
+
   userEvent.click(screen.getByText('Add'));
   return act(flushPromises);
```

Save the test. Unfortunately, the test still isn't passing, but our log output has changed, giving us a clue:

- "cleared server error"
- "set server error"

It looks like our second "cleared server error" isn't being reached. To see why, add a log statement in the validation error branch:

```diff
 } else {
+  console.log('invalid');
   setValidationError(true);
 }
```

Save and, sure enough, our output is:

- "cleared server error"
- "set server error"
- "invalid"

Why is the form valid after the first click but invalid after the second? The only time our form is invalid is when the restaurant name is empty. The way we have our code written right now, whenever we submit the form, the restaurant name field is *always* cleared out, even if the server rejects.

We have it on our list to implement the behavior where the restaurant name field is *not* cleared out upon server error—but we haven't gotten to it yet! We've stumbled across a problem where a behavior we don't want is getting in the way of the current test. What do we do?

- We don't want to have to workaround this problem in the test by re-typing in the name of the restaurant, because that's not how we want our app to work; we want to *fix* that behavior.
- We don't want to write two tests at once; we want to focus on one test at a time and getting it passing. Seeing two failing tests is a distraction from the red-green-refactor loop.
- We don't want to discard the changes we've made for the current test, because we think we've made progress toward getting it working.

In a situation like this, one option is to use Jest's `skip` functionality to temporarily skip this test until we are ready to finish it. To use it, just chain a `.skip` on the end of `it`:

```diff
-it('clears the server error', async () => {
+it.skip('clears the server error', async () => {
   await retrySubmittingForm();
```

Save and the test suite reruns. This test is skipped, and all the other tests in the file are passing.

Now that that test is temporarily skipped, we can test-drive a fix to the root cause problem. We want to assert that when the server rejects, the restaurant name should *not* be cleared out.

Add another expectation to the "when the store action rejects" `describe` block:

```js
it('does not clear the name', async () => {
  await fillInForm();
  expect(screen.getByPlaceholderText('Add Restaurant').value).toEqual(
    restaurantName,
  );
});
```

Save and we get a test failure:

```sh
Expected: "Sushi Place"
Received: ""

  126 |     it('does not clear the name', async () => {
  127 |       await fillInForm();
> 128 |       expect(screen.getByPlaceholderText('Add Restaurant').value).toEqual(
      |                                                                   ^
  129 |         restaurantName,
  130 |       );
```

To fix it, move the call to clear the name inside the `try` block, after the `createRestaurant()` call. This way the only situation where the name is cleared will be once we know we've successfully saved it to the server:

```diff
     try {
       await createRestaurant(name);
+      setName('');
     } catch {
       setServerError(true);
     }
   } else {
     setValidationError(true);
   }
-
-  setName('');
 }
```

Save and the test passes.

Now that the name isn't cleared upon server error, the problem it was causing for our other test should be resolved. Remove the `.skip` to get that test running again:

```diff
-it.skip('clears the server error', async () => {
+it('clears the server error', async () => {
   await retrySubmittingForm();
```

Save and the newly-unskipped test passes. The test can now run as we first intended it: we submit the form and get a server failure response, then we re-submit the form and get a server success response, and the server error message is hidden.

Now that the test is passing, you can remove the temporary `console.log` statements you added to `NewRestaurantForm.js`.

With that, our component tests for server errors are finally done. For the store, we have just one test we need to add. `NewRestaurantForm` is expecting the `createRestaurant` action to return a promise that rejects when there is a server error. Let's make sure this is happening. Add the following "describe" block inside "createRestaurant action" below "when save succeeds":

```js
describe('when save fails', () => {
  it('rejects', () => {
    api.createRestaurant.mockRejectedValue();
    const promise = store.dispatch(createRestaurant(newRestaurantName));
    return expect(promise).rejects.toBeUndefined();
  });
});
```

The chain `.rejects.toBeUndefined()` is a bit unintuitive. In Jest, when you test a promise with `.rejects`, you have to chain another matcher onto the end of it to test the rejected value. Typically you might say `.rejects.toEqual({error: 'Some message'})`. In our case, we didn't define a value that the promise rejects with, so the rejected value is `undefined`. `.rejects.toBeUndefined()` ensures both that the promise rejects (which we care about) and that the rejected value is `undefined` (which Jest requires us to check for, even though we don't care about it).

The test passes right away. Because our store returned the promise chain returned from the API, the rejection is passed along to the caller of `store.dispatch()`. But it's good to document this in a test, because it's part of the contract of the action that our component is relying on.

Now let's run our app in the browser and see it handle a server error. As you did in the last chapter, open `src/api.js` and put an incorrect API key in the `baseURL` value. Load up the frontend and ignore the error message for *loading* the restaurants. Enter a restaurant name and click "Add". You should see another red server error message, this time for saving:

![Server error message](./images/5-4-server-error.png)

Restore the correct API key value in `src/api.js`, reload the frontend, and make sure the app is working again. Rerun your E2E tests to make sure they still pass.

With that, we've finished implementing adding a restaurant! We had to handle a lot of edge cases, but in doing so we've added a lot of robustness to our form.

Imagine if we had relied on manual testing for all these edge cases. It would have been tedious to find ways to visualize the loading and error states, especially if we found we needed to change the implementation and had to start that testing all over again.

Or imagine if we had tried to handle all of these cases in E2E tests. We either would have had a lot of slow tests, or else one long test that ran through an extremely long sequence. Instead, our E2E tests cover our main functionality, and our unit tests cover all the edge cases thoroughly.

If you have any uncommitted changes, commit them to git. Push up your branch to the origin and open a pull request. Wait for CI to complete, then merge the pull request. Now we can drag our "Add Restaurants" story to "Done" in Trello.

## What's Next

With this we've completed our second feature. We've also reached the end of this exercise! In the next chapter we'll look back at what we did over the course of the exercise and the benefits the outside-in test-driven development process gave us.

<Chat />
