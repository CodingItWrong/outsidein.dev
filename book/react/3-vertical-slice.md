---
title: 3 - Vertical Slice
---

# 3 - Vertical Slice

In this chapter, we'll build our first application feature. We'll follow the practice of outside-in test driven development: write a failing end-to-end test, watch it fail, then build out the functionality with unit tests using multiple inner red-green-refactor cycles. We'll also see the principle of "write the code you wish you had" in action.

Our next story in Trello is "List Restaurants"; drag it to "In Progress".

We chose this story as our first story because it allows us to build out a **vertical slice** of our application. It touches all layers of our code: it has a user interface aspect (the list screen), a data layer aspect (where the restaurants are loaded and stored), and an API client aspect (the HTTP request to load the restaurants). It also minimizes other work: we aren't building authentication now, and we aren't handling restaurant loading edge cases yet in this story. The point of a vertical slice is to get something in all layers of your application built out, to ensure they all work together.

## Setup

We'll do all our work from this feature on a branch. Create a new one:

```sh
$ git checkout -b list-restaurants
```

To get a clean start, let's delete out the sample content Create React App created with our app. Delete the following files and folders:

- `cypress/integration/smoke.spec.js`
- `src/App.css`
- `src/App.test.js`
- `src/index.css`
- `src/logo.svg`
- `src/reportWebVitals.js`

Make the following changes to `src/index.js`:

```diff
 import React from 'react';
 import ReactDOM from 'react-dom';
-import './index.css';
 import App from './App';
-import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
-
-// If you want to start measuring performance in your app, pass a function
-// to log results (for example: reportWebVitals(console.log))
-// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
-reportWebVitals();
```

Replace the contents of `App.js` with the following minimal content:

```jsx
export default function App() {
  return <div>Hello, world.</div>;
}
```

In `public/index.html`, find the `<title>` tag and see that the page has the default title "React App". Update it:

```diff
   Learn how to configure a non-root public URL by running `npm run build`.
   -->
-  <title>React App</title>
+  <title>Opinion Ate</title>
 </head>
```

Commit these changes to git:

```sh
$ git add .
$ git commit -m "Delete sample content"
```

## Reviewing the Backend

For this tutorial, our backend web service has already been built. Let's take a look at it and see how we can load our restaurant data from it. It's accessible at <https://outside-in-dev-api.herokuapp.com>. Rather than using username-and-password based authentication as we might do for a real system, for simplicity you'll just set up an API key instead. This will allow you to access your own personal data on the server, so you can edit it without stepping on other users' data.

Go to <https://outside-in-dev-api.herokuapp.com> in a browser. Click the "Create API Key" button. You'll be given a new API key that is a random sequence of letters and numbers. Copy it and save it someplace safe—you won't be able to get back to it again.

Next, go to `https://outside-in-dev-api.herokuapp.com/YOUR-API-KEY/restaurants` in a browser, filling in your API key in place of `YOUR-API-KEY`. You should see the following JSON data with default restaurants created when your API key was created. It may be formatted differently depending on your browser and extensions, and of course the dates will differ:

```json
[
  {
    "id": 1,
    "name": "Pasta Place",
    "created_at": "2020-03-30T23:54:52.000Z"
  },
  {
    "id": 2,
    "name": "Salad Place",
    "created_at": "2020-03-30T23:54:52.000Z"
  }
]
```

So this is the web service endpoint our story will need to connect to. You can also `POST` JSON data to that endpoint to create a new restaurant; feel free to try that out if you like.

Now, to build the frontend.

## End-to-End Test

When performing outside-in TDD, our first step is to **create an end-to-end test describing the feature we want users to be able to do.**

In the `cypress/integration` folder, create a `listing-restaurants.spec.js` file and add the following:

```js
describe('Listing Restaurants', () => {
  it('shows restaurants from the server', () => {
    const sushiPlace = 'Sushi Place';
    const pizzaPlace = 'Pizza Place';

    cy.intercept(
      'GET',
      'https://outside-in-dev-api.herokuapp.com/*/restaurants',
      [
        {id: 1, name: sushiPlace},
        {id: 2, name: pizzaPlace},
      ],
    );

    cy.visit('/');
    cy.contains(sushiPlace);
    cy.contains(pizzaPlace);
  });
});
```

First, we create variables with a few restaurant names, because we'll use them several times.

Then, we call `cy.intercept()` to stub a backend request; in this case, the `https://outside-in-dev-api.herokuapp.com/YOUR-API-KEY/restaurants` we just tested out. Note that we don't hard-code your API key here; we use a `*` to match any value in the API key spot of the path. When the app sends a `GET` request to it, we will return the specified response. We pass the method an array of two restaurant objects. Cypress will convert that array of objects into a JSON string and return that from the stubbed network call. Notice that we don't need to include the `created_at` or `updated_at` fields, because our app won't be using them.

