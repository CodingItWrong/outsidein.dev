---
title: 2 - Vertical Slice
---

# 2 - Vertical Slice

Our next story in Trello is:

- [ ] List restaurants

To get a clean start, let's delete out the sample content Vue CLI created with our app. Delete the following files and folders

- `src/assets/`
- `src/components/HelloWorld.vue`
- `tests/e2e/specs/test.js`
- `tests/unit/example.spec.js`

Replace the contents of `src/App.vue` with the following minimal content:

```html
<template>
  <div id="app">
    Hello, world.
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
```

In `public/index.html`, find the `<title>` tag. The `<%= htmlWebpackPlugin.options.title %>` content dynamically fills in the name we specified when we created the app, `opinion-ate`. Let's replace that with a hard-coded title capitalized to match our brand. Update it:

```diff
   <link rel="icon" href="<%= BASE_URL %>favicon.ico">
-  <title><%= htmlWebpackPlugin.options.title %></title>
+  <title>Opinion Ate</title>
 </head>
```

For this tutorial, our backend web service has already been built. Let's get it set up and see how we can load our restaurant data from it. We've set up a Node.js API you can run locally; that way you can edit data without authentication or stepping on other users' data.

Go to the [`codingitwrong/agilefrontend-api` project](https://github.com/CodingItWrong/agilefrontend-api) on GitHub. Clone the project, or just download and expand the zip file.

In the `agilefrontend-api` directory, run the following commands:

```sh
$ yarn setup
$ yarn start
```

This will set up a SQLite database with some test data, and start the API server. You'll see:

```sh
yarn run v1.22.0
$ node server.js
info: serving app on http://127.0.0.1:3333
```

Go to `http://localhost:3333/restaurants` in a browser: you should see the following JSON data (formatted differently depending on your browser and extensions, and of course the dates will differ):

```json
[
  {
    "id": 1,
    "name": "Pasta Place",
    "created_at": "2020-02-27 07:43:58",
    "updated_at": "2020-02-27 07:43:58"
  },
  {
    "id": 2,
    "name": "Salad Place",
    "created_at": "2020-02-27 07:43:58",
    "updated_at": "2020-02-27 07:43:58"
  }
]
```

So this is the web service endpoint our story will need to connect to. Now, to build the frontend.

When performing outside-in TDD, our first step is to **create an end-to-end test describing the feature we want users to be able to do.**

Create a file `tests/e2e/specs/listing-restaurants.spec.js` and add the following:

```js
describe('Listing Restaurants', () => {
  it('shows restaurants from the server', () => {
    const sushiPlace = 'Sushi Place';
    const pizzaPlace = 'Pizza Place';

    cy.server({force404: true});

    cy.route({
      method: 'GET',
      url: 'http://localhost:3333/restaurants',
      response: [
        {id: 1, name: sushiPlace},
        {id: 2, name: pizzaPlace},
      ],
    });

    cy.visit('/');
    cy.contains(sushiPlace);
    cy.contains(pizzaPlace);
  });
});
```

First, we create variables with a few restaurant names, because we'll use them several times.

Then, we call `cy.server()`. This sets up Cypress to stub calls to the backend. By default Cypress will allow any calls that are *not* stubbed through to the backend, but the `force404: true` option means that Cypress will return a 404 Not Found status for them instead. We don't want our E2E tests to ever hit the real backend, so this option is good.

Then, we call `cy.route()` to stub a specific backend request; in this case, the `http://localhost:3333/restaurants` we just tested out. When the app sends a `GET` request to it, we will return the specified response. We pass the method an array of two restaurant objects. Cypress will convert that array of objects into a JSON string and return that from the stubbed network call. Notice that we don't need to include the `created_at` and `updated_at` fields, because our app won't be using them.

Next, we visit the root of our app at `/`. We confirm that the page contains both restaurant names. This will show that the app successfully retrieved them from the backend and displayed them.

After we’ve created our test, the next step in TDD is to **run the test and watch it fail.** This test will fail (be “red”) at first because we haven’t yet implemented the functionality.

To run our test, run `yarn test:e2e`.
After a few seconds the Cypress app should open. In Cypress, click `listing-restaurants.spec.js`. Chrome should open, and the test should run. It is able to visit the root of our app, but when it attempts to find "Sushi Place" on the page, it fails.

It's time for us to write the code to make this pass. Let's think about how we want to structure our code. We're going to have three layers:

- Components that display the user interface.
- A Vuex module that stores our data and lets us interact with it.
- An API client that allows us to make requests to the backend.

With outside-in testing, we build the outside first, which in this case is our user interface components. And a common principle is to **write the code you wish you had.** What does that mean in our case? Well, when we created our app, we were given an `<App />` component. Do we want to put our user interface directly in there? No, it's best to save the `<App />` component for app-wide concerns such as a title bar that we'll add soon. Instead, it would be great if we had a `<RestaurantScreen />` component that would contain everything specific to our restaurants. We wish we had it, so let's add it to `App.js`:

```diff
 <template>
   <div id="app">
-    Hello, world.
+    <RestaurantScreen />
   </div>
 </template>

 <script>
+import RestaurantScreen from '@/components/RestaurantScreen';
+
 export default {
   name: 'App',
+  components: {RestaurantScreen},
 };
 </script>
```

Next, let's actually create the `RestaurantScreen` component we used here.
In `src`, create a `components` folder, then inside it create a `RestaurantScreen.vue` file.
For the moment let's add just enough content to make it a valid component. Add the following:

```html
<template>
  <div>
    <h1>Restaurants</h1>
  </div>
</template>

<script>
export default {
  name: 'RestaurantScreen',
};
</script>
```

If we rerun our E2E test we'll see the "Restaurants" text displayed, but we aren't any closer to passing the text. What do we do next?

Well, what do we want to do on this screen? For this story, we want to display a restaurant list. But we also have an upcoming story where we want to add new restaurants. Those are two different responsibilities we want this screen to have. So let's create child components for each. For now, we'll just create the restaurant list.

Create a `RestaurantList.vue` file in `src/components` and again add the minimal content:

```html
<template>
  <div>RestaurantList</div>
</template>

<script>
export default {
  name: 'RestaurantList',
};
</script>
```

Then render that component in `RestaurantScreen`:

```diff
 <template>
   <div>
     <h1>RestaurantScreen</h1>
+    <RestaurantList />
   </div>
 </template>

 <script>
+import RestaurantList from '@/components/RestaurantList';
+
 export default {
   name: 'RestaurantScreen',
+  components: {RestaurantList},
 };
 </script>
```

Now we finally have `RestaurantList` where we'll put our UI for this story. So far our components haven't done much: `App` just renders `RestarauntScreen`, and `RestaurantScreen` just renders `RestaurantList`. But `RestaurantList` will do more. It needs to:

- Request for the restaurants to be loaded
- Display the restaurants once they're returned

Instead of adding the behavior directly, let’s **step down from the “outside” level of end-to-end tests to an “inside” component test.** This allows us to more precisely specify the behavior of each piece. This unit test will also be helpful in a future story as we add more edge cases to this component. End-to-end testing every edge case would be slow, and make it harder to tell what exactly was being tested.

In `tests/unit`, create a `components` folder, then inside that create a file `RestaurantList.spec.js`.
Now, we'll write a test for the first bit of functionality we need, to load the restaurants. We'll start with the structure of the test suite:

```js
describe('RestaurantList', () => {
  it('loads restaurants on mount', () => {
  });
});
```

Because we are writing a unit test, we don't want to connect our component to our real Vuex store module. Instead, we want to create a stubbed store module that specifies the interface we want our store module to have, and lets us run expectations on it. Our component will ask our store module to load the restaurants, so that means we need a `load` action in the store module:

```diff
   it('loads restaurants on mount', () => {
+    const restaurantsModule = {
+      namespaced: true,
+      actions: {
+        load: jest.fn().mockName('load'),
+      },
+    };
  });
```

We use `jest.fn()` to create a Jest mock function, which will allow us to check that the load action was called. We chain a call to `.mockName()` onto it to make our error messages more readable.

We also add a `namespaced: true` property because that's typical for store modules. We might have separate modules for users, dishes, etc. and the namespace allows keeping them organized.

Now we need to set up a real Vuex store with our module:

```diff
+import Vuex from 'vuex';
+import {createLocalVue} from '@vue/test-utils';
+
 describe('RestaurantList', () => {
+  const localVue = createLocalVue();
+  localVue.use(Vuex);

   it('loads restaurants on mount', () => {
     const restaurantsModule = {
       namespaced: true,
       actions: {
         load: jest.fn().mockName('load'),
       },
     };
+    const store = new Vuex.Store({
+      modules: {
+        restaurants: restaurantsModule,
+      },
+    });
   });
 });
```

We import Vuex. We need to configure Vue to use Vuex, but because we are in a test, we use a Vue Test Utils function called `createLocalVue()` to create a Vue instance that is local to this test. Then we tell it to use Vuex.

In our test, we create a `new Vuex.Store()` just like our production code does, and we just pass in our one restaurants module. Even once our production store has multiple modules, if `RestaurantList` only uses the restaurants store module, that's the only one we would mock out and put in the unit test.

Now, we're ready to mount our component:

```diff
 import Vuex from 'vuex';
-import {createLocalVue} from '@vue/test-utils';
+import {mount, createLocalVue} from '@vue/test-utils';
+import RestaurantList from '@/components/RestaurantList';

 describe('RestaurantList', () => {
   const localVue = createLocalVue();
   localVue.use(Vuex);

   it('loads restaurants on mount', () => {
...
     const store = new Vuex.Store({
       modules: {
         restaurants: restaurantsModule,
       },
     });
+
+    mount(RestaurantList, {localVue, store});
  });
});
```

We import the `RestaurantList` component, then use Vue Test Utils' `mount()` function to mount it. We pass a few options to it: the local Vue instance it should use, and the Vuex store it should use.

Finally, we're ready to run an expectation to confirm that the component loads restaurants on mount. We just check that our mock action was called:

```diff
   it('loads restaurants on mount', () => {
...
     mount(RestaurantList, {localVue, store});
+
+    expect(restaurantsModule.actions.load).toHaveBeenCalled();
   });
```

Now we're ready to run our unit test. Run `yarn test:unit --watch`. The `--watch` flag means the test runner stays open, watching for changes to our files to rerun the tests. Leave it running for the remainder of this section. Jest will run our unit test, and we'll get the following error:

```sh
 FAIL  tests/unit/components/RestaurantList.spec.js
  RestaurantList
    ✕ loads restaurants on mount (5ms)

  ● RestaurantList › loads restaurants on mount

    expect(load).toHaveBeenCalled()

    Expected number of calls: >= 1
    Received number of calls:    0

      22 |     mount(RestaurantList, {localVue, store});
      23 |
    > 24 |     expect(restaurantsModule.actions.load).toHaveBeenCalled();
         |                                            ^
      25 |   });
      26 | });
```

Our test says we expected the `load()` function to have been called at least once, but it wasn't called. This makes sense: we haven't hooked up the mount functionality yet. Now that our test is red, it's time to make it green.

To dispatch a Vuex action from a component, first, we use Vuex's `mapActions` function to connect the action to our component:

```diff
 <script>
+import {mapActions} from 'vuex';
+
 export default {
   name: 'RestaurantList',
+  methods: mapActions({
+    loadRestaurants: 'restaurants/load',
+  }),
 };
</script>
```

We say that we want to take the action `restaurants/load` and expose it to our component with the name `loadRestaurants`. Note that our action name has the namespace of the `restaurants` module, then the action name `load` that we gave it.

Save the component and Jest will rerun our test, but it will fail in the same way. We've connected our action to our component, but we aren't calling it yet. Doing it so is easy:

```diff
 export default {
   name: 'RestaurantList',
+  mounted() {
+    this.loadRestaurants();
+  },
   methods: mapActions({
     loadRestaurants: 'restaurants/load',
   }),
 };
```

We define a `mounted()` lifecycle hook (NAME?) to run when the component is first mounted. In it, we call the `this.loadRestaurants()` method on our component, which was mapped to the `restaurants/load` action.

Save the file and, sure enough, our test is green. We've passed our first unit test!

This gives us one of the behaviors we want our `RestaurantList` to have: loading the restaurants when it is mounted. Now it's time to write a test for the second behavior: displaying the restaurants. Let's add another `it()` block inside the `describe()`, with the following contents:

```js
  it('displays the restaurants', () => {
    const records = [
      {id: 1, name: 'Sushi Place'},
      {id: 2, name: 'Pizza Place'},
    ];

    const restaurantsModule = {
      namespaced: true,
      state: {records},
      actions: {
        load: jest.fn().mockName('load'),
      },
    };
    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantsModule,
      },
    });

    const wrapper = mount(RestaurantList, {localVue, store});
  });
```

So far it's pretty similar to our previous test. There are just a few differences:

- We define a `records` variable that contains an array of two restaurant objects.
- We pass a `state` property to our restaurants module, which is an object that contains a `records` property. Because the property name is the same as the name of the `records` variable we defined, we just include `records` in the object. Property shorthand means that a `records` property will be defined with the value being the value of our `records` variable.
- We assign the return value of `mount()` to a variable, `wrapper`, because we'll need it in a moment.

Notice that we **run one expectation per test in component tests.** Having separate test cases for each behavior of the component makes it easy to understand what it does, and easy to see what went wrong if one of the assertions fails.

You may recall that this isn’t what we did in the end-to-end test, though. Generally you should **make _multiple_ assertions per test in end-to-end tests.** Why? End-to-end tests are slower, so the overhead of the repeating the steps would significantly slow down our suite as it grows.

Now, instead of running an expectation that `load` was called, we use the `wrapper` to check what is rendered out:

```diff
     const wrapper = mount(RestaurantList, {localVue, store});
+
+    const firstRestaurantName = wrapper
+      .findAll('[data-testid="restaurant"]')
+      .at(0)
+      .text();
+    expect(firstRestaurantName).toBe('Sushi Place');
   });
```

This is little verbose, so let's see what's going on:

- We call `wrapper.findAll()` to find all the elements matching a CSS selector. The selector we use is `[data-testid='restaurant']`. Test IDs are a helpful way to pull up elements in your tests.
- There should be two different restaurants displayed, so we get the element of the first one (index zero) by calling `.at(0)`.
- We call `.text()` to get the text contents of the element.
- We assign the result of all of that to the variable `firstRestaurantName`.
- We check that the value of `firstRestaurantName` is "Sushi Place".

When we save the file, our test runs, and it's red, as we expect. We get the following error:

```sh
 FAIL  tests/unit/components/RestaurantList.spec.js
  RestaurantList
    ✓ loads restaurants on mount (3ms)
    ✕ displays the restaurants (7ms)

  ● RestaurantList › displays the restaurants

    [vue-test-utils]: no item exists at 0

      61 |     const firstRestaurantName = wrapper
      62 |       .findAll('[data-testid="restaurant"]')
    > 63 |       .at(0)
         |        ^
      64 |       .text();
      65 |     expect(firstRestaurantName).toBe('Sushi Place');
```

So no element with `[data-testid='restaurant']` is found. Following the process of fixing the error in the simplest possible way, let's just hard-code an element with that test ID. Since there will be a list of them, let's make it an `li` element inside a `ul`:

```diff
 <template>
-  <div>RestaurantList</div>
+  <ul>
+    <li data-testid="restaurant" />
+  </ul>
 </template>
```

Our test reruns and we're past that error, on to the next one:

```sh
  ● RestaurantList › displays the restaurants

    expect(received).toBe(expected) // Object.is equality

    Expected: "Sushi Place"
    Received: ""

      63 |       .at(0)
      64 |       .text();
    > 65 |     expect(firstRestaurantName).toBe('Sushi Place');
         |                                 ^
      66 |   });
```

So we expected the text of the element to be "Sushi Place", but there was no text in it, so we got an empty string instead.

At this point, we could hard-code the name, but it's better to go ahead and pull it from the Vuex data. First, we use Vuex's `mapState` function to access the state:

```diff
 <script>
-import {mapActions} from 'vuex';
+import {mapState, mapActions} from 'vuex';

 export default {
...
   methods: mapActions({
     loadRestaurants: 'restaurants/load',
   }),
+  computed: mapState({
+    restaurants: state => state.restaurants.records,
+  }),
 };
 </script>
```

We configure a `computed` property on the component named `restaurants`, that pulls from the `records` property of the `restaurants` module of the `state`.

Now, let's loop through these restaurants to display a list item for each:

```diff
   <ul>
-    <li data-testid="restaurant" />
+    <li
+      v-for="restaurant in restaurants"
+      :key="restaurant.id"
+      data-testid="restaurant"
+    >
+      {{ restaurant.name }}
+    </li>
  </ul>
```

We use Vue's `v-for` directive to loop over the `restaurants`. Vue requires us to specify a `:key` so it can keep track of which DOM elements correspond to which records, so we pass the `record.id` as the key. We keep the `data-testid` attribute so our test can find the restaurants. Then we output the `restaurant.name` as text in the list item.

Save and now both tests are passing.

For completeness, let's check the second displayed restaurant as well:

```diff
     const firstRestaurantName = wrapper
       .findAll('[data-testid="restaurant"]')
       .at(0)
       .text();
     expect(firstRestaurantName).toBe('Sushi Place');
+
+    const secondRestaurantName = wrapper
+      .findAll('[data-testid="restaurant"]')
+      .at(1)
+      .text();
+    expect(secondRestaurantName).toBe('Pizza Place');
   });
```

This test passes right away. Although this step isn't really TDD because we write the test that already passes, it can be useful to confirm a behavior for extra certainty.

We've now successfully defined both behaviors of our `RestaurantList`!

In the TDD cycle, **whenever the tests go green, look for opportunities to refactor.** There's a lot of duplication in our two tests. Now that we see which parts are shared, let's extract that duplication. First, let's set up some shared data:

```diff
 describe('RestaurantList', () => {
+  const records = [
+    {id: 1, name: 'Sushi Place'},
+    {id: 2, name: 'Pizza Place'},
+  ];
+
   const localVue = createLocalVue();
   localVue.use(Vuex);

+  let restaurantsModule;
+  let wrapper;
+
+  beforeEach(() => {
+    restaurantsModule = {
+      namespaced: true,
+      state: {records},
+      actions: {
+        load: jest.fn().mockName('load'),
+      },
+    };
+    const store = new Vuex.Store({
+      modules: {
+        restaurants: restaurantsModule,
+      },
+    });
+
+    wrapper = mount(RestaurantList, {localVue, store});
+  });
```

Although both of our tests don't need the records state or the wrapper, it's okay to set them up for both tests. This sets up a component in a good default state, so each test can stay focused on what it wants to assert.

Now we can remove the duplicated code from the individual tests:

```diff
 it('loads restaurants on mount', () => {
-  const restaurantsModule = {
-  namespaced: true,
-    actions: {
-      load: jest.fn().mockName('load'),
-    },
-  };
-
-  const store = new Vuex.Store({
-    modules: {
-      restaurants: restaurantsModule,
-    },
-  });
-
-  mount(RestaurantList, {localVue, store});
   expect(restaurantsModule.actions.load).toHaveBeenCalled();
 });

 it('displays the restaurants', () => {
-  const records = [
-    {id: 1, name: 'Sushi Place'},
-    {id: 2, name: 'Pizza Place'},
-  ];
-
-  const restaurantsModule = {
-    namespaced: true,
-    state: {records},
-    actions: {
-      load: jest.fn().mockName('load'),
-    },
-  };
-  const store = new Vuex.Store({
-    modules: {
-      restaurants: restaurantsModule,
-    },
-  });
-
-  const wrapper = mount(RestaurantList, {localVue, store});
-
   const firstRestaurantName = wrapper
      .findAll('[data-testid="restaurant"]')
...
   expect(secondRestaurantName).toBe('Pizza Place');
 });
```

Save the file and our tests should still pass. With this, our tests are much shorter. Almost all they contain is the expectations. This is good because it keeps our tests focused and very easy to read.

We've now specified the behavior of our `RestaurantList` component, but we haven't yet built the store module.
You also might notice that our tests don't indicate the relationship between dispatching the `load` action and getting back the restaurants to display. That's because the `RestaurantList` doesn't know about that relationship; it just knows about an action and some state items. To get our store module working that way, let's write a unit test for it to specify that when we dispatch the `load` action, the restaurants are retrieved from the API and saved in the state.

Let's create a test for our store module. Under `tests/unit`, create a `store` folder. Inside it, create a `restaurants.spec.js` file. Add the following structure:

```js
import Vuex from 'vuex';
import {createLocalVue} from '@vue/test-utils';
import restaurants from '@/store/restaurants';

describe('restaurants', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  describe('load action', () => {
    it('stores the restaurants', async () => {
    });
  });
});
```

As with our component test, we create a local Vue instance and attach Vuex to it. Then we create a `describe` block for our load action, which right now just has one test: that it stores the restaurants. Note that the test function is `async`, to allow for our stubbed network request. Now let's fill that test out.

We will need some records to be returned by our mocked API:

```diff
     it('stores the restaurants', async () => {
+      const records = [
+        {id: 1, name: 'Sushi Place'},
+        {id: 2, name: 'Pizza Place'},
+      ];
     });
```

As we said earlier, our app will consist of three layers:

- The UI components
- The Vuex module
- The API client

So we won't make an HTTP request directly in our Vuex module.
Instead, we'll delegate to an API object that we pass in. Let's design the interface of that object now:

```diff
     it('stores the restaurants', async () => {
       const records = [
         {id: 1, name: 'Sushi Place'},
         {id: 2, name: 'Pizza Place'},
       ];

+      const api = {
+        loadRestaurants: () => Promise.resolve(records),
+      };
     });
```

Giving the `api` object a descriptive `loadRestaurants()` methods seems good. We are stubbing out the API here in the test, so we'll just implement that method to return a Promise that resolves to our hard-coded records.

Now, to set up our `restaurants` store module. Just like in our component test, we'll use a real Vuex.Store instance to test that it all works together. For ease of testing, we can set up our `restaurants.js` file to export a function that takes in the `api`, and returns the store module:

```diff
 import Vuex from 'vuex';
 import {createLocalVue} from '@vue/test-utils';
+import restaurants from '@/store/restaurants';

 describe('restaurants', () => {
...
       const api = {
         loadRestaurants: () => Promise.resolve(records),
       };
+      const store = new Vuex.Store({
+        modules: {
+          restaurants: restaurants(api),
+        },
+      });
     });
```

Now that our store is set, we can dispatch the load action, then check the state of the store afterward:

```diff
       const store = new Vuex.Store({
         modules: {
           restaurants: restaurants(api),
         },
       });

+      await store.dispatch('restaurants/load');
+
+      expect(store.state.restaurants.records).toEqual(records);
     });
```

When the test runs, you should see the error:

```sh
 FAIL  tests/unit/store/restaurants.spec.js
  ● Test suite failed to run

    Configuration error:

    Could not locate module @/store/restaurants mapped as:
    /Users/josh/apps/agilefrontend/vue/src/store/restaurants.
```

The `restaurants` module we're importing wasn't found. To do just enough to fix the current error, let's create an empty file at `src/store/restaurants.js`.

The tests will automatically rerun, and we get a different error:

```sh
 FAIL  tests/unit/store/restaurants.spec.js
  ● restaurants › load action › stores the restaurants

    TypeError: (0 , _restaurants.default) is not a function

      19 |       const store = new Vuex.Store({
      20 |         modules: {
    > 21 |           restaurants: restaurants(api),
         |                        ^
      22 |         },
      23 |       });
```

So we aren't actually exporting a function from `restaurants.js`. Let's do that:

```js
const restaurants = () => {};

export default restaurants;
```

The new error:

```sh
 FAIL  tests/unit/store/restaurants.spec.js
  ● restaurants › load action › stores the restaurants

    TypeError: Cannot read property 'getters' of undefined

      17 |         loadRestaurants: () => Promise.resolve(records),
      18 |       };
    > 19 |       const store = new Vuex.Store({
         |                     ^
      20 |         modules: {
      21 |           restaurants: restaurants(api),
      22 |         },
```

Vuex is expecting an object to be passed in as the module, but it's getting undefined instead. Let's update our `restaurants` function to return an empty object.

```diff
-const restaurants = () => {};
+const restaurants = () => ({});
```

The new error:

```sh
 FAIL  tests/unit/store/restaurants.spec.js
  ● Console

    console.error node_modules/vuex/dist/vuex.common.js:422
      [vuex] unknown action type: restaurants/load
```

So we need to create the action:

```diff
-const restaurants = () => ({});
+const restaurants = () => ({
+  namespaced: true,
+  actions: {
+    load() {},
+  },
+});
```

Note that we need the `namespaced` property here or else the `load` action is not nested under the prefix `restaurants/`.

Now, instead of a configuration error, we get an expectation failure:

```sh
 FAIL  tests/unit/store/restaurants.spec.js
  ● restaurants › load action › stores the restaurants

    expect(received).toEqual(expected) // deep equality

    Expected: [{"id": 1, "name": "Sushi Place"}, {"id": 2, "name": "Pizza Place"}]
    Received: undefined

      25 |       await store.dispatch('restaurants/load');
      26 |
    > 27 |       expect(store.state.restaurants.records).toEqual(records);
         |                                               ^
```

The `restaurants.records` state item is undefined, because we haven't put it there at all. This won't make the expectation pass, but let's set `records` to a default value of an empty array to confirm that our test sees it correctly:

```diff
 const restaurants = () => ({
   namespaced: true,
+  state: {
+    records: [],
+  },
   actions: {
     load() {},
   },
 });
```

The test now shows the empty array as the received value:

```sh
    expect(received).toEqual(expected) // deep equality

    - Expected
    + Received

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

Now we're ready to implement our `load` action to retrieve the records from the `api` and store them using a mutation:

```diff
 const restaurants = () => ({
   namespaced: true,
   state: {
     records: [],
   },
   actions: {
-    load() {},
+    load({commit}) {
+      api.loadRestaurants().then(records => {
+        commit('storeRecords', records);
+      });
+    },
   },
+  mutations: {
+    storeRecords(state, records) {
+      state.records = records;
+    },
+  },
});
```

With this, our test passes. Note that our test doesn't know about the `storeRecords` mutation; it treats it as an implementation detail. Our test interacts with the store the same way our production code does: dispatches an action, then reads a state item.

Our component and store are built; now we just need to build our API. You may be surprised to hear that we aren't going to unit test it at all. Let's look at the implementation, then we'll discuss why.

We'll use the popular `axios` library to make our HTTP requests. Add it to your project:

```sh
$ yarn add axios
```

> One reason to use `axios` is that Cypress's network request mocking doesn't currently work for `fetch()` requests, only for the older `XMLHttpRequest` API. `axios` uses `XMLHttpRequest` under the hood while providing a nicer interface than either it or `fetch()` in my opinion, so it's a great choice for any web application, but especially one tested with Cypress.

Now create an `api.js` file under `src`, and provide the following implementation:

```js
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3333/',
});

