---
title: "Why Agile?"
sidebar_position: 1
---
import Chat from '../_chat.mdx';

# Why Agile?

## The Problem

Software projects rarely go as smoothly as we would like. We make project plans, but how often does the reality end up matching them? Nobody says it better than Sandi Metz:

> Unfortunately, something will change. It always does. The customers didn’t know what they wanted, they didn’t say what they meant. You didn’t understand their needs, you’ve learned how to do something better. Even applications that are perfect in every way are not stable. The application was a huge success, now everyone wants more. Change is unavoidable. It is ubiquitous, omnipresent, and inevitable.
>
> — Sandi Metz, *Practical Object-Oriented Design*

When you first start building a new software system, things go smoothly and it's easy for you to add new functionality. You feel so productive! But as time goes on, that sense of productivity wanes. When you change a bit of code, something seemingly-unrelated breaks. To add just one new feature, you need to make dozens of changes throughout the codebase.

To make sure your app continues to work as you change it, you need some kind of testing. Maybe you don't have any automated tests, so you have to rely entirely on manual testing. But as your feature set grows, the effort required to manually test it grows at the same rate. With each release you either need to allow more time for manual testing, hire more testers, or retest less of your codebase and increase the risk of breakage. Or maybe you *do* have automated tests, but changing one feature causes lots of tests to break, so the majority of your development time goes toward maintaining tests. Worse, maybe those tests don't actually catch the kinds of bugs your app tends to have, so you have to do just as much manual testing *in addition to* maintaining the test suite!

Over the lifetime of a software system, more and more effort is needed to get a smaller and smaller result. What causes these diminishing returns? Ron Jeffries explains it succinctly in _The Nature of Software Development_:

> The time needed to build a feature comes from two main components: its inherent difficulty, and the accidental difficulty of putting it into whatever code already exists. Teams are good at estimating the inherent difficulty. What makes us erratic, what makes us slow down, is the accidental difficulty. We call this difficulty “bad code.”
>
> If we allow code quality to decline, some features go in easily, sailing right through. Others that seem similar get entangled in twisty little passages of bad code. Similar work starts taking radically different amounts of time.

How can you prevent the accumulation of "bad," messy code as the project changes? The first thing that comes to mind is often to *minimize* change by putting more effort into up-front design. If changing the system leads to messy code, then it should help if we make a plan for how to structure code and stick to the plan, right? The problem is that, despite our best efforts, up-front designs rarely fit the requirements perfectly—and if the requirements *change*, all bets are off. Any code that doesn't fit with the design will be messy, causing development slowdown.

A common response to *this* problem is to design for flexibility. For example, we don't know for sure what data store we'll use or what communication mechanisms the user will want, so we make those parts of our system configurable and pluggable. We think of everything in the system that could vary and we isolate each of those pieces so they can be replaced. But just because the system *could* change in a certain way, that doesn't mean it *will*. And every bit of flexibility and pluggability we build into the system has a cost: it's indirection that makes the code harder to understand and work with. When the system doesn't end up changing along the lines of a given configuration point, that configuration point adds a cost without providing any benefit. And if a change is needed that *wasn't* one of the ones we built a configuration point for, we'll have to hack in that change after all.

Whether from a lack of flexibility or unnecessary indirection, it seems inevitable that development slows down as systems grow. How can we escape this dilemma?

## How Does Agile Help?

Keeping the pace of development fast as systems grow is one of the main goals of agile software development. Rather than trying to resist or anticipate change, an agile team embraces change and adopts practices that help them effectively respond to that change. Here are some of the most central agile development practices:

- **Small Stories:** we break the work up into minimum units of user-visible functionality. For example, an agile team doesn't build out an application's entire data layer at once. Instead, we build one user-facing feature, including just enough of the data later, business logic, and user interface to get it working. When that work is finished, we start the next story and add another slice of data layer, business logic, and user interface.
- **Evolutionary Design:** as we're adding this functionality story-by-story, we don't try to predict everything our application will need and design an architecture that will satisfy all of it…because we know we'll be wrong. Instead, we strive to make the system's design the best fit for its functionality today, as of the story we're currently working on. When the next story starts, then we adjust the design of the system to match the *new* functionality. With a design that is constantly being custom-fit to the present reality, we should never have a system that is either underdesigned with hacked-in changes or overdesigned with unused flexibility.
- **Test-Driven Development:** as we build our stories, we write the test first, and we only write production code in response to a failing test. This ensures that every bit of our logic is covered by test, so that as we rearrange the design of our system we know that we haven't broken anything. This level of test coverage significantly reduces the need for manual testing, which means our application can grow without the manual testing time increasing indefinitely. TDD also helps us identify and fix design issues in our code that could cause future development slowdown.
- **Refactoring:** at several different moments during the agile process, we refactor, which refers to making small changes to improve the arrangement of the code without changing its functionality. Refactoring is the third step of the TDD cycle, where we remove duplication and make other simplifications. Another time we refactor is while we're preparing to add new functionality: we consider if we can rearrange the code so that the new functionality fits in more naturally.
- **Code Review:** we ensure that the person who wrote a bit of code isn't the only one who is familiar with it. This way, another set of eyes has the opportunity to find bugs and opportunities for improvement. Pull requests are a common way to do code review, and they can work well as long as reviewers are focusing on thoroughly understanding the code and not just giving a cursory glance.
- **Continuous Integration (CI):** when the term "continuous integration" was coined it referred to integrating team members' work together at least daily instead of using long-running branches. One key aspect of CI is having an integration machine that will automatically build and test the app to ensure that integrated code is always working. Today we have cloud services referred to as "continuous integration" services that handle that building and testing on both main branches and pull request branches. But just using one of those services doesn't mean you're practicing CI: you also need to merge in your branches frequenty.
- **Continuous Delivery (CD):** agile teams have the ability to release their system at any moment. To accomplish this, they ensure the main source control branch runs successfully and doesn't include incomplete work. In the rare cases when one of these problems happens, fixing it is the highest priority. CD also involves automating the steps to release the system. This doesn't mean that the team necessarily *does* release to production every time a new feature is completed, but only that they have the ability to do so.
- **Abstractions:** agile teams order their work to deliver the most important user-facing functionality first. One strategy they apply is to reach for shared solutions and libraries rather than writing all their functionality from scratch. Shared solutions include community standard build systems, UI libraries, full-stack backend frameworks, and hosting solutions like Netlify and Heroku. Every day you spend custom-building an implementation detail of your tech stack is a day you aren't delivering features to the user. When the team discovers that an abstraction is slowing down their delivery of business functionality, then and only then do they write lower-level code themselves.

## Agile Team Practices

Most of the practices above are *technical* practices involving how individuals work with their code. There are also agile practices that are less technical and more focused on how individuals within a team work together. Although such practices aren't addressed in this guide, they are equally important. An effective agile team will be intentional about their approach to:

- Deciding what roles should be included on the team and how they should collaborate
- Eliciting needs and feedback from business users
- Writing and organizing stories
- Deciding whether or not estimation would provide value, and deciding how to do that estimation
- Coordinating work for a bit of user-facing functionality across multiple disciplines such as design, frontend, backend, infrastructure
- Measuring their progress in terms of velocity or other metrics

To learn more about this broader scope of agile practices, check out [Agile Methodology Resources](../next-steps.md#agile-methodology).

## What's Next

In this guide we'll examine and try out most of the agile technical practices described above, with a particular emphasis on test-driven development. But before we can get to test-driven development, the next thing we need to do is lay a foundation of core testing concepts and define the testing terms we'll use in this book.

<Chat />