Next, we visit the root of our app at `/`. We confirm that the page contains both restaurant names. This will show that the app successfully retrieved them from the backend and displayed them.

After we've created our test, the next step in TDD is to **run the test and watch it fail.** This test will fail (be "red") at first because we haven't yet implemented the functionality.

To run our test, run the app with `yarn start` and leave it running, then, in another terminal, run `yarn cypress`.
After a few seconds the Cypress app should open. In Cypress, click `listing-restaurants.spec.js`. Chrome should open, and the test should run. It is able to visit the root of our app, but when it attempts to find "Sushi Place" on the page, it fails.

![Cypress test failing](./images/2-1-cypress-red.png)

Let's go ahead and commit this E2E test. Although it won't pass until the end of the branch, committing it now allows us to have focused commits going forward.

```sh
$ git add .
$ git commit -m "Specify app should list restaurants"
```

It's time for us to write the code to make this pass. Let's think about how we want to structure our code. We're going to have three layers:

- Components that display the user interface.
- A Redux store that stores our data and lets us interact with it.
- An API client that allows us to make requests to the backend.

With outside-in testing, we build the outside first, which in this case is our user interface components. And a common principle is to **write the code you wish you had.** What does that mean in our case? Well, when we created our app, we were given an `<App />` component. Do we want to put our user interface directly in there? No, it's best to save the `<App />` component for app-wide concerns such as a title bar that we'll add soon. Instead, it would be great if we had a `<RestaurantScreen />` component that would contain everything specific to our restaurants. We wish we had it, so let's add it to `App.js`:

```diff
+import RestaurantScreen from './components/RestaurantScreen';

 export default function App() {
-  return <div>Hello, world.</div>;
+  return (
+    <div>
+      <RestaurantScreen />
+    </div>
+  );
 }
```

Next, let's actually create the `RestaurantScreen` component we used here.
In `src`, create a `components` folder, then inside it create a `RestaurantScreen.js` file.
For the moment let's add just enough content to make it a valid component. Add the following:

```jsx
export default function RestaurantScreen() {
  return (
    <div>
      <h1>Restaurants</h1>
    </div>
  );
}
```

If we rerun our E2E test we'll see the "Restaurants" text displayed, but we aren't any closer to passing the test. What do we do next?

Well, what do we want to do on this screen? For this story, we want to display a restaurant list. But we also have an upcoming story where we want to add new restaurants. Those are two different responsibilities we want this screen to have. So let's create child components for each. For now, we'll just create the restaurant list.

Let's start by writing the code we wish we had again. In `RestaurantScreen.js`:

```diff
+import RestaurantList from './RestaurantList';

 export default function RestaurantScreen() {
   return (
     <div>
       <h1>Restaurants</h1>
+      <RestaurantList />
     </div>
   );
 }
```

Now let's implement that component. Create a `RestaurantList.js` file in `src/components` and again add the minimal content:

```jsx
export default function RestaurantList() {
  return <div>RestaurantList</div>;
}
```

## Stepping Down to a Unit Test

Now we finally have `RestaurantList` where we'll put our UI for this story.

So far our components haven't done much: `App` just renders `RestaurantScreen`, and `RestaurantScreen` just renders `RestaurantList`. This wasn't any significant application *logic*: it was just code *structure*. Because of this, there would have been no real benefit to stepping down to a unit test: unit tests are for driving out *logic*. This is why we wrote this structural code directly under the guidance of the E2E test.

But with `RestaurantList`, we finally have some application *logic* to write. It needs to:

- Request for the restaurants to be loaded
- Display the restaurants once they're returned

Instead of adding this logic directly, let's **step down from the "outside" level of end-to-end tests to an "inside" component test.** This allows us to more precisely specify the behavior of each piece. This unit test will also be helpful in a future story as we add more edge cases to this component. End-to-end testing every edge case would be slow, and make it harder to tell what exactly was being tested.

Before we step down to a unit test, though, let's commit the changes we have. They're a nice, small unit of work: we've added the structure of components that we'll add the behavior to next.

```sh
$ git add .
$ git commit -m "Add RestaurantScreen and RestaurantList"
```

Now, to write the unit test. In `src/components`, create a file `RestaurantList.spec.js`.
Now, we'll write a test for the first bit of functionality we need, to load the restaurants. We'll start with the structure of the test suite:

```js
describe('RestaurantList', () => {
  it('loads restaurants on first render', () => {
  });
});
```

Because we are writing a unit test, we don't want to connect our component to our real Redux store. Instead, we want to create mock functions that are passed in the way Redux dispatch functions will be; then we can run expectations on those mock functions. Our component will ask our store to load the restaurants, so that means we need a `loadRestaurants` function to pass in:

