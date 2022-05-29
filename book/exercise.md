---
title: Exercise
sidebar_position: 3
pagination_next: null
---
import Chat from './_chat.mdx';

# Exercise

To see outside-in test-driven development in action, let's walk through creating a few features in a simple frontend application. We'll build an app for rating dishes at restaurants, called Opinion Ate. We'll get to experience all parts of the outside-in TDD process, but note that we'll only get the app started and won't get anywhere near finishing it.

If you aren't used to test-driven development, the process can feel slow at first, and it can be tempting to give up. Stick with it through this guide! The value of TDD usually doesn't click until you've gotten a bit of practice. Anything new you learn is going to be slower while you're learning it. Once you've gotten some practice with TDD it'll be a tool in your toolbelt, and then you'll be in a better position to decide whether and how often to use it.

As is the case with most TDD tutorials, the functionality we'll be writing here is so simple that it would probably be quicker to write it without tests. In real applications, the time TDD takes is offset by the time you save troubleshooting, tracking down production bugs, restructuring your code, manually testing, and struggling to write tests for code that wasn't written to be testable. It's difficult to demonstrate that kind of time savings in an exercise, but consider this: how much time do you spend on all those problems? How much more enjoyable would your development process be if you could significantly reduce them? Once you've learned TDD you can try it out on your real projects and see if you see improvements.

## Two Paths
There are two different versions of the tutorial: one using React, and one using Vue.js 2.x. At time of writing these are two of the most popular frontend JavaScript frameworks, and if you have experience in frontend development you've likely used one of the two. We've made two different tutorials available because, although the process of outside-in TDD is the same for both, the details of how to write application code and unit tests are different enough that it's helpful to get direct experience with the framework you use. Interestingly, though, both examples use the same E2E testing tool, Cypress, and our E2E tests for the two are almost identical!

If you haven't used either React or Vue, they're great options to learn. React has broader adoption, while Vue offers official first-party libraries for common needs like routing and state management. Vue also has mutation-based APIs that may be more familiar to developers coming from other platforms. Both libraries have excellent documentation, so feel free to get a taste of each before deciding to use for this exercise:

* [React home page](https://reactjs.org)
* [Vue.js 2.x home page](https://v2.vuejs.org/)

Our application is going to follow a common architectural pattern for frontend apps involving three layers:

1. **User interface:** the components that make up the screens.
2. **State management:** stores application data and provides operations to work with it.
3. **API client:** provides access to a web service.

Vue 2.x provides an official first-party state management library, Vuex, so that's what we'll use for the Vue version. For React, we'll use Redux, a popular state management library that conveniently has a similar approach to Vuex.

If you use a different frontend library or state management layer, don't worry: the testing principles and practices in this book apply to any frontend application. Pick either React or Vue and go through the exercise—afterward, you'll be able to apply what you learn to your stack of choice.

## Pick Your Framework
To get started, pick the version of the exercise you'd like to go through:

- [React Exercise](./react/index.md)
- [Vue Exercise](./vue/index.md)

<Chat />