const api = {
  loadRestaurants() {
    return client.get('/restaurants').then(response => response.data);
  },
};

export default api;
```

First we import `axios`, then call its `create()` method to create a new Axios instance configured with our server's base URL. We'll provide the default `localhost` URL that our server will run on. Then we create an `api` object that we're going to export with our own interface. We give it a `loadRestaurants()` method. In that method, we call the Axios client's `get()` method to make an HTTP `GET` request to the path `/restaurants` under our base URL. Axios resolves to a `response` value that has a `data` field on it with the response body. In cases like ours where the response will be JSON data, Axios will handle parsing it to return a JavaScript data structure. So by returning `response.data` our application will receive the data the server sends.

Now, why aren't we unit testing this API? We could set it up to pass in a fake Axios object and mock out the `get()` method on it. But there is a unit testing principle: **don't mock what you don't own.** There are a few reasons for this. First, if you mock third party code but you get the functionality wrong, then your tests will pass against your mock, but won't work against the real third-party library. This is especially risky when the behavior of the library changes from how it worked when you first wrote the test. Also, some of the value of unit tests is in allowing you to design the API of your dependencies, but since you can't control the API of the third-party library, you don't get the opportunity to affect the API. (Pull requests to open-source projects notwithstanding!)

So how can you test code with third-party dependencies if you can't mock them? The alternative is to do what we did here: **wrap the third-party code with your *own* interface that you do control, and mock that.** In our case, we decided that we should expose a `loadRestaurants()` method that returns our array of restaurants directly, not nested in a `response` object. That module that wraps the third-party library should be as simple as possible, with as little logic as possible—ideally without any conditionals. That way, you won't even feel the need to test it. Consider our application here. Yes, we could write a unit test that if Axios is called with the right method, it resolves with an object with a data property, and confirm that our code returns the value of that data property. But at that point the test is almost just repeating the production code. This code is simple enough that we can understand what it does upon inspection. And our Cypress test will test our code in integration with the third party library, ensuring that it successfully makes the HTTP request.

With all that said, we're ready to wire up our store module and API to see if it all works. Make the following changes in `src/store/index.js`.  We can remove the root-level `state`, `mutations`, and `actions`, just filling in the `modules`:

```diff
 import Vue from 'vue';
 import Vuex from 'vuex';