```diff
 it('loads restaurants on first render', () => {
+  const loadRestaurants = jest.fn().mockName('loadRestaurants');
 });
```

We use `jest.fn()` to create a Jest mock function, which will allow us to check that the `loadRestaurants` action was called. We chain a call to `.mockName()` onto it to give our function a name; this will make our error messages more readable.

Now, we're ready to render our component:

```diff
+import {render} from '@testing-library/react';
+import RestaurantList from './RestaurantList';

 describe('RestaurantList', () => {
   it('loads restaurants on first render', () => {
     const loadRestaurants = jest.fn().mockName('loadRestaurants');
+
+    render(<RestaurantList loadRestaurants={loadRestaurants} />);
   });
 });
```

We import the `RestaurantList` component, then we use React Testing Library's `render()` function to render it. We pass in JSX just like we'd use in production code, and we pass the `loadRestaurants` function as a component prop.

Finally, we're ready to run an expectation to confirm that the component loads restaurants on first render. We just check that our mock function was called:

```diff
 it('loads restaurants on first render', () => {
   const loadRestaurants = jest.fn().mockName('loadRestaurants');

   render(<RestaurantList loadRestaurants={loadRestaurants} />);
+
+  expect(loadRestaurants).toHaveBeenCalled();
 });
```

Now we're ready to run our unit test. Run `yarn test` and leave it running for the remainder of this chapter. Jest will run our unit test, and we'll get the following error:

```sh
 FAIL  src/components/RestaurantList.spec.js
  RestaurantList
    ✕ loads restaurants on first render (19ms)

  ● RestaurantList › loads restaurants on first render

    expect(loadRestaurants).toHaveBeenCalled()


    Expected number of calls: >= 1
    Received number of calls:    0

       8 |     render(<RestaurantList loadRestaurants={loadRestaurants} />);
       9 |
    > 10 |     expect(loadRestaurants).toHaveBeenCalled();
         |                             ^
```

Our test says we expected the `loadRestaurants()` function to have been called at least once, but it wasn't called. This makes sense: we haven't hooked up the first-render functionality yet. Now that our test is red, it's time to make it green.

To call a function once when our component renders, we'll use an effect. Run the `loadRestaurants` prop in a `useEffect`:

```diff
+import {useEffect} from 'react';

-export default function RestaurantList() {
+export default function RestaurantList({loadRestaurants}) {
+  useEffect(() => {
+    loadRestaurants();
+  }, [loadRestaurants]);
+
   return <div>RestaurantList</div>;
 }
```

The dependency array we pass to `useEffect` consists only of `loadRestaurants`, so the effect will run once each time `loadRestaurants` changes. In our test (and in our real application) it will never change, so the effect just runs once when the component first renders.

Save the file and Jest will automatically rerun our unit test. Sure enough, our test is green. We've passed our first unit test! Let's commit the unit test and production code that makes it pass in one commit:

```sh
$ git add .
$ git commit -m "Load restaurants upon first rendering RestaurantList"
```

This gives us one of the behaviors we want our `RestaurantList` to have: loading the restaurants when it is first rendered. Now it's time to write a test for the second behavior: displaying the restaurants. Let's add another `it()` block inside the `describe()`, with the following contents:

```js
it('displays the restaurants', () => {
  const noop = () => {};
  const restaurants = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];

  render(<RestaurantList loadRestaurants={noop} restaurants={restaurants} />);
});
```

So far it's pretty similar to our previous test. There are just a few differences:

- Instead of a Jest mock function, we set up a `noop` function that does nothing ("no operation").
- We define a `restaurants ` variable that contains an array of two restaurant objects.

Now, instead of running an expectation that `loadRestaurants` was called, we use the `screen.queryByText` function to check what is rendered out:

```diff
-import {render} from '@testing-library/react';
+import {render, screen} from '@testing-library/react';
 import {RestaurantList} from './RestaurantList';
...
   render(<RestaurantList loadRestaurants={noop} restaurants={restaurants} />);
+
+  expect(screen.getByText('Sushi Place')).toBeInTheDocument();
+  expect(screen.getByText('Pizza Place')).toBeInTheDocument();
 });
```

`screen.queryByText` finds an element containing the passed-in text. We pass in the name of each of the two restaurants. If found, `queryByText` returns a reference to the element; if not found, it returns `null`. So, to confirm they are found, we check that return result is *not* null.

Why did we split this unit test out from the first one? There is a common testing principle to **check one behavior per test in unit tests.** In our first test we checked the loading behavior, and in this test we are checking the restaurant-display behavior. Having separate test cases for each behavior of the component makes it easy to understand what it does, and easy to see what went wrong if one of the assertions fails. This principle is sometimes phrased "run one expectation per test", but in this test we have two expectations. We're following the spirit of the principle, though, because those two expectations are very closely related: they're checking for two analogous bits of text on the page.

