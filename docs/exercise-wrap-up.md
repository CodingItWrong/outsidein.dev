---
title: "Exercise Wrap-Up"
---

# Exercise Wrap-Up

We haven't finished building our app, but we've reached the end of our guide. You've now experienced enough Outside-In Test Driven Development that you can continue that approach as you continue to build out our example app, or as you build your own frontend applications.

Let's think about how this process differed from how you may have built frontend apps in the past.

* Our app has been deployed to a running environment before we wrote our first feature. This allows us to get user feedback as early as possible, even if it's only from business representatives on our team. It also avoids the situation where we *say* the app is complete, but then it takes weeks to get it running integrated to the "real" environment.
* Our code is the simplest possible implementation of the current feature set. There is no unused code: for example, there is not data layer functionality to edit or delete restaurants, because that functionality is not yet exposed to the user. This allows us to avoid the cost of maintaining and updating code that isn't even being used yet.
* The main paths of our app are thoroughly covered by end-to-end tests, and all the edge cases in our app are covered by unit tests. We know that there are no behaviors that aren't covered by test, because we only wrote production code in response to a failing test. This means that we can refactor and upgrade dependencies with confidence, knowing that if the tests pass, our application is working.
* Our unit tests test the interface, not the implementation, of our units. We can change things like the structure of HTML, whether we are using UI libraries, component event handling, and the internals of our data store, and our tests will continue to work unchanged. This reduces the cost of maintaining the tests, so the cost of maintaining them won't overcome their value. It also encourages us to refactor.

I've found these differences have a tremendous impact on what the software development experience is like. Before I started using agile development practices including TDD, I was afraid to make changes to working code, because there was always the risk that I would break existing functionality. This led to me living with code that was hard to understand and change, which slowed down the development process more and more over time. It's really a loss of control over my code.

TDD gives me back control over my code, so I can make changes at any time with confidence. This allows me to refactor the code to be as easy to understand as possible, so that my future development speed stays fast. This way I can keep delivering value to my users.

Maybe you're already convinced that TDD accomplishes these things. If so, give it a try on your projects! Or maybe you aren't yet sure that TDD will make this much of a difference. If so, I would ask, do you have an another solution for how to keep your development speed fast, avoiding production bugs and allowing you to keep your code easy to understand in the face of unanticipated changes? If you don't have another solution, I would encourage you to give TDD a try to see if it works as a solution.
