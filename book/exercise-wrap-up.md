---
title: "Exercise Wrap-Up"
sidebar_position: 6
---

# Exercise Wrap-Up

We haven't finished building the whole app, but we've reached the end of our guide. You've now experienced enough outside-in test-driven development and other agile methodologies that you can apply them as you continue to build out our example app on your own, or as you build your own frontend applications.

Let's think about how this agile development process differed from how you may have built frontend apps in the past.

* Our app has been deployed to a running environment before we wrote our first feature. This allows us to get user feedback as early as possible, even if it's only from business representatives on our team. It also avoids the situation where we *say* the app is complete, but then it takes weeks to get it running successfully in the "real" production environment.
* Our code is the simplest possible implementation of the current feature set. There is no unused code: for example, there is not data layer functionality to edit or delete restaurants, because that functionality is not yet exposed to the user. This allows us to avoid the cost of maintaining and updating code that isn't even being used yet.
* The main paths of our app are thoroughly covered by end-to-end tests, and all the edge cases in our app are covered by unit tests. We know that there are no behaviors that aren't covered by test, because we only wrote production code in response to a failing test. This means that we can refactor and upgrade dependencies with confidence, knowing that if the tests pass, our application is working.
* Our unit tests test the interface, not the implementation, of our units. We can change things like the structure of HTML, whether we are using UI libraries, component event handling, and the internals of our data store, and our tests will continue to work unchanged. This reduces the cost of maintaining the tests, so the cost of maintaining them won't overcome their value. It also encourages us to refactor.
* We stayed focused on building one thing at a time. Instead of building out every aspect of a component or store module at once, we built one at a time. Instead of trying to get the visuals and functionality right at the same time, we got the functionality working first, then refactored the visuals. Working on one thing at a time makes development feel less overwhelming, makes it less likely to miss details, and provides lots of stopping points where working progress has been made.

I've found these differences have a tremendous impact on what the software development experience is like. Before I started using agile development practices including TDD, I was afraid to make changes to working code, because there was always the risk that I would break existing functionality. This led to me living with code that was hard to understand and change, which slowed down the development process more and more over time. It was a loss of control over my code.

TDD gives me back control over my code, so I can make changes at any time with confidence. This allows me to refactor the code to be as easy to understand as possible, so that my future development speed stays fast. This way I can keep delivering value to my users.

Maybe you're already convinced that TDD, together with the other agile development practices, accomplishes these things. If so, give it a try on your projects! Or maybe you aren't yet sure that TDD will make this much of a difference. If so, do you have an another solution for how to keep your development speed fast, avoiding production bugs and allowing you to keep your code easy to understand in the face of unanticipated changes? If not, I would encourage you to give TDD a try to see if it works for you.

## What's Next

We've now completed our exercise. In the next and final chapter we'll wrap up our guide by taking a look at resources you can use to learn outside-in development more deeply.

:::tip
Questions about this chapter? Come chat with us on the [Gitter Community for Outside-In Dev](https://gitter.im/outsideindev/community)!
:::
