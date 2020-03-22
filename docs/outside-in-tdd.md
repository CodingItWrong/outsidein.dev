---
title: Overview of Outside-In TDD
---

# Overview of Outside-In TDD

## The Outside-In Difference
Traditional Test-Driven Development is usually done only at a unit test level, so you are creating objects and calling functions or methods. It's sometimes referred to as "middle-out TDD", because you start in the middle of your application building domain objects, then you assemble your application features from them.

Outside-In TDD adds a second kind of test: acceptance tests, or E2E tests. These are tests that simulate a user interacting with your application. Acceptance tests work together with unit tests, covering the same functionality. Each provides a different type of value:

- E2E tests
	- Confirms your application does what the user wants it to do ("external" quality) — confidence
	- Helps you focus on writing just enough code to get the current feature working (simple design)
	- Allows larger refactorings involving replacing entire function or object hierarchies, which unit tests would not cover
- Unit tests
	- Confirms your modules have clear and simple interfaces, are loosely coupled ("internal" quality)
	- Run quickly
	- Cover many edge cases
	- Provide most immediate feedback on what exactly is going wrong (defect localization)

How do you decide when and how many E2E tests vs unit tests to write? You write them together in a two-level TDD cycle:

- Red: write an E2E test and watch it fail
- Green: to make it pass, step down to a unit test and use a Red-Green-Refactor cycle to implement only enough functionality to get past the current E2E test failure
- Step back up and rerun the E2E test to see if it passes. If it fails with another failure, step back down to the unit test level again

LOOK INTO HOW GOOS DESCRIBES THE TWO-LEVEL LOOP

This style of TDD is called outside-in because you start from the outside of your application (the E2E test), and you step inward to implement only the functionality that's needed from the outside.

## Write the Code You Wish You Had
But if you're starting from the outside, how can you TDD units that rely on other units that haven't been written yet? The solution is a principle called "write the code you wish you had." When you are test-driving one unit of code, think about what functionality you want it to have itself, and what functionality you want it to rely on collaborators for: other functions or objects. Then, if that collaborator doesn't already exist, write the code you wish you had: call it the way you'd like to be able to call it. Then, in the test, use mock functions or mock objects to take the place of that collaborator, so you can verify how your unit under test interacts with this collaborator.

If you haven't used mocks before, they are a kind of function or object that stands in for a real function or object. Mocks allow you to configure the return values from function calls to match the needs of your test, and they allow you to confirm that functions were called in the way you expect. In this way, mocks can allow you to simulate a collaborator and confirm your unit is interacting with a collaborator the way you expect, before you even write that collaborator.

When you finish testing the current unit, now it's time to build any new collaborators that you mocked. Test-drive them to match the interface you designed for them in the test of the first unit. Again, you'll only be building just enough functionality for that collaborator to satisfy the current feature, which might less than *all* the functionality you could imagine it to have.

There are a number of criticisms of mocking in tests, but the context of outside-in TDD helps explain how they're intended to be used. (In fact, the creators of Outside-In TDD are also the creators of mock objects!)

- Do mocks make your tests less realistic? Well, they test your code in isolation from other code. Is isolated testing less realistic? It doesn't ensure all your units work together—but that's not the job of unit tests. In Outside-In TDD, the acceptance tests ensure your units work together, so that need is met. And if you don't test your units in isolation, you don't get the other benefits of unit testing.
- Do mocks make your tests complex because you have to create mocks that return mocks that return mocks? If that happens, it's not revealing a problem with mocks, but a problem with your production code. It's revealing that the production code has deep coupling to other code, depending on the structure of it. This is a sign the production code should be changed to have simpler dependencies: specifically, to only rely on dependencies passed directly to it, so that only one level of mock is needed. This coupling problem is revealed most clearly when you're using mocks, so this is actually a point in mocks' favor.
