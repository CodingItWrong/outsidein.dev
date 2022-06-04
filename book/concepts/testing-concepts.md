---
title: Testing Concepts
sidebar_position: 2
---
import Chat from '../_chat.mdx';

# Testing Concepts

Gaining experience in any area of programming requires learning a variety of technical terms—and the area of testing is no different. Testing terms present a particular challenge: they have a tendency to be given many different definitions, often contradictory ones. To begin talking about testing more in depth, then, we need to lay out the terms we'll be using. We'll look at the variety of ways the terms are used in the industry, and we'll define how they will be used in this book.

## Assertions and Expectations
One of the most foundational concepts of automated testing is an assertion: a check that something that *should* be the case really *is* the case. Many test frameworks have one or more `assert…()` functions that do just that:

```js
assert.equal(sum, 42);
```

The test runner we'll be using for unit tests, Jest, has a slightly different terminology. Jest uses an `expect()` function, which allows you to chain function calls together to check a condition, resulting in test code that (arguably, to some people) reads more like natural language:

```js
expect(sum).toEqual(42);
```

Checks that use an `expect()` function are often referred to as "expectations". In this book you'll see the terms "assertion" and "expectation" used interchangeably. There's no practical difference, other than that it reads a bit more naturally in a sentence to say that "In this test we *assert* that X is true".

The end-to-end testing tool we'll be using, Cypress, offers the ability to make a variety of assertions with the `.should()` method. But our Cypress tests are so simple that we won't end up needing any explicit `.should()` calls. Instead, we will call a method to look for an element on the page that `.contains()` a certain string. If that string is found on the page, the test will proceed, but if it isn't found, the test will fail. This is effectively an assertion even though the method isn't named "assert, "expect," or "should."

## Unit Tests
The term "unit test" refers to an automated test of a portion, or unit, of your code. The differences in how people use the term "unit test" involve what they consider a "unit" to be.

