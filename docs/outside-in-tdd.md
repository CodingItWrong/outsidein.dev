---
title: Overview of Outside-In TDD
---

# Overview of Outside-In TDD

## Beyond Traditional TDD
Traditional test-driven development is usually done only at a unit test level, so you are creating objects and calling functions or methods. It's sometimes referred to as "middle-out TDD", because you start in the middle of your application building domain logic, then you assemble your application features from that domain code.

There are a few limitations to relying exclusively on unit tests, however. End-to-end testing is another valuable kind of test, and such tests are now feasible for developers to write, especially on the web. But traditional TDD doesn't provide any guidance on how to incorporate end-to-end tests into your TDD workflow, or when to write them, or how to write them.

Also, in middle-out TDD code is usually tested with its real dependencies, the other code it works with in production. This is helpful for test realism and can catch bugs with how modules integrate with one another. But it means that making a change to one lower-level module can cause test failures in many higher-level modules. There can also be a problem with defect localization: the tests aren't able to pinpoint where the bug is in a lower-level module, because they only see the problem that comes out the other end of the higher-level module.

Finally, building from the middle out can result in can result in building functionality that is unused or difficult to use. Say you put a lot of effort TDDing a robust, well-designed module for handling data, then afterward try to integrate it with the rest of your application. Maybe it turns out your app gets all the data it needs from elsewhere, and doesn't actually need that module you put so much effort into. Maybe you discover that the interface of that module isn't in the form that the rest of the app needs, and you need to rework it. Middle-out TDD can be vulnerable to wasted effort.

## The Two-Level TDD Loop
Outside-in TDD addresses all of these problems by adding end-to-end tests that are written as part of a *second* loop:

- Red: write an E2E test and watch it fail
- Green: to make it pass, step down to a unit test and use a Red-Green-Refactor cycle to implement only enough functionality to get past the current E2E test failure
- Step back up and rerun the E2E test to see if it passes. If it fails with another failure, step back down to the unit test level again

These steps can be visualized as a two-level loop:

<img src="/images/loop-e2e.png" alt="Diagram of the outside-in TDD Loop" class="centered" />

This style of TDD is called outside-in because you start from the outside of your application (the E2E test), and you step inward to implement only the functionality that's needed from the outside.

## The Role of End-to-End Tests
In outside-in TDD, end-to-end tests work together with unit tests, covering the same main functionality in a complementary way. Each type of test provides a different value.

End-to-end tests confirm that your application does what the user wants it to do. Whatever is happening inside the code doesn't matter if it doesn't show up on screen for the user. Also, testing the entire app together provides maximum realism, giving confidence that the units all work together. This is sometimes referred to as "external quality": from the outside, the app works.

End-to-end tests allow larger refactorings, because everything about the implementation of your app can change as long as the same UI elements are exposed to the test. You can replace entire function or object hierarchies, which isn't possible with unit tests that each are focused on a single function or object. You can even reuse the same Cypress tests if you rewrite your application in another framework—the Cypress tests are almost identical between our Vue and React exercises!

Outside-in TDD writes end-to-end tests that each focus on one user-facing feature. When you start working on the feature, you write an end-to-end test for it. Then you follow the two-level TDD loop to build out that feature. When the end-to-end test passes, you're done with that feature. This can help you resist the temptation to over-design the code you're working on, preparing for future features that may never come. It helps you focus on simple design, so that your architecture can evolve as the app grows. This minimizes wasted effort, and avoids complex code that has a high maintenance cost without providing benefit.

## The Role of Unit Tests
With all these benefits of end-to-end tests, what's the point of writing unit tests?

Whereas end-to-end tests ensure the external quality of your app, unit tests expose a kind of "internal quality," by showing how your units are used. We covered a lot of this in ["Why TDD?"](/why-tdd.html). Do your units have clear and simple interfaces? Are they easy to instantiate for tests, or do they require a lot of dependencies that are going to make them harder to work with and change in the future? These are factors that affect your speed of development in the future, but end-to-end tests don't give you visibility into them. You can have an app that works reliably from the outside, but is a mess of spaghetti code on the inside, and that means you'll have trouble coping with future change. Unit tests provide pressure towards good design that pays off in the long run.

Unit tests also run much more quickly than end-to-end tests. This means you get immediate feedback when a bug is introduced. This feedback also provides good defect localization, because it pinpoints which unit is not working and what exactly it's doing wrong. The speed of unit tests also makes it feasible to cover every edge case with unit tests, which is just not realistic for end-to-end tests of a system of any size. This full coverage is what provides the confidence to refactor your code, keeping it as usable as possible.

Because of the complementary value of end-to-end and unit tests, outside-in TDDers don't see the two as duplicating effort; they see the two as making up for the limitations of each, to thoroughly ensure the quality of your app.

## Write the Code You Wish You Had
Since the outside-in TDD process starts from the outside, how can you TDD units that depend on other units that haven't been written yet? The solution is a principle called "write the code you wish you had." When you are test-driving one unit of code, think about what functionality you want it to have itself, and what functionality you want it to delegate to collaborators: other functions or objects. Then, if that collaborator doesn't already exist, write the code you wish you had: call it the way you'd like to be able to call it. Then, in the test, use test doubles to take the place of that collaborator, so you can verify how your unit under test interacts with this collaborator.

When you finish testing the current unit, now it's time to build any new collaborators that you scaffolded with test doubles. Test-drive them to match the interface you designed for them in the test of the first unit. Again, you'll only be building just enough functionality for that collaborator to satisfy the current feature, which might less than *all* the functionality you could imagine it to have.

There are a number of criticisms of mocking in tests, usually referring to concerns shared by any use of test doubles. The context of outside-in TDD helps explain how mocks are intended to be used. (In fact, the creators of outside-in TDD are also the creators of mock objects!)

- Do mocks make your tests less realistic? Well, they test your code in isolation from other code. Is isolated testing less realistic? It doesn't ensure all your units work together—but that's not the job of unit tests. In outside-in TDD, it's the job of the *end-to-end* tests to ensure your units work together, so that need is met. As a result, you're free to test your units in isolation so you can get the other benefits of unit testing.
- Do mocks make your tests complex because you have to create mocks that return mocks that return mocks? If that happens, it's not revealing a problem with mocks, but a problem with your production code. It's revealing that the production code has deep coupling to other code, depending on the structure of it. This is a sign the production code should be changed to have simpler dependencies: specifically, to only rely on dependencies passed directly to it, so that only one level of mock is needed. This coupling problem is revealed most clearly when you're using mocks, so this is actually a point in mocks' favor.

## What's Next

In this chapter we summarized what outside-in test-driven development is and how it works. This completes our survey of agile development practices. Next, we'll put these practices into use in an exercise where we build an app using the frontend framework of your choice.

:::tip
Questions about this chapter? Come chat with us on the [Gitter Community for Outside-In Dev](https://gitter.im/outsideindev/community)!
:::