+import restaurants from './restaurants';
+import api from '../api';

 Vue.use(Vuex);

 export default new Vuex.Store({
-  state: {},
-  mutations: {},
-  actions: {},
-  modules: {},
+  modules: {
+    restaurants: restaurants(api),
+  },
 });
```

Go back into the Chrome instance that's running our Cypress test, or re-open it if it's closed.
Rerun the test. The test should confirm that "Sushi Place" and "Pizza Place" are loaded and displayed on the page. Our E2E test is passing!

Now let's see our app working against the real backend. Start the API by running `yarn start` in its folder.

Now we're set to run our app. In our Vue app's directory, run the app with `yarn serve`:

```sh
$ yarn serve
yarn run v1.22.0
$ vue-cli-service serve
 INFO  Starting development server...
98% after emitting CopyPlugin

 DONE  Compiled successfully in 2831ms    4:12:09 PM


  App running at:
  - Local:   http://localhost:8081/
  - Network: http://10.0.1.8:8081/

  Note that the development build is not optimized.
  To create a production build, run yarn build.
```

(Your port number may be different if you started the app before the Cypress tests, or if they are not running.)

Now open the URL of your Vue app. You should see the default "Pasta Place" and "Salad Place" records.

We successfully implemented our first feature with outside-in Test-Driven Development! Now let's push it up to the origin and open a pull request. Wait for CI to complete, then merge the pull request. Now we can mark off our story in Trello:

- [x] List restaurants
