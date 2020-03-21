---
title: "About This Guide"
---

# About This Guide

Web browsers started out displaying static documents, but they're now a platform for fully-featured interactive applications. The JavaScript language and the APIs the browser exposes to it allow building user interfaces that are in many ways as rich as traditional desktop and mobile applications. Frontend JavaScript frameworks like React and Vue.js abstract away many of the details of managing the user interface, allowing developers to focus on the business functionality.

Back when JavaScript was only used to provide a little enhancement on top of server-rendered web pages, testing your JavaScript code was both difficult and, in many cases, unnecessary. But now many web applications have their entire user interface rendered by JavaScript, so testing your JavaScript becomes extremely important. Thankfully, JavaScript test runners, framework-specific testing libraries, and end-to-end testing tools have stepped up to fill the gap.

But like in every area of computing, on the frontend, just having testing tools isn't enough. Many or most developers don't like their tests. Maybe they take much longer to write than the corresponding production code. Maybe one change to production code breaks many tests, requiring lots of effort to fix them. Maybe the tests fail sporadically for no easily understood reason. Maybe the tests don't actually seem to be testing anything that matters. Whatever the reason, the bottom line is that their tests aren't delivering on the promise to improve the development experience.

This is because testing is inherently complex. Whereas there might be only one obvious way to implement a certain production feature, there are likely several possible ways to test it, each with pros and cons that make it difficult to know which to choose. Judgment is necessary. And usually you can't learn judgment from the docs of testing tools. Judgment comes from time and experience.

But we *can* learn from others' experiences. This guide is an attempt to demonstrate how testing principles that emerged in other contexts apply to frontend development. We'll see how to practice Test-Driven Development—specifically, a form called Outside-In Test Driven Development. This approach helps you write tests that thoroughly cover your app but are loosely-coupled so they don't hinder you from making changes.

## Who Is This Guide For

- **Frontend developers new to testing.** If you haven't written unit or end-to-end tests in frontend apps before, this guide will walk you through the basic elements of these types of tests. You'll get familiar with some of the best tools for writing them, as well as techniques that will help you minimize the costs of those tests while maximizing the value they provide.
- **Frontend developers new to Test-Driven Development.** If you write your frontend tests after you write your production code, this guide will show you how and why you might want to write your tests first. You'll see how Test-Driven Development helps you ensure you cover all the functionality of your app that you might otherwise miss, as well as keeping your tests at an interface level so they won't easily break.
- **Frontend TDDers who only write component tests, or write them first.** This is sometimes referred to as classic TDD, or inside-out TDD because you start with the inside of your app--in the case of frontend apps, your components. You'll see why end-to-end tests complement your unit tests by adding a different kind of coverage, and how they can help keep your units even more focused by helping you avoid TDDing unneeded functionality. You'll also see how Cypress overcomes some of the pain points you may have experienced with end-to-end testing tools in the past.
- **Experienced TDDers new to the frontend.** This was me when I moved into frontend development. I didn't want to leave behind the TDD practices that had helped me so much in server-side apps, but there weren't a lot of resources on how to do TDD effectively in modern frontend frameworks. This guide will give you what you need to apply the TDD techniques you love in React or Vue.js, as well as suggestions for what judgment calls might make sense in frontend development.

## About the Author

I'm Josh Justice, and I've worked in software development for 16 years as of this writing. For the first 10 years I worked in server-rendered web applications (which was the only kind of web applications most of us had back then.) And I wasn't doing any automated testing. Every change I made required manually retesting everything in the browser. And, as you can imagine, that resulted in a lot of back-and-forth with QA that delayed releases, and a lot of bugs that made it to production anyway. I usually wasn't working into nights or weekends to get features shipped, but there was always the very real likelihood I'd get a phone call about a production issue I needed to fix urgently.

Eventually I was introduced to unit testing and browser automation testing, and I saw a glimmer of hope. But the language ecosystem and companies I was working in didn't have much experience at testing, so we were all trying to figure it out together. That all changed when I moved to Ruby on Rails. In Ruby, the testing paths are well-trod. I was able to learn from experienced testers and see the kinds of tests they wrote. I saw them (and myself!) ship code to production as soon as the pull request was merged--we knew it would work because the tests passed. I saw security vulnerabilities addressed in a matter of minutes instead of weeks because, as long as the tests passed after we updated, we knew we could release.

Testing wasn't the only thing I learned from them, though. With the confidence that test coverage gave us, we were freed up to make improvements to the code at any time. We focused on naming variables, functions, and classes to clearly describe what they do. We split up long complex functions into smaller ones so that the topmost function read like a summary of steps. We rearranged code so that new features fit in cleanly instead of being hacked in with deeper and deeper nested logic. All of this meant that I could jump into a codebase I had never seen before and understand it quickly.

Several years ago my focus shifted to frontend development. Because of all the benefits I'd seen from testing, one of the first things I looked for was how to do testing in frontend web applications. And the answer was effectively "we're working on it." There were still a lot of questions up in the air about how to build frontend apps that were consistent, performant, and simple, and with those things in flux it made sense that testing approaches were in flux as well. As I tried to understand the testing practices as best I could and trace them over time, I became more and more convinced that the testing principles I'd learned on the backend applied to frontend apps just as well. Most of the differences weren't due to inherent differences in the platforms but rather a lack of information flow from one programming ecosystem to another. That's what convinced me to create different frontend testing resources over time to share what I had learned so far.

The culmination of that process is this guide. It encompasses the practices I'm most convinced lead to applications that are reliable, maintainable, and evolvable. These are the practices that I would reach for no matter what platform, language, or framework I'm using. This guide is an organized presentation of the advice I most commonly pass along to coworkers in code reviews and pairing sessions. These practices came to me having stood the test of time, and I believe they'll continue to do so.

## Prerequisites

You'll have the best experience with this guide if you already have the following:

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