You may recall that this isn't what we did in the end-to-end test, though. Generally you should **check _multiple_ behaviors per test in end-to-end tests.** Why? End-to-end tests are slower, so the overhead of the repeating the steps would significantly slow down our suite as it grows.

When we save the file, our test runs, and it's red, as we expect. We get the following error:

```sh
  ● RestaurantList › displays the restaurants

    TestingLibraryElementError: Unable to find an element with the text: Sushi
    Place. This could be because the text is broken up by multiple elements. In
    this case, you can provide a function for your text matcher to make your
    matcher more flexible.
```

So no element with the text "Sushi Place" is found. At this point, we could hard-code an element with that text, but it's better to go ahead and pull it from the props:

```diff
-export const RestaurantList = ({loadRestaurants}) => {
+export const RestaurantList = ({loadRestaurants, restaurants}) => {
   useEffect(() => {
     loadRestaurants();
   }, [loadRestaurants]);

-  return <div>RestaurantList</div>;
+  return (
+    <ul>
+      {restaurants.map(restaurant => (
+        <li key={restaurant.id}>{restaurant.name}</li>
+      ))}
+    </ul>
+  );
 };
```

When we save the file, our test of the output passes, but now our first test fails:

```sh
● RestaurantList › loads restaurants on first render

  TypeError: Cannot read property 'map' of undefined

     8 |   return (
     9 |     <ul>
  > 10 |       {restaurants.map(restaurant => (
```

We're `map`ping over the `restaurants`, but in our first test we didn't pass in a `restaurants` prop. Let's update the test to pass in an empty array, since that test doesn't care about the restaurants:

```diff
 it('loads restaurants on first render', () => {
   const loadRestaurants = jest.fn().mockName('loadRestaurants');
+  const restaurants = [];

-  render(<RestaurantList loadRestaurants={loadRestaurants} />);
+  render(
+    <RestaurantList
+      loadRestaurants={loadRestaurants}
+      restaurants={restaurants}
+    />,
+  );

   expect(loadRestaurants).toHaveBeenCalled();
 });
```

Save and now both tests are passing. We've now successfully defined both behaviors of our `RestaurantList`!

Go ahead and commit your changes again. From here on out, we won't remind you to make small commits as we go, but I'd encourage you to do so.

In the TDD cycle, **whenever the tests go green, look for opportunities to refactor,** both in production code and test code. Our production code is pretty simple already, but there's a lot of duplication in our two tests. Now that we see which parts are shared, let's extract that duplication. First, let's set up some shared data:

```diff
 describe('RestaurantList', () => {
+  const restaurants = [
+    {id: 1, name: 'Sushi Place'},
+    {id: 2, name: 'Pizza Place'},
+  ];
+  let loadRestaurants;
+
+  function renderComponent() {
+    loadRestaurants = jest.fn().mockName('loadRestaurants');
+
+    render(
+      <RestaurantList
+        loadRestaurants={loadRestaurants}
+        restaurants={restaurants}
+      />,
+    );
+  }
+
   it('loads restaurants on first render', () => {
```

Although not *all* of these variables are needed for *both* tests, it's okay to set them up for both. This sets up a component in a good default state, so each test can stay focused on what it wants to assert.

Now we can replace the duplicated code from the individual tests with a call the `renderComponent()` function:

```diff
 it('loads restaurants on first render', () => {
-  const loadRestaurants = jest.fn().mockName('loadRestaurants');
-  const restaurants = [];
-
-  render(
-    <RestaurantList
-      loadRestaurants={loadRestaurants}
-      restaurants={restaurants}
-    />,
-  );
-
+  renderComponent();
   expect(loadRestaurants).toHaveBeenCalled();
 });

 it('displays the restaurants', () => {
-  const noop = () => {};
-  const restaurants = [
-    {id: 1, name: 'Sushi Place'},
-    {id: 2, name: 'Pizza Place'},
-  ];
-
-  render(<RestaurantList loadRestaurants={noop} restaurants={restaurants} />);
-
+  renderComponent();
   expect(screen.getByText('Sushi Place')).toBeInTheDocument();
   expect(screen.getByText('Pizza Place')).toBeInTheDocument();
 });
```

Save the file and our tests should still pass. With this, our test blocks are much shorter: all they contain is the expectations. This is good because it keeps our tests focused and very easy to read.

## Stepping Back Up

We've now specified the behavior of our `RestaurantList` component, and our unit test is complete. The next step in outside-in TDD is to **step back up to the end-to-end test and see our next failure.** Rerun the test in Chrome and we see:

```sh
TypeError: Cannot read properties of undefined
```

![Cypress failing because map is undefined](./images/2-2-map-undefined.png)

