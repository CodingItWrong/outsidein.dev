---
title: "Why Agile?"
---

# Why Agile?

## The Problem

Few software projects go as smoothly as we would like. We plan how they will go, but what happens next? Nobody says it better than Sandi Metz:

> Unfortunately, something will change. It always does. The customers didn’t know what they wanted, they didn’t say what they meant. You didn’t understand their needs, you’ve learned how to do something better. Even applications that are perfect in every way are not stable. The application was a huge success, now everyone wants more. Change is unavoidable. It is ubiquitous, omnipresent, and inevitable.
>
> — Sandi Metz, *Practical Object-Oriented Design*

When we first start building a new software system, things go smoothly and it's easy for us to add new functionality. We feel so productive! But as time goes on, that feeling of progress wanes. You change a bit of code, and something seemingly-unrelated breaks. You need to make dozens of changes throughout a codebase just to add one new feature.

Maybe you don't have any automated tests, so you have to manually test your app when it changes. But as your feature set grows, you either need to take longer to manually test, hire more testers, or retest less and less of your codebase on each release. Or maybe you do have automated tests, but changing one feature causes lots of tests to break, so most of your development time goes toward maintaining tests that don't seem to be helping you. Worse, maybe those tests don't actually catch the kinds of bugs your app tends toward, so you *still* have to do just as much manual testing on top of maintaining the test suite!

The ultimate effect of this trend is described by Martin Fowler's [design stamina hypothesis](https://www.martinfowler.com/bliki/DesignStaminaHypothesis.html): projects come to a point where more and more effort is needed to get less and less results.

How can you address this slowdown problem? A first instinct is to invest more in up-front design. We let the system get to messy, so if we plan out how all the code will be structured in advance, then stick to the plan, the code should stay cleaner. The problem is that the plan rarely perfectly accounts for reality, even if the requirements don't change—and if they do change, all bets are off. The code that doesn't fit with the plan will be messy anyways, causing our development slowdown.

A common response to *this* problem is to design for flexibility. We don't know what data store we'll use, or what communication mechanisms the user will have, so we make our system configurable and pluggable. We think of everything in the system that could vary, and we design each piece to be flexible. But this causes problems because just because the system *could* vary in a certain way, that doesn't mean it *will* vary. And every bit of flexibility and pluggability we build into the system is indirection that has a cost in terms of making the code harder to understand and harder to change—cost that doesn't provide any benefit when the system doesn't vary in that dimension. Not only this, but if needs for change come up in the system that we *didn't* plan for, that code will end up messy just like in our first case. And whether from unnecessary flexibility or missing flexibility, our development will slow down again.

This all feels like a catch-22. How can we escape the development slowdown that seems inevitable as systems grow?

## How Does Agile Help?

Escaping development slowdown as systems grow is one of the main goals of agile software development. Here's how agile developers accomplish this:

- **Small Stories:** we break the work up into minimum units of user-visible functionality. For example, rather than building out the entire data layer at once, we build out just enough of the data later to get one feature working, along with the corresponding business logic and user interface. We finish that work and make it available for review. Then we start the next story, and add another slice of data layer, business logic, and user interface.
- **Evolutionary Design:** as we're adding this functionality story-by-story, we don't try to think ahead for everything our application will need and design an architecture that will accommodate it—because we know we'll be wrong. Instead, we strive to make the system the best design for its functionality as it stands today, for this story. When the next story starts, then we adjust the design of the system to match the *new* functionality. As a result of making these changes, we should never have a system that is underdesigned with hacked-in changes or, in the flip side, is overdesigned with flexibility that is unused.
- **Test-Driven Development:** as we build our stories, we write the test first, and only writing production code in response to a failing test. This ensures that every bit of our functionality is covered by test, so that as we adjust the functionality of our system for new stories we know nothing breaks. Such test coverage minimizes the need for manual testing, so that our application can grow without the manual testing time increasing indefinitely. TDD also helps us see design issues in our code and correct them, so that our code is flexible for future changes.
- **Refactoring:** at several different parts of the agile process, we refactor: we change the arrangement of the code without changing its functionality. As part of the TDD cycle, we refactor our code as the third step to make it clearer and simpler. When we are looking to add new functionality, we also consider if we can rearrange the code to a new form that better prepares it for adding the new functionality.
- **Code Review:** as we finish a feature, we push it up to our version control server and open a pull request, which presents the changes for a team member to review. This gives team members a chance to catch bugs and find improvements. It also allows them to familiarize themselves with the code so they will not be surprised by it if and when they need to work on it in the future.
- **Continuous Integration:** when a pull request is opened, a Continuous Integration service runs our tests on the PR to ensure that our entire suite passes. This means that even if we forget to run the tests ourselves, they will still be run before the PR can be merged. It also ensures the system works in a new environment, and that there is nothing specific to our development machine needed for it to work.
- **Continuous Delivery:** agile teams have the ability to release their system at a moment's notice any time. This includes ensuring that the main source control branch is never broken and doesn't include incomplete work. It also means that the steps to release are automated. This doesn't mean that the team necessarily *does* release to production any time a new feature is completed, but they have the means to do so.
- **Abstractions:** agile teams are more interested in delivering business value than writing every piece of their application just they way they want it. They use abstractions and shared libraries when they meet the app's needs rather than rewriting them unnecessarily. The abstractions they reach for might include community standard build setups, UI libraries, full-stack backend frameworks, and hosting solutions like Netlify and Heroku. When the team finds that an abstraction doesn't meet their needs, then and only then do they write lower-level code themselves.

## Agile Team Practices

The practices above are mostly *development* practices involving how individuals work with their code. But there is a broader scope of agile practices around how teams work together, and these practices are equally important. They aren't addressed in this guide, but an effective agile team will be intentional about their approach to:

- Eliciting needs and feedback from business users
- Coming up with and organizing stories
- Whether and how to estimate stories
- Velocity or other measures of the effectiveness of their process
- Who is part of the team and how their roles work
- Coordinating design, frontend, and backend work for the same user-facing functionality

For more information on agile methodology in general, check out [Agile Methodology Resources](/next-steps.html#agile-methodology).

## What's Next

In this guide we'll examine and try out most of these agile development practices, but we will have a particular emphasis on test-driven development. We'll start out in the next chapter by taking a look at some important testing concepts and defining the terms as we'll use them in this guide.

:::tip
Questions about this chapter? Come chat with us on the [Gitter Community for Outside-In Dev](https://gitter.im/outsideindev/community)!
:::
