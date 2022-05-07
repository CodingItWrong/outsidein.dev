---
title: Exercise Intro
sidebar_position: 3
pagination_next: null
---

# Exercise Intro

To see outside-in frontend development in action, we're going to walk through creating a few features in a simple frontend application. We'll build an app for rating dishes at restaurants, called Opinion Ate. Note that we won't get anywhere near finishing the app as part of this guide: we'll only get it started.

One important note before we begin: if you aren't used to test-driven development, it can feel slow, and this can make it tempting to give up. Stick with it through this guide! The value of TDD usually doesn't click until you've given it a bit of practice. Anything new you learn is going to be slower while you're learning it, so don't let that dissuade you.

In addition to that, the functionality we'll be writing in this tutorial is so simple that it would certainly be quicker to write it directly. In real applications, the time it takes to do TDD is offset by the time you save troubleshooting, tracking down bugs that were released to production, restructuring your code because the interface is hard to use, manually testing, and struggling to unit test code that wasn't written to be unit testable. We can't demonstrate that time savings in an exercise, but as you go, think about how much time you give to all of those things, and think about what it would be like if they were drastically reduced.

## Two Paths
There are two different versions of the tutorial: one using React, and one using Vue.js. These are two of the most popular frontend frameworks right now. If you have experience in frontend development you've likely used one of the two. We've made two different tutorials available because, although the principles of unit testing are the same for both, the details of how to write unit tests for them are different enough that it's helpful to see examples in the framework you use. (Both applications will use the same E2E testing tool, Cypress, and our E2E tests for the two are almost identical!)

If you haven't used either React or Vue, they're great options to learn. React has broader adoption, but Vue has the advantage of offering official first-party libraries for build tooling, routing, and state management. Vue also has a more mutation-focused style that may be more familiar to developers from other platforms. Both libraries have excellent documentation, so I'd recommend checking out each and deciding which one you want to use for this tutorial:

* [React - Getting Started](https://reactjs.org/docs/getting-started.html)
* [Vue.js - Introduction](https://vuejs.org/v2/guide/)

Our application is going to follow a common architectural pattern in frontend apps involving three layers:

1. User interface: the components that make up the screens.
2. State management: stores application data and provides operations to work with it.
3. API client: provides access to a web service.

Vue provides an official first-party state management library, Vuex, so that's what we'll use for the Vue version. For React, we'll use Redux, one out the most popular state management libraries that conveniently has a similar approach to Vuex.

If you use a different frontend library or state management layer, don't worry: the testing principles and practices in this book apply to any frontend application. Pick either Vue or React and go through the exercise, then apply what you learn to your stack of choice.

## Pick Your Framework
To get started, pick the version of the exercise you'd like to go through:

- [React Exercise](/react/)
- [Vue Exercise](/vue/)

:::tip
Questions about this chapter? Come chat with us on the [Gitter Community for Outside-In Dev](https://gitter.im/outsideindev/community)!
:::
