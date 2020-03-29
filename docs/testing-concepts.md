---
title: Testing Concepts
---

# Testing Concepts

## Unit Tests
The term "unit test" refers to an automated test of a portion, or unit, of your code. The difference in use of the term involves what can constitute a "unit".

The strictest definition of a "unit" is a single function, object, or class. For any dependencies that unit has, they will be replaced by a test double instead of using the real dependencies. Almost everyone will make exceptions for utility libraries that work with language primitives, such as using Lodash or Ramda to work with arrays and objects. In that case, those libraries are treated as an implementation detail, just as using the language primitives themselves is an implementation detail. But no other dependencies are used.

Alternatively, a "unit" might be allowed to interact with the framework or library it's based on, but still isolated from any application dependencies. Any test that renders a React or Vue component is dependent on React or Vue respectively, but it can still be isolated from data store dependencies and even from child components.

Finally, a "unit" can involve a function or object's real dependencies within the application. This is the approach to unit testing that the classic teachers of test-driven development generally take. With frontend application components, this can include rendering child components. At this extreme, others would refer to these tests as "integration" tests. The most important thing isn't the term used, but rather the tradeoffs for the type of test you're doing, and that everyone involved understands what is meant by the term used.

In this guide, our unit tests for components will involve rendering, so they will be reliant on React and Vue. They will also do full rendering of child components, including third-party UI library components. However, the components will be isolated from the data stores, so that we will only make assertions on the messages sent to the data stores.

## End-to-End Tests
The category of tests we're referring to here generally simulates a user interacting with your application. There are a number of different names for this type of test that have similar but not quite identical meanings:

The terms "browser automation" and "UI automation" focus on the mechanics of the test: that it is automating UI interactions. These terms apply equally to tests developers write while building the functionality, and tests QA engineers write to test the application after the functionality is complete.

The terms "acceptance tests" and "feature tests" emphasize that each one tests a feature, a user-facing bit of functionality. They are written in terms a user could understand, so that once it passes the user could accept the feature as working. Interestingly, these types of tests do not *always* need to operate at the UI level; a feature can be tested by making requests directly to your business logic code. But in frontend development, and this guide, we will be sticking to UI testing.

The terms "end-to-end tests" and "system tests" emphasize that you are testing an entire system together, not just part of it. But just how far the "end" or "system" extends is also something that can differ. You can test a frontend application that is accessing a real backend system, or you can stub out the backend system and only test the frontend "system" "end-to-end." In those cases, you might also refer to the test as an "integration" test, because you're testing a lot of code all together, but it's not "end-to-end" from the standpoint of the running production system. But note that the term "integration test" is also sometimes used for the type of unit test we are doing!

In this guide we'll write tests that drive the UI of our application, organized by feature. We will stub out the backend API to focus on testing just our frontend application. We'll use the term "end-to-end test" for these tests because it's the most commonly used in the frontend development world, including in the tooling that our Vue exercise uses.

## Stubbing and Mocking
The terms "stubbing" and "mocking" refer to replacing real production dependencies with simpler dependencies that makes testing easier. These operate at both the unit and end-to-end testing level.

In unit tests, the general term for these type of testing dependencies is "test double." The term is analogous to a "stunt double" in a movie: a dependency that stands in for another dependency. In JavaScript, test doubles are generally set up at the function level. The terms "stubs" and "mocks" are often used interchangeably, but they originally carried a difference of meaning. A stub function is one that returns hard-coded data that satisfies the current test. For example, in one test you might stub a web service call function to return a promise that resolves, and in another test you would stub that function to return a promise that rejects. A mock function is one that allows you to make assertions on whether and how it was called. For example, you might have a form component that calls a passed-in function prop when it is submitted. In the test you would pass in a mock function for that prop, then after submitting the form, check that the function was called with the correct arguments.

In end-to-end tests, the dependencies you are replacing are the external systems your application depends on. Cypress, the end-to-end test framework we'll be using, allows replacing or interacting with a number of browser APIs. But for the sake of this guide the dependency we'll be replacing is the backend API. To stick with the sense of the terms "stubbing" and "mocking" above, "stubbing" the backend involves setting up hard-coded responses to requests, to give the app the data it needs for different scenarios. "Mocking" the backend involves making assertions about what calls were made to the backend. This is especially useful when writing data: for example, if you create a new record, you can show it in the UI whether or not it's properly saved to the backend. One simple way to confirm it was saved to the backend is to check that the API call to save it to the backend was made correctly.

In our tests we'll take advantage of both stubbing and mocking in both our unit and end-to-end tests.

## What's Next
Now that we've gotten our testing terms straight, let's look at the way the agile development approach of this guide approaches testing: test-driven development. In the next chapter we'll dig into a bit more of what TDD means, and how the unintuitive practice of writing your tests first leads to a number of benefits.

:::tip
Questions about this chapter? Come chat with us on the [Gitter Community for Outside-In Dev](https://gitter.im/outsideindev/community)!
:::
