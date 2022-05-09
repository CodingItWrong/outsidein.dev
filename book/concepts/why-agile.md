---
title: "Why Agile?"
sidebar_position: 1
---

# Why Agile?

## The Problem

Software projects rarely go as smoothly as we would like. We make project plans, but how often does reality end up following them? Nobody says it better than Sandi Metz:

> Unfortunately, something will change. It always does. The customers didn’t know what they wanted, they didn’t say what they meant. You didn’t understand their needs, you’ve learned how to do something better. Even applications that are perfect in every way are not stable. The application was a huge success, now everyone wants more. Change is unavoidable. It is ubiquitous, omnipresent, and inevitable.
>
> — Sandi Metz, *Practical Object-Oriented Design*

When you first start building a new software system, things go smoothly and it's easy for you to add new functionality. You feel so productive! But as time goes on, that feeling of progress wanes. When you change a bit of code, something seemingly-unrelated breaks. To add just one new feature, you need to make dozens of changes throughout the codebase.

To make sure your app continues to work as you change it, you need some kind of testing. Maybe you don't have any automated tests, so you have to rely entirely on manually testing. But as your feature set grows, the effort required to manually test it grows at the same rate. With each release you either need to allow more time for manual testing, hire more testers, or retest less and less of your codebase. Or maybe you *do* have automated tests, but changing one feature causes lots of tests to break, so most of your development time goes toward maintaining tests that don't seem to be helping you. Worse, maybe those tests don't actually catch the kinds of bugs your app tends to have, so you have to do just as much manual testing *in addition to* maintaining the test suite!

Martin Fowler explains the ultimate effect of this dynamic within a project in his [design stamina hypothesis](https://www.martinfowler.com/bliki/DesignStaminaHypothesis.html): over time, more and more effort is needed to get less and less results.

How can you address the problem of development slowdown due to change? The first thing that often comes to mind is to *minimize* change by putting more effort into up-front design. If changing the system leads to messy code, then planning how to structure the code and stick to the plan should keep the code cleaner, right? The problem is that, despite our best efforts, an up-front design rarely fits the requirements perfectly—and if the requirements *change*, all bets are off. Any code that doesn't fit with the design will be messy, causing development slowdown.

A common response to *this* problem is to design for flexibility. For example, we don't know for sure what data store we'll use or what communication mechanisms the user will want, so we make our system configurable and pluggable. We think of everything in the system that could vary and we isolate each of those pieces so they can be replaced. But just because the system *could* change in a certain way, that doesn't mean it *will*. And every bit of flexibility and pluggability we build into the system has a cost: it's indirection that makes the code harder to understand and harder to change. When the system doesn't end up changing to take advantage of a given indirection, that's cost that doesn't provide any benefit. And if a change is needed that *wasn't* one of the ones we planned for, we'll have to hack in that change after all.

It seems inevitable that development slows down as systems grow, whether from a lack of flexibility or unnecessary indirection. How can we escape this dilemma?

## How Does Agile Help?

Escaping development slowdown as systems grow is one of the main goals of agile software development. Rather than trying to resist or anticipate change, agile development accepts that unanticipated changes are inevitable. In response, an agile team adopts practices that allow them to effectively respond to change. Here are some of the most central agile development practices:

- **Small Stories:** we break the work up into minimum units of user-visible functionality. For example, an agile team would not build out an application's entire data layer at once. Instead, we build one user-facing feature, including just enough of the data later, business logic, and user interface to get it working. When that work is finished, we start the next story and add another slice of data layer, business logic, and user interface.
- **Evolutionary Design:** as we're adding this functionality story-by-story, we don't try to predict everything our application will need and design an architecture that will satisfy all of it…because we know we'll be wrong. Instead, we strive to make the system's design the best fit for its functionality today—meaning, its functionality as of the story we're currently working on. When the next story starts, then we adjust the design of the system to match the *new* functionality. With a design that is constantly being adjusted, we should never have a system that is either underdesigned with hacked-in changes or overdesigned with unused flexibility.
- **Test-Driven Development:** as we build our stories, we write the test first, and we only write production code in response to a failing test. This ensures that every bit of our logic is covered by test, so that as we adjust the functionality of our system for new stories we will know that nothing's broken. This level of test coverage significantly reduces the need for manual testing, which means our application can grow without the manual testing time increasing indefinitely. TDD also helps us identify and fix design issues in our code that could cause future development slowdown.
- **Refactoring:** at several different moments during the agile process, we refactor, improving the arrangement of the code without changing its functionality. As part of the TDD cycle, we refactor our code as the third step to remove duplication and make other simplifications. When we're preparing to add new functionality, we consider if we can rearrange the code so that the new functionality fits in more naturally.
- **Code Review:** we ensure that the person who wrote a bit of code isn't the only one who is familiar with it. This way another set of eyes can find bugs and look for improvements. Pull requests are a common way to do code review, and they can work well as long as reviewers are focusing on thoroughly understanding the code and not just giving a cursory glance.
- **Continuous Integration:** when a pull request is opened, a Continuous Integration service runs our tests on the branch of code to ensure that our entire suite passes. This means that even if we forget to run the tests ourselves, they will still be run before the PR can be merged. It also ensures the application can run in a new environment, and is not dependent on something implicit in our development environment.
- **Continuous Delivery:** agile teams have the ability to release their system at any moment. To accomplish this, they ensure the main source control branch runs successfully and doesn't include incomplete work. In the rare cases when one of these problems happen, fixing it is the highest priority. It also means that the steps to release are automated. This doesn't mean that the team necessarily *does* release to production every time a new feature is completed, but they have the means to do so.
- **Abstractions:** agile teams are more interested in delivering business value than custom designing every piece of their application. They use abstractions and shared libraries when they meet the app's needs rather than rewriting them unnecessarily. The abstractions they reach for might include community standard build setups, UI libraries, full-stack backend frameworks, and hosting solutions like Netlify and Heroku. When the team finds that an abstraction doesn't meet their needs, then and only then do they write lower-level code themselves.

## Agile Team Practices

The practices above are mostly *development* practices involving how individuals work with their code. But there is a broader scope of agile practices around how teams work together, and these practices are equally important. They aren't addressed in this guide, but an effective agile team will be intentional about their approach to:

- Eliciting needs and feedback from business users
- Coming up with and organizing stories
- Whether and how to estimate stories
- Velocity or other measures of the effectiveness of their process
- Who is part of the team and how their roles work
- Coordinating design, frontend, and backend work for the same user-facing functionality

For more information on agile methodology in general, check out [Agile Methodology Resources](/next-steps#agile-methodology).

## What's Next

In this guide we'll examine and try out most of these agile development practices, but we will have a particular emphasis on test-driven development. Before we get into it, though, first we'll look at some core testing concepts and define terms as we'll use them in this guide.

:::tip
Questions about this chapter? Come chat with us on the [Gitter Community for Outside-In Dev](https://gitter.im/outsideindev/community)!
:::
