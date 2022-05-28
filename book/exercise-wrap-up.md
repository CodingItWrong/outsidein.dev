---
title: "Exercise Wrap-Up"
sidebar_position: 6
pagination_prev: null
---
import Chat from './_chat.mdx';

# Exercise Wrap-Up

Congratulations, you've reached the end of the outside-in frontend development exercise! You've experienced enough outside-in TDD and other agile methodologies that you should have everything you need to put them into practice. One option you could take is to continue to build out more features of the example app on your own. Alternatively, you could go straight to applying these practices in your own frontend applications.

Let's reflect back on the agile development process we followed in the exercise and how it may have differed from the way you've built frontend apps in the past.

* *Our app has been deployed to a live environment since before we wrote our first feature.* This allows us to get user feedback as early as possible, even if it's only from business representatives on our team. It also avoids the situation where we *say* the app is complete, but then it takes weeks to get it running successfully in the "real" production environment.
* *Our code is the simplest possible implementation of the current feature set.* There is no unused code. For example, our data layer doesn't yet allow editing or deleting restaurants, because that functionality isn't yet exposed to the user. By not writing unused code, we avoid the cost of maintaining and updating code that isn't providing value.
* *Our app is thoroughly covered by tests: the main paths by end-to-end tests, and the edge cases by unit tests.* We know that the behavior of our app is fully specified because we only wrote production code in response to a failing test. This means that we can refactor and upgrade dependencies with confidence, knowing that if the tests pass, our application is working.
* *We are testing the interface, not the implementation, of our units.* We can change things like our HTML tags and styles, which component library we use if any, how we structure event-handling code, and the internals of our data store, our tests continuing to pass unchanged. This gives us greater confidence in our changes and reduces the cost of maintaining the tests, so their cost won't outweigh their value. It also encourages us to do smaller, more frequent refactorings.
* *We built one thing at a time.* Instead of building out every aspect of a component or store module at once, we built a vertical slice through all layers of our app. Instead of trying to get the visuals and functionality right at the same time, we got the functionality working first, then refactored the visuals. Working on one thing at a time makes development feel less overwhelming, makes it less likely to miss details, provides lots of stopping points where working progress has been made, and allows us to deliver something useful to our customers earlier.

These differences have had a tremendous impact on my experience as a software developer. Before I started using TDD and other agile development practices, I was afraid to make changes to working code for fear of breaking it. This led me to live with code that was hard to understand and change, which slowed down the development process more and more over time. I had lost control over my code. TDD gives me back control, so I can change my code with confidence at any time.

Maybe you're already convinced of these benefits provided by TDD, together with the other agile development practices we've looked at. If so, give it a try on your projects!

Or maybe you aren't yet convinced TDD will make much of a difference. If that's the case, do you have an another way to keep your development speed fast, avoid production bugs and keep your code easy to understand in the face of unanticipated changes? If not, I would encourage you to give TDD a chance. Try it and see if it surprises you.

## What's Next

We've now completed our exercise. In the next and final chapter we'll wrap up the book by taking a look at resources you can use to learn outside-in development more deeply.

<Chat />
