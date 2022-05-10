---
title: Testing Concepts
sidebar_position: 2
---
import Chat from '../_chat.mdx';

# Testing Concepts

Just like programming in general, testing in particular has many concepts and technical terms. Testing terms tend to be used with a variety of different meanings, and often contradictory ones. Before we talk more about testing, then, we need to lay out the terms we'll be using. We'll look at the variety of ways the terms are used in the industry, and define how they will be used in this guide.

## Assertions and Expectations
One of the most foundational concepts of automated testing is the asserting: checking that something that *should* be the case really *is* the case. A lot of test frameworks have one or more `assert()` functions that do just that.

Jest has a slightly different terminology: it uses an `expect()` function. This allows you to write checks that (arguably, to some people) read more like natural language, like:

```js
expect(sum).toEqual(42);
```

Checks that use an `expect()` function are often referred to as "expectations". In this guide you'll see the terms "assertions" and "expectations" used interchangeably. There's no practical difference, other than that grammatically it's a bit easier to say "In this test we *assert* that X is true".

In our Cypress tests, and many real-world Cypress tests, there are no explicit "assertions" or "expectations". Instead, you just run a command to find an element on the page that `.contains()` certain content, and if it's not found, the test will fail. This is still functioning as an assertion.

## Unit Tests
The term "unit test" refers to an automated test of a portion, or unit, of your code. The difference in use of the term involves what can constitute a "unit".

The strictest definition of a "unit" is a single function, object, or class. For any dependencies that unit has, they will be replaced by a [test double](#stubbing-and-mocking) instead of using the real dependencies. Usually, exceptions are made for utility libraries that work with language primitives, such as using Lodash or Ramda to work with arrays and objects. In that case, those libraries are treated as an implementation detail, just like the language primitives themselves. But no other dependencies are used.

Alternatively, a "unit" might be allowed to interact with the framework or library it's based on, but still isolated from any application dependencies. Any test that renders a React or Vue component is dependent on React or Vue respectively, but it can still be isolated from data store dependencies and even from child components.

Finally, a "unit" can involve a function or object's real dependencies within the application. This is the approach to unit testing that the classic teachers of test-driven development generally take. With frontend application components, this can include rendering child components. At this extreme, others would refer to these tests as "integration" tests. The most important thing isn't the term used, but rather the tradeoffs for the type of test you're doing, and that everyone involved understands what is meant by the term used.

In this guide, our unit tests for components will involve rendering, so they will be reliant on Vue or React. They will also do full rendering of child components, including third-party UI library components. However, the components will be isolated from the data stores, so that we will only make assertions on the messages sent to the data stores.

Unit tests of our data layer code will run it in integration with the data layer libraries. Different functions in our data layer code that work together (for executing asynchronous code and persisting data) will be tested together as well. The API client will be stubbed or mocked as necessary, so that the data layer is not tested in integration with it.

## End-to-End Tests
The tests we're referring to here generally simulate a user interacting with your application. There are a number of different names for this type of test that have similar but not quite identical meanings.

The terms "browser automation tests" and "UI automation tests" focus on the mechanics of the test: that it is automating UI interactions. These terms are broader than just the kinds of tests developers write while building the application functionality: they can also refer to tests QA engineers write to run after the functionality is delivered.

The terms "acceptance tests", "feature tests", and "functional tests" refer to tests in this category that cover a single feature, a user-facing bit of functionality. These tests are written in terms a user could understand, so that once it passes the user could accept the feature as working. Interestingly, these types of tests are not *always* written to operate at the UI level; a feature can also be tested by making requests directly to your business logic code. But in this guide, as is typical in frontend development, we will run our feature tests through the UI of our app.

The terms "end-to-end tests" and "system tests" refer to testing an entire system together, not just part of it. But just how far the "end" or "system" extends is also something that can differ. You can test a frontend application that is accessing a real backend system, or you can stub out the backend system and only test the frontend "system" "end-to-end." In those cases, you might instead refer to the test as an "integration" test, because you're testing a lot of code integrated together, but not "end-to-end" from the standpoint of the running production system. But remember that some would use the term "integration test" to refer to the type of unit test we are doing. It's probably best not to use the same term for both at the same time!

In this guide we'll write tests that drive the UI of our application, organized by feature. We will stub out the backend API to focus on testing just our frontend application. We'll use the term "end-to-end test" for these tests because it's the most commonly used in the frontend development world, including in the tooling that our Vue exercise uses.

## Stubbing and Mocking
The terms "stubbing" and "mocking" refer to replacing real production dependencies with simpler dependencies that makes testing easier. These terms can be used at both the unit and end-to-end testing level.

In unit tests, the general term for these type of testing dependencies is "test double." The term is analogous to a "stunt double" in a movie: a dependency that stands in for another dependency. In JavaScript, test doubles are generally set up at the function level. The terms "stubs" and "mocks" are often used interchangeably, but they originally carried a difference of meaning. A *stub* function is one that returns hard-coded data that satisfies the current test. For example, in one test you might stub a web service call function to return a promise that resolves, and in another test you would stub that function to return a promise that rejects. A *mock* function is one that allows you to make assertions on whether and how it was called. For example, you might have a form component that calls a passed-in function prop when it is submitted. In the test you would pass in a mock function for that prop, then after submitting the form, check that the function was called with the correct arguments.

In end-to-end tests, the dependencies you are replacing are the external systems your application depends on. Cypress, the end-to-end test framework we'll be using, allows controlling a number of browser APIs, but in this guide the only dependency we'll be controlling is the backend web service. "Stubbing" the backend involves setting up hard-coded HTTP responses to give the app the data it needs for different scenarios. "Mocking" the backend involves making assertions about what HTTP requests were sent to the backend. This is especially useful when writing data: for example, if you create a new record, it's not enough to confirm it's shown in the UI: you also want to ensure it's properly saved to the backend. Mocked requests allow you to check that the request was made with the correct data.

In the exercise we work through in this guide, we'll take advantage of both stubbing and mocking in both our unit and end-to-end tests.

## What's Next
Now that we've gotten our testing terms straight, let's look at the testing aspect of this guide's agile development approach: test-driven development. In the next chapter we'll show what TDD means in more detail, and we'll explain how the unintuitive practice of writing your tests first leads to a number of benefits.

<Chat />