The narrowest definition of a "unit" is a single function, object, or class. If a given unit depends on any other functions or objects, they will be replaced by a [test double](#stubbing-and-mocking) in the test. Of course, all code needs to depend on built-in language primitives, functions, and classes, so those are allowed in even the narrowest unit tests. And an exception is sometimes made for low-level utility libraries that effectively extend the language's standard library, such as Lodash for working with arrays and objects or `date-fns` for working with dates. But no other real dependencies are used in the test.

Another definition of a "unit" allows the code under test to interact with the framework it's built with but not other classes or functions in your application's code. When you have a React component function that uses React functionality for state and lifecycle events, testing that component requires running it through React so that necessary functionality works. But that test can still isolate that component from data store dependencies and even child components.

Finally, a "unit" can be scoped to the function or object under test along with *all* of its real dependencies within the application. This is the approach generally taken by the inventors of the modern unit testing and test-driven development. With frontend application components, using a component's real dependencies includes rendering all of its child components. Some would refer to this kind of test as an "integration" test because of the potentially large amount of first-party and third-party code you are "integrating with" in the test. Whichever term is used, the most important thing is that everyone on your team is using a consistent approach and terminology for their tests.

In this book, we'll refer to the tests for our components as "unit tests." Because they will involve rendering the components, they will integrate with React or Vue. The tests will render all of the component's children, including third-party UI library components. However, our components under test will be isolated from our data store: instead of connecting to the real store, we'll make assertions on the messages our components attempt to send to the store.

Our unit tests of data layer code will run that code in integration with our data layer library—Redux or Vuex, respectively. Functions in our data layer code that cooperate together will be tested together as well. For example, our data layer's architecture separates out functions that make asynchronous calls from functions that persist the returned data. Rather than testing these two types of function in separate tests, we'll test them in integration with one another in a single test. But we'll isolate our data layer from our API client, so that our data layer tests aren't dependent on the API client.

## End-to-End Tests
Whereas unit tests run against portions of your application's code, another type of test runs against the entire application and simulates a user interacting with it. There are a variety of terms for this kind of test, with meanings that are similar but not quite identical.

The terms "UI automation test" and "browser automation test" focus on the mechanics of the test: it automates interactions with the user interface. The term "browser automation test" is limited to tests of web applications, but "UI automation test" can apply to tests of either web applications or native mobile and desktop applications. These terms can be used to refer either to tests written by developers for features they built themselves (as we'll be doing in this book) or to tests written by test automation engineers for features built by others.

The terms "acceptance test", "feature test", and "functional test" focus on the scope of a test in this category: it covers a single feature, a user-facing bit of functionality. When this is your mental model for a test, you will tend to write the test to make it closely match the way a user thinks about the interaction, so that once it passes the user can feel confident accepting the feature as working correctly. Interestingly, although these types of tests are usually written to simulate user interactions, there is an alternative: a feature can also be tested by making a sequence of requests directly to your business logic code and verifying the resulting data. But in this book, as is typical in frontend development, we will run our feature tests through the UI of our app.

The terms "end-to-end test" and "system test" refer to testing an entire system together, not just part of it. But if you were hoping that programmers would at least be able to agree on what "the whole system" means, your hopes will be dashed: even these terms are used in different ways. You can test a frontend application and allow it to access the real backend system, or you can isolate the frontend from the backend and only test the frontend "system" "end-to-end." In the latter case, instead of referring to the test as "end-to-end" you might choose to refer to it as an "integration" test because you're testing all of the frontend code integrated together but not testing "end-to-end" from the standpoint of the running production system. But remember that some developers would use the term "integration test" to refer to the type of *unit* test we'll be writing. Whatever terms you choose, you probably shouldn't use the same term for two things at the same time, or things will get confusing: "the two kinds of test we have are integration tests and integration tests!"

In this book we'll write tests that drive the UI of our application, organized by feature. We will isolate our frontend from the backend API to focus on testing our frontend application on its own. We'll use the term "end-to-end test" for these tests because it's commonly used in the frontend development world, including in the tooling that our Vue exercise uses.

## Stubbing and Mocking
The terms "stubbing" and "mocking" refer to replacing real production dependencies with simpler dependencies that makes testing easier. These terms can be used at both the unit and end-to-end testing level.

In unit tests, the general term for this type of testing dependency is a "test double." The term is analogous to a "stunt double" in a movie: a dependency that stands in for another dependency. In programming languages that are purely object-oriented, test double libraries are designed to create doubles for an entire object, but in JavaScript test double libraries are usually designed to create doubles for one function at a time.

Two of the more commonly used types of test double are "stubs" and "mocks." The two terms are often used interchangeably, but their original definitions had a difference of meaning.

A *stub* function is one that returns hard-coded data needed for the current test. For example, consider a component that calls a function that retrieves data from a web service. In one test you might stub that function to return a promise that resolves with web service response data and confirm that the component displays that data correctly. In another test you might stub the same function to return a promise that rejects with an error message, and test that the component correctly handles that error. In both cases, stubbing made it straightforward for you to configure the scenario you wanted to test.

A *mock* function is one that allows you to make assertions about whether and how it was called. A mock function can also optionally be configured to return data if the calling code requires it, just like a stub function. But mocks are particularly useful for cases where no return value is used by the calling code. For example, consider a form component that calls a function when it is submitted, passing it the form data. When testing that component, you could mock the function, fill out and submit the form, then check that the function was called with the data you filled out. The form might or might not use a return value from that function, but either way you want to make sure the function was called with the right arguments.

End-to-end tests don't often involve using test doubles to replace portions of your frontend application code, because you're usually testing your whole frontend application together. Instead, when you replace a dependency in an end-to-end test it's generally something external to your frontend application. Cypress, the end-to-end test framework we'll be using, allows controlling a number of browser APIs, but in this book the only dependency we'll be controlling is the backend web service. "Stubbing" the backend involves setting up hard-coded HTTP responses to give the frontend app the data it needs for different scenarios. "Mocking" the backend involves making assertions about what HTTP requests were sent to the backend, which is especially useful when writing data. For example, if you create a new record, it's not enough to confirm that that record is shown in the UI: you also need to ensure it's properly sent to the backend. Mocked requests allow you to check that the request was made with the correct data.

In the exercise we work through in this book, we'll take advantage of stubbing and mocking in both our unit and end-to-end tests.

## What's Next
Now that we've gotten our testing terms straight, let's look at the way our agile development approach recommends going about testing: test-driven development. In the next chapter we'll describe what TDD means in detail, and we'll explain how the unintuitive practice of writing your tests first leads to a number of benefits.

<Chat />
