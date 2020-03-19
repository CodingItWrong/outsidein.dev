---
title: "About This Guide"
---

# About This Guide

## Who Is This Guide For

- **Frontend developers new to testing.** If you haven't written unit or end-to-end tests in frontend apps before, this guide will walk you through the basic elements of these types of tests. You'll get familiar with some of the best tools for writing them, as well as techniques that will help you minimize the costs of those tests while maximizing the value they provide.
- **Frontend developers new to Test-Driven Development.** If you write your frontend tests after you write your production code, this guide will show you how and why you might want to write your tests first. You'll see how Test-Driven Development helps you ensure you cover all the functionality of your app that you might otherwise miss, as well as keeping your tests at an interface level so they won't easily break.
- **Frontend TDDers who only write component tests, or write them first.** This is sometimes referred to as classic TDD, or inside-out TDD because you start with the inside of your app--in the case of frontend apps, your components. You'll see why end-to-end tests complement your unit tests by adding a different kind of coverage, and how they can help keep your units even more focused by helping you avoid TDDing unneeded functionality. You'll also see how Cypress overcomes some of the pain points you may have experienced with end-to-end testing tools in the past.
- **Experienced TDDers new to the frontend.** This was me when I moved into frontend development. I didn't want to leave behind the TDD practices that had helped me so much in server-side apps, but there weren't a lot of resources on how to do TDD effectively in modern frontend frameworks. This guide will give you what you need to apply the TDD techniques you love in React or Vue.js, as well as suggestions for what judgment calls might make sense in frontend development.

## Prerequisites

You'll have the best experience with this guide if you've already done the following.

### Familiarity With Vue and Vuex, or React and Redux

The bulk of this guide will involve building a frontend application in one of two stacks: Vue.js and Vuex, or React and Redux. It's helpful if you already have some familiarity with the stack you choose. We won't be using any too-advanced features of them, and we'll explain what's happening as we go. But we won't explain everything about how the frameworks work or why. Because of that, if you don't already know the stack you'll choose, it's recommended that you go through a basic tutorial on them first. The Vue.js and React guides are excellent, so they make a great place to start:

- Vue.js and Vuex
  - [Vue.js Guide](https://vuejs.org/v2/guide/)
  - [Vuex Guide](https://vuex.vuejs.org/guide/)
- React and Redux
  - [React Tutorial](https://reactjs.org/tutorial/tutorial.html)
  - [Redux Tutorial](https://redux.js.org/basics/basic-tutorial)

### Familiarity with Jest or Mocha

Jest and Mocha are two popular JavaScript testing libraries. We'll be using Jest in this guide. We won't be using any too-advanced features of it, so if you have a basic familiarity with Jest you should be set. And Jest and Mocha are similar enough that if you've used Mocha (and its related libraries Chai and Sinon) you should be able to pick Jest up no problem. But if you haven't used one of these libraries before, it's recommended that you look through the Jest docs to get familiar.

- [Jest - Getting Started](https://jestjs.io/docs/en/getting-started): review "Introduction" section, "Getting Started" through "Mock Functions".

Interestingly, our end-to-end test framework, Cypress, uses Mocha under the hood. But in our Cypress tests we'll mostly be using Cypress APIs, not Mocha ones. So don't worry about getting familiar with Mocha if you haven't used it before: you'll be able to pick it up as we go.

## Text Formatting

When we are displaying whole new blocks of code, they'll be syntax highlighted like this:

```jsx
import React from 'react';

const RestaurantScreen = () => (
  <div>
    <h1>Restaurants</h1>
  </div>
);

export default RestaurantScreen;
```

If you haven't used Vue.js or React before, notice that they each have ways syntactically to combine JavaScript code and what looks like HTML tags. See the Vue.js or React docs for more details.

Because we'll be using Test-Driven Development, we'll be spending less time writing large chunks of code and more time making tiny changes to existing code. In that case, we'll use diff syntax, where lines that are added have a `+` to the left of them, and lines that are removed have a `-`. Those lines will also be highlighted to draw attention to them:

```diff
 import React from 'react';
+import {Provider} from 'react-redux';
+import store from './store';
 import RestaurantScreen from './components/RestaurantScreen';

 const App = () => (
-  <div>
+  <Provider store={store}>
     <RestaurantScreen />
-  </div>
+  </Provider>
 );
```

These `+`s and `-`s aren't part of the code; they just highlight the changes.