This should make sense from what we just built: we called the `map` function on the `restaurants` array, but in our application code we aren't yet passing a `restaurants` array. How do we want our component to get that array? We want it to be provided by the Redux store. It's time to write the code we wish we had, and hook our restaurant list up to Redux.

Add `redux` and `react-redux` dependencies:

```sh
$ yarn add redux@4.2.0 \
           react-redux@8.0.1
```

Next, connect the `RestaurantList` component to the appropriate state. This is what will ultimately fix our Cypress error:

```diff
 import {useEffect} from 'react';
+import {connect} from 'react-redux';

-export default function RestaurantList({loadRestaurants, restaurants}) {
+function RestaurantList({loadRestaurants, restaurants}) {
  useEffect(() => {
...
 }

+const mapStateToProps = state => ({
+  restaurants: state.restaurants.records,
+});
+
+export default connect(mapStateToProps)(RestaurantList);
```

:::tip
Note that we are using the React-Redux `connect()` function rather than the newer hooks-based API. Redux maintainer Mark Erikson writes about the [tradeoffs between the two React-Redux APIs](https://blog.isquaredsoftware.com/2019/07/blogged-answers-thoughts-on-hooks/), and there is not a strong recommendation to use one or the other. Because our component testing approach involves passing props to a component that is unaware of Redux, the `connect()` function is a more natural fit. We could accomplish the same by creating a "connected" component that uses React-Redux hooks and passes the props down to the unconnected component, but there are few benefits to that approach over using `connect()`.
:::

Save `RestaurantList.js`. If you haven't left your Jest tests running, run `yarn test`. Notice that we are now getting a failure:

```sh
● RestaurantList › loads restaurants on first render

  Could not find "store" in the context of "Connect(RestaurantList)". Either
  wrap the root component in a <Provider>, or pass a custom React context
  provider to <Provider> and the corresponding React context consumer to
  Connect(RestaurantList) in connect options.
```

How do we want to provide the Redux store in our component test? Well, we don't; that integration will be tested as part of our E2E test. For our component test, we want to test the component in isolation: assuming Redux passes in the correct data to the component, does it behave correctly?

To test this, we can follow a technique where in addition to the default export of the Redux-connected component, you also do a named export of the unconnected component, and use that for testing:

```diff
-function RestaurantList({loadRestaurants, restaurants}) {
+export function RestaurantList({loadRestaurants, restaurants}) {
   useEffect(() => {
```

Next, update the test to use the named import:

```diff
 import {render, screen} from '@testing-library/react';
-import RestaurantList from './RestaurantList';
+import {RestaurantList} from './RestaurantList';

 describe('RestaurantList', () => {
```

The tests should automatically rerun and pass again.

If you've used Redux before you know we have more setup steps to do. But let's rerun the E2E test to let it drive us to do so. The error we get is:

```sh
Error: Could not find "store" in the context of
"Connect(RestaurantList)".
```

![Cypress error that there is no provided store](./images/2-3-redux-not-hooked-up.png)

This is the same error we saw in our Jest tests when our component wasn't hooked up to a Redux store. But this is in our real application code now, so we _do_ want to hook it up. Let's do that now, in `App.js`:

```diff
+import {Provider} from 'react-redux';
+import store from './store';
 import RestaurantScreen from './components/RestaurantScreen';

 export default function App() {
   return (
-    <div>
+    <Provider store={store}>
       <RestaurantScreen />
-    </div>
+    </Provider>
   );
 )
```

We'll need to define that store as well. Under `src/`, create a `store` folder, then an `index.js` inside it. Add the following contents:

```js
import {createStore} from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

export default store;
```

Now we'll need a root reducer. Create a `src/store/reducers.js` file. Add the following contents:

```js
import {combineReducers} from 'redux';
import restaurants from './restaurants/reducers';

export default combineReducers({restaurants});
```

Right now it's a bit unnecessary that we're combining a _single_ reducer into a larger one, but this sets our app up easily add additional reducers in the future.

Now we need to create that restaurant reducer. Create a `src/store/restaurants` folder, then a `reducers.js` file inside it. Add the following contents:

```js
import {combineReducers} from 'redux';

function records() {
  return [];
}

export default combineReducers({
  records,
});
```

We go ahead and use `combineReducers` since we will ultimately have multiple restaurant reducers, for values like loading and error flags. For now, we just need the one `records` reducer to fix the E2E test error. We have it return a hard-coded empty array.

This should fix our E2E test error, so rerun the Cypress test. Now we get a new error:

```sh
TypeError: loadRestaurants is not a function
```

![Cypress failure that loadRestaurants is not a function](./images/2-4-redux-action-not-defined.png)

How do we want the `loadRestaurants` function to be provided to the component? We want it to be an asynchronous Redux action. To make that work, it's time to add `redux-thunk`:

```sh
$ yarn add redux-thunk@2.4.1
```

Hook it up in `src/store/index.js`:

```diff
-import {createStore} from 'redux';
+import {createStore, applyMiddleware} from 'redux';
+import thunk from 'redux-thunk';
 import rootReducer from './reducers';

-const store = createStore(rootReducer);
+const store = createStore(rootReducer, applyMiddleware(thunk));

 export default store;
```

In `RestaurantList.js`, map the action into the component:

```diff
 import {connect} from 'react-redux';
+import {loadRestaurants} from '../store/restaurants/actions';

 function RestaurantList({loadRestaurants, restaurants}) {
...
 const mapStateToProps = state => ({
   restaurants: state.restaurants.records,
 });

+const mapDispatchToProps = {loadRestaurants};
+
-export default connect(mapStateToProps)(RestaurantList);
+export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
```

Next, we need to add that actions module. In `src/store/restaurants`, create `actions.js`. We want to write the minimal code to fix the current E2E test error, so let's just export a `loadRestaurants` thunk that does nothing:

```js
export const loadRestaurants = () => () => {};
```

Rerun the E2E test. We now no longer get any application code errors; instead, we are back to the failure that the text "Sushi Place" is never shown. But we've made progress. Our component is now dispatching the `loadRestaurants` async action, and reading the `restaurants` from the store; our async action just isn't loading those records from the API yet. That's logic we need to implement, and that means it's time to step back down to a unit test, this time for our Redux store.

## Unit Testing the Store

To test our store, we're going to create a real Redux store, configure it with our reducer, then dispatch our actions against it. After we write our test, we'll look at the advantages this approach gives us.

Under `src/store/`, create a `restaurants.spec.js` file. Add the following structure:

```js
describe('restaurants', () => {
  describe('loadRestaurants action', () => {
    it('stores the restaurants', async () => {
    });
  });
});
```

We create a `describe` block for our `loadRestaurants` action, which right now just has one test: that it stores the restaurants. Note that the test function is `async`, to allow for our stubbed network request. Now let's fill that test out.

We will need some records to be returned by our stubbed API:

```diff
 it('stores the restaurants', async () => {
+  const records = [
+    {id: 1, name: 'Sushi Place'},
+    {id: 2, name: 'Pizza Place'},
+  ];
 });
```

As we said earlier, our app will consist of three layers:

- The UI components
- The Redux store
- The API client

So we won't make an HTTP request directly in our Redux store.
Instead, we'll delegate to an API object that we pass in. Let's design the interface of that object now:

```diff
 it('stores the restaurants', async () => {
   const records = [
     {id: 1, name: 'Sushi Place'},
     {id: 2, name: 'Pizza Place'},
   ];

+  const api = {
+    loadRestaurants: () => Promise.resolve(records),
+  };
 });
```

Giving the `api` object a descriptive `loadRestaurants()` method seems good. We are stubbing out the API here in the test, so we just implement that method to return a Promise that resolves to our hard-coded records.

Now, to set up our Redux store. We'll use a real Redux store to run our tests through. That way we are testing our thunks, action creators, and reducers in integration. We'll look at the benefits this provides us shortly.

Start with the initial state of the reducer:

```diff
   const api = {
     loadRestaurants: () => Promise.resolve(records),
   };
+
+  const initialState = {
+    records: [],
+  };
 });
```

Now we'll create the store itself. Unlike in the full application, we will only pass in the restaurant reducer. The full application may have other reducers, but we are keeping our test narrowed to just the restaurant reducer.

```diff
+import {createStore, applyMiddleware} from 'redux';
+import thunk from 'redux-thunk';
+import restaurantsReducer from './restaurants/reducers';
+
 describe('restaurants', () => {
...
       const initialState = {
         records: [],
       };
+
+      const store = createStore(
+        restaurantsReducer,
+        initialState,
+        applyMiddleware(thunk.withExtraArgument(api)),
+      );
     });
```

We didn't use the `.withExtraArgument()` method for `redux-thunk` earlier. It allows you to pass an additional argument at setup time that will be available to all thunk functions. This allows us to inject our API. We could also use Jest's module mocking to do this, but this makes the dependency a bit more explicit.

Now that our store is set, we can dispatch the `loadRestaurants` action, then check the state of the store afterward:

```diff
 import restaurantsReducer from './restaurants/reducers';
+import {loadRestaurants} from './restaurants/actions';

 describe('restaurants', () => {
...
         applyMiddleware(thunk.withExtraArgument(api)),
       );
+
+      await store.dispatch(loadRestaurants());
+
+      expect(store.getState().records).toEqual(records);
     });
```

The test fails, showing an empty array as the received value:

```sh
● restaurants › loadRestaurants action › stores the restaurants

  expect(received).toEqual(expected) // deep equality

  - Expected  - 10
  + Received  + 1

  - Array [
  -   Object {
  -     "id": 1,
  -     "name": "Sushi Place",
  -   },
  -   Object {
  -     "id": 2,
  -     "name": "Pizza Place",
  -   },
  - ]
  + Array []
```

Now we're ready to implement our `loadRestaurants` thunk to retrieve the records from the `api` and dispatch an action to store them.

First, update the `loadRestaurants` function in `actions.js`:

```diff
-export const loadRestaurants = () => () => {};
+export const STORE_RESTAURANTS = 'STORE_RESTAURANTS';
+
+export const loadRestaurants = () => async (dispatch, getState, api) => {
+  const records = await api.loadRestaurants();
+  dispatch(storeRestaurants(records));
+};
+
+const storeRestaurants = records => ({
+  type: STORE_RESTAURANTS,
+  records,
+});
```

We define a new `STORE_RESTAURANTS` action type. Then, in the function `loadRestaurants()` returns, we call `.loadRestaurants()` on the passed-in `api` that we configured when we set up the store. When it resolves, we dispatch a new `storeRestaurants()` action, passing it the records. We define a `storeRestaurants` action creator to create the correct action object.

Save the file and the test failure is the same, because our reducer doesn't store the restaurants. Update the `records` reducer:

```diff
 import {combineReducers} from 'redux';
+import {STORE_RESTAURANTS} from './actions';

-function records() {
-  return [];
+function records(state = [], action) {
+  switch (action.type) {
+    case STORE_RESTAURANTS:
+      return action.records;
+    default:
+      return state;
+  }
 }

 export default combineReducers({
   records,
 });
```

With this, our test passes.

Now that our test is passing and our code is complete, let's talk about the benefits that come from testing the store from the outside. Our test interacts with the store the way the rest of our application does: by dispatching async actions and then observing state changes. Just like the rest of our application, our test doesn't know or care about the `STORE_RESTAURANTS` action type; it treats it as an implementation detail. This gives us greater flexibility to refactor our store; for example, we could change the way the actions that `loadRestaurants` dispatches are set up. Our tests would continue to pass as long as the action type and state stayed the same, which is fittingly exactly the contract that the rest of our application relies on as well.

Another benefit of testing the store from the outside is ensuring that all the pieces work together. If we were testing the `loadRestaurants` async action, `storeRestaurants` action creator, and reducer separately from one another, they might work individually, but not work together. For example, maybe the names of properties in the action object returned by `storeRestaurants` aren't the same names as the properties the reducer looks for in a `STORE_RESTAURANTS` action. Our test exercises the async action, action creator, and reducer in integration, ensuring that if they aren't working together, a unit test will fail. If we weren't testing this way, only an E2E test would catch this problem—and then only if the problem is in one of the main flows that our E2E test covers, not our edge cases.

## Creating the API Client

Now that our unit test is passing, it's time to step back up to the E2E test. It fails with a new error:

```sh
Cannot read properties of undefined (reading 'loadRestaurants')
```

![Cypress failure showing loadRestaurants property on undefined](./images/2-5-api-load-restaurants-undefined.png)

Our component and store are built; now we just need to build our API. You may be surprised to hear that we aren't going to unit test it at all; instead, we're going to let the E2E test drive the implementation. Let's go through that process first, then we'll discuss why we didn't unit test it.

To fix the current E2E test failure, we need to create an API object and provide it to `redux-thunk`. We'll go ahead and create a `loadRestaurants()` method on the object, too, since we can see from the error that we'll need it.

Create an `api.js` file under `src`, and add the following code:

```js
const api = {
  loadRestaurants() {},
};

export default api;
```

Next, let's wire the API object up our store. Update `src/store/index.js`:

```diff
 import rootReducer from './reducers';
+import api from '../api';

-const store = createStore(rootReducer, applyMiddleware(thunk));
+const store = createStore(
+  rootReducer,
+  applyMiddleware(thunk.withExtraArgument(api)),
+);
```

Rerun the E2E test and we get a new error:

> When called with an action of type "STORE_RESTAURANTS", the slice reducer for key "records" returned undefined.

What's going on here? The return value of `records()` for action `STORE_RESTAURANTS` is undefined. We're returning the `action.records` field, so this means `action.records` is undefined. This is because we still aren't making the HTTP request that kicked off this whole sequence. Fixing this will move us forward better, so let's actually make the HTTP request in the API.

We'll use the popular Axios library to make our HTTP requests. Add it to your project:

```sh
$ yarn add axios@0.27.2
```

:::tip
Instead of Axios, we could have used the browser's built-in `fetch()` function. But there are still users on older iPhones and IE 11 whose browsers don't have `fetch()`, and Axios provides some nice interface improvements over `fetch()` in my opinion.
:::

Next, use Axios to make an HTTP request to the correct endpoint:

```diff
+import axios from 'axios';
+
+const client = axios.create({
+  baseURL: 'https://outside-in-dev-api.herokuapp.com/YOUR-API-KEY',
+});
+
 const api = {
-  loadRestaurants() {}
+  async loadRestaurants() {
+    const response = await client.get('/restaurants');
+    return response.data;
   },
 };

 export default api;
```

In the `baseURL`, replace `YOUR-API-KEY` with the API key you created earlier.

We import Axios, then call its `create()` method to create a new Axios instance configured with our server's base URL. We provide the API's URL, along with your personal API key. Then we implement our `loadRestaurants()` method by calling the Axios client's `get()` method to make an HTTP `GET` request to the path `/restaurants` under our base URL.

The promise Axios' `get()` method returns resolves to an Axios response object, which has a `data` field on it with the response body. In cases like ours where the response will be JSON data, Axios will handle parsing it to return a JavaScript data structure and exposing that under `response.data`. The `response.data` value is what we need, so we resolve to that.

Rerun the E2E test one more time. The test should confirm that "Sushi Place" and "Pizza Place" are loaded and displayed on the page. Our E2E test is passing!

![Cypress test passing](./images/2-6-cypress-green.png)

Now, why didn't we unit test this API? We could set it up to pass in a fake Axios object and mock out the `get()` method on it. But there is a unit testing principle: **don't mock what you don't own.** The principle applies equally well to using any kind of test doubles for code you don't own, not just mocks. There are a few reasons for this:

- If you mock third party code but you get the functionality wrong, then your tests will pass against your mock, but won't work against the real third-party library. This is especially risky when the behavior of the library changes from how it worked when you first wrote the test.
- Some of the value of unit tests is in allowing you to design the API of your dependencies, but since you can't control the API of the third-party library, you don't get the opportunity to affect the API. (Pull requests to open-source projects notwithstanding!)

So how can you test code with third-party dependencies if you can't mock them? The alternative is to do what we did here: **wrap the third-party code with your *own* interface that you do control, and mock that.** In our case, we decided that we should expose a `loadRestaurants()` method that returns our array of restaurants directly, not nested in a `response` object. That module that wraps the third-party library should be very simple, with as little logic as possible—ideally without any conditionals. That way, you won't even feel the need to test it. Consider our application here. Yes, we could write a unit test that if Axios is called with the right method, it resolves with an object with a data property, and confirm that our code returns the value of that data property. But at that point the test is almost just repeating the production code, and if Axios changed its expectations our unit test would pass but the code wouldn't work. Instead, it's better to rely on Cypress to test our API code in integration with the third party library, ensuring that it successfully makes the HTTP request.

Now let's see our app working against the real backend.
Go to your React app at `http://localhost:3000`.
You should see the default "Pasta Place" and "Salad Place" records loaded from the API.

![App with real API](./images/2-7-app-with-real-api.png)

We successfully implemented our first feature with outside-in test-driven development!

## Pull Request Workflow
Our feature is working locally, but we need to get it integrated with the rest of our codebase. We'll do this with a pull request.

If you have any uncommitted changes, commit them to git.

Next, push up your branch to the origin:

```
$ git push -u origin HEAD
```

Click the link that GitHub provides to open a pull request. Title the pull request "List restaurants". You can leave the description field blank for this exercise; in a real team context you would describe the change you made, how to manually test it, and other important information about decisions or tradeoffs you made.

In a team context, your team members would review the pull request. They can click on lines of code to add comments. When reviewing a pull request, don't just point out things you want changed. Ask questions to better understand the author's intent. Encourage them about decisions they made that you like or have learned from. Make proposals for changes that you don't feel strongly about, so the author can choose which way to go. All of these create a code review culture that feels encouraging and motivating.

When you open the pull request, you can see CI running at the bottom. If it fails, click "Details" and check the output to see what went wrong. Try running the tests locally to see if you get the same problem, then fix it and push up the fixes.

When CI succeeds, merge the pull request.

Now Netlify should automatically be deploying the updated version of our site. Go to <https://app.netlify.com> and check the build progress. When it completes, go to your site and see it successfully listing restaurants. It's exciting to see it live! Some real production systems do deploy on every merge; the test coverage that TDD provides can make this safe. Others will not deploy as often, but an agile team is ready to deploy as often as the business wants, to get feedback on their work as quickly as possible.

Now we can drag our story to "Done" in Trello: "List Restaurants".

Then, locally, switch back to the `main` branch and pull in the the changes that have been merged in from the branch:

```sh
$ git checkout main
$ git pull
```

## What's Next

Now our first feature is working, and TDD has guided us to start with a minimal implementation. In the next chapter we'll iterate on this implementation by adding a UI component library and improving the styling of the app so far.

:::tip
Questions about this chapter? Running into trouble? Come chat with us on the [Gitter Community for Outside-In Dev](https://gitter.im/outsideindev/community)!
:::
