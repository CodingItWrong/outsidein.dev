---
title: "About This Book"
sidebar_position: 1
---

# About This Book

## Testing on the Frontend
The World Wide Web started out as a platform for displaying static documents, but now it hosts fully-featured interactive applications. The JavaScript language and browser APIs allow building user interfaces that are as rich as conventional desktop and mobile applications in many respects. Frontend JavaScript frameworks like React and Vue.js abstract away many of the low-level details of managing rich user interfaces, allowing developers to focus on delivering business functionality.

Back when JavaScript was only used to provide a little enhancement on top of server-rendered web pages, testing JavaScript code was both difficult and, in many cases, unnecessary. But with many web applications now implementing their entire user interface in JavaScript, testing that JavaScript code has become essential to ensure those applications work. Thankfully, the open-source community has responded to this need, and JavaScript testing tools—test runners, framework-specific testing libraries, and browser automation tools—have seen tremendous investment and innovation in the past few years.

But just having good testing tools isn't enough to give developers a good testing experience. Many developers loathe writing tests, and JavaScript developers are no exception. Maybe the tests take much longer to write than the corresponding production code. Maybe one change to production code breaks many tests, necessitating lots of effort to fix them. Maybe the tests fail sporadically for no obvious reason. Maybe the tests don't actually seem to be testing anything that matters. Whatever the reason, many JavaScript developers feel like their tests aren't delivering on the promise to improve the development experience.

There's a good reason that testing is so challenging. After many years of practicing, studying, and having conversations about software testing, I've become convinced that testing is an irreducibly complex topic. There might be only one obvious way to implement a given feature, but there are usually several ways to test it, each with pros and cons that make it difficult to know which to choose. Judgment is necessary. And usually you can't learn judgment from testing tool documentation: judgment only comes after time and experience.

But there is one hack we can use to expedite our growth in testing. We can listen to *others'* experiences and learn from them—not only the experience of frontend JavaScript developers, but developers on other platforms who have struggled with the same testing challenges. This book examines testing principles that emerged in other programming environments and applies them to frontend development. These principles center around the practice of test-driven development—specifically, a form known as *outside-in* test-driven development. This practice helps you write tests that thoroughly cover your app but are loosely-coupled so they don't hinder you from making changes.

## Who Is This Book For

You're likely to benefit from reading this book if you would describe yourself as:

- **A frontend developer new to testing.** If you haven't written unit or end-to-end tests in frontend apps before, this book will equip you with skills for writing each. You'll get experience with excellent testing tools and with techniques that will help you maximize the value of these tests and minimize their cost.
- **A frontend developer new to test-driven development.** If you write your frontend tests after you write your production code, this book will show you how and why you might consider writing your tests first. You'll learn how test-driven development makes it easier to fully cover all the functionality of your app with tests, and you'll see how it prevents test fragility by keeping your tests focused on the interface.
- **An experienced TDDer new to the frontend.** This was me when I moved into frontend development. I didn't want to leave behind the TDD practices that had helped me so much in server-side apps, but there weren't many resources on how to do TDD effectively in modern frontend frameworks. This book will help you apply the TDD techniques you love to React or Vue, and it will make suggestions about how the different constraints of the frontend environment might lead to small adjustments to your TDD approach.
- **A frontend TDDer who only writes component tests, or writes them before end-to-end tests.** This is sometimes referred to as "classic TDD" or "middle-out TDD" because you start with the inside of your app—in the case of frontend apps, your components. You'll see how end-to-end tests complement your unit tests by adding a different kind of coverage, and how they can help your code become even more focused by steering you away from TDDing unneeded functionality. You'll also see how Cypress overcomes some of the pain points you may have experienced with end-to-end testing tools in the past.

## Chapters

This book consists of three parts.

The first part, **Concepts**, lays out big-picture ideas related to outside-in TDD:

- *About This Book* is this chapter.
- *Why Agile?* describes problems that commonly occur in software development and how agile development practices address them. These practices include small stories, evolutionary design, test-driven development, refactoring, and others.
- *Testing Concepts* introduces some important terms related to software testing and clarifies how they will be used in this book.
- *Why TDD?* goes into detail about this book's focal agile development practice: test-driven development. Writing tests before you write the production code has some surprising benefits that this chapter will explain, including regression safety, test robustness, and speed of development.
- *Outside-In TDD* describes the specific type of TDD this book will take, known as outside-in TDD. It explains how, in this approach, end-to-end tests and unit tests work together to confirm both the external and internal quality of your app.

The second part, **Exercise**, walks you through putting outside-in TDD into practice by building the first few features of a real application. There are two versions of most of the chapters in this section: one version using React and the other using Vue. This part consists of the following chapters:

- *Exercise Intro* describes the exercise in general and presents the option of choosing either the React or Vue version.
- *About This Exercise* introduces the tech stack you'll be using for your chosen version of the exercise.
- *Project Setup* gets us established with both the codebase and process we'll use throughout the exercise. We'll list out the stories we'll work on, create the project, and configure it. Before we even write the first feature we'll get tests running on CI and get the app automatically deploying to a hosting service.
- *Vertical Slice* puts outside-in TDD into practice with our first feature: reading data from an API server. We'll stay focused on a minimal feature slice that touches all layers of the app so that each will begin to be built out.
- *Refactoring Styles* demonstrates how thorough test coverage allows us to separating out the implementation of functionality and styling. We'll take our plain-looking app and apply a nice look-and-feel to it, relying on the tests to confirm we haven't broken anything.
- *Edge Cases* adds some more polish to our first feature: handling loading and error states. Testing these edge cases at the unit level wil keep our end-to-end tests simple and fast, and TDD will help us ensure we cover all edge cases by test.
- *Writing Data* puts what we've learned all together by building out a second feature, this time writing data to the API server. We see how to test forms and verify data posted to the server. First we'll build out the core functionality in an outside-in TDD loop with end-to-end and unit tests, then we'll test-drive edge cases with additional unit tests.
- *Exercise Wrap-Up* reflects back on how the outside-in TDD process went over the course of the exercise and summarizes the benefits we gained by following that process.

The brief third part, **Next Steps**, consists of only a single chapter. It wraps up the book by pointing to additional resources you can use to learn more about test patterns, testing tools, TDD, refactoring, and other agile practices.

## Prerequisites

You'll find this book easiest to follow if you already have the following:

### Familiarity with React and Redux, or Vue and Vuex

The second part of this book will involve building a frontend application in one of two stacks: React and Redux, or Vue and Vuex. It's helpful if you already have some familiarity with the stack you choose. We won't be using any features that are too advanced, and we'll explain what's happening as we go. But we won't explain *everything* about how these libraries work or why. Because of this, if the stack you choose isn't one you already know, it's recommended that you go through an introductory tutorial about that stack first. The React and Vue web sites include excellent documentation and are a great place to start:

- React and Redux
  - [React web site](https://reactjs.org/)
  - [Redux web site](https://redux.js.org/)
- Vue and Vuex
  - [Vue.js 2 web site](https://v2.vuejs.org/v2/guide/)
  - [Vuex web site](https://vuex.vuejs.org/)

### Familiarity with Jest or Mocha

Jest and Mocha are two popular JavaScript testing libraries that are fairly similar. Jest is the main unit testing library we'll use in this book. But if you only know Mocha, don't worry: we won't be using any features of Jest that are too advanced, so you should be able to follow along easily enough. But if you haven't used either Jest or Morcha before, it's recommended that you look through the introductory parts of the Jest docs to get familiar.

- [Jest web site](https://jestjs.io/)

Interestingly, our end-to-end test framework, Cypress, uses Mocha under the hood instead of Jest. But in our Cypress tests we won't use many Mocha APIs; we'll mostly be using Cypress-specific ones. So don't worry about getting familiar with Mocha if you haven't used it before.

## Code Formatting

When we are displaying whole new blocks of code, they'll be syntax highlighted like this:

```jsx
export default function App() {
  return <div>Hello, world.</div>;
}
```

Because we'll be using test-driven development, we'll be spending less time writing large chunks of code and more time making tiny changes to existing code. When that happens, we'll use diff syntax, where lines that are added have a `+` to the left of them, and lines that are removed have a `-`. Those lines will also be colored to draw attention to them:

```diff
+import RestaurantScreen from './components/RestaurantScreen';
+
 export default function App() {
-  return <div>Hello, world.</div>;
+  return (
+    <div>
+      <RestaurantScreen />
+    </div>
+  );
 }
```

These `+`s and `-`s aren't part of the code for you to type in; they just highlight the changes.

## About the Author

<img src="/josh.jpg" className="author" title="photo of the author, Josh Justice" />

I'm Josh Justice, and I've worked as a professional software developer since 2004. For the first 10 years I worked in server-rendered web applications (the only kind of web applications most of us had back then). And I wasn't doing any automated testing. Every change I made required manually retesting everything in the browser. As you might imagine, that resulted in a lot of builds sent back from QA, a lot of delayed releases, and a lot of bugs that made it to production anyway. I was fortunate enough not to have to work too many nights or weekends, but there was always the very real threat of an evening phone call about a production issue I needed to fix urgently. I tried to make my apps more reliable by experimenting with different programming languages and frameworks, but none made much of a difference.

Eventually I saw a glimmer of hope in the form of unit testing and browser automation testing. Unfortunately, the language ecosystem and companies I was working in at the time didn't have much experience with testing, resulting in a lot of effort for not much progress. That all changed when I started working in Ruby on Rails. In Ruby, the testing paths are well-trodden. I was able to watch experienced testers and see the way they approached writing tests. They shipped code to production as soon as the pull request was merged, confident it would work because the tests passed—and then they made *me* do the same! I saw security patches applied in a matter of minutes instead of weeks because as soon as the tests were green we knew it was safe to release.

Testing wasn't the only thing I learned from the Ruby community. With the confidence that test coverage gave us, we were freed up to make tiny improvements to the code constantly. We improved the names of variables, methods, and classes so it was clear what they were for. We split up long complex methods into smaller ones so that each was a short, easily-understood series of steps at a single level of abstraction. We rearranged code so that new features fit in cleanly instead of being hacked in with increasingly-complex conditionals. When improvements like these were consistently applied to a codebase, I found I could jump into that codebase for the first time and understand it quickly. This not only made my development more productive; it also made it a lot more fun. I spent a lot less time worried and stressed, and a lot more time interested and excited. And *that* made me more productive, too.

A few years after switching to Ruby, my professional focus shifted once again, this time to frontend development. Because of all the benefits I'd seen from testing, one of the first things I looked for was how to test frontend web applications. The answer at the time was, effectively, "we're getting to that." The community was still working through fundamental questions about how to build frontend apps that were consistent, performant, and simple—and with those things in flux, testing approaches were necessarily in flux as well. I tracked with the evolution and conversation about testing practices over the years, and I became increasingly convinced that the testing principles I'd learned on the backend applied to frontend apps just as well. The reason those practices weren't widely applied wasn't usually because of inherent differences between the platforms: usually, it was due to a lack of information flow from one programming ecosystem to another. That's the problem I've attempted to help address by creating a variety of frontend testing resources over the years.

This book is the culmination of all that I've learned and discovered about frontend testing so far. It encompasses the practices I'm most convinced lead to applications that are reliable, maintainable, and evolvable. These are the practices I reach for on the frontend, and that I would also reach for no matter what platform, language, or framework I was using. This book is an organized presentation of the advice I most commonly pass along to coworkers in code reviews and pairing sessions. These practices were passed along to me having stood the test of time, and I believe they'll continue to do so for you.

## Thanks

It's no exaggeration to say that this book has no original content and is only an arrangement of the good ideas of others. I'd like to thank the following people for playing a role in the ideas or the process of writing it.

* Kent Beck for creating and writing about TDD, Extreme Programming, and other practices that help geeks feel safe in the world.
* Nat Pryce and Steve Freeman for creating and writing about mock objects and outside-in TDD.
* Jeffrey Way for introducing me to TDD and object-oriented design.
* Toran Billups for helping me see the possibilities of outside-in TDD on the front end.
* The Big Nerd Ranch web team, past and present, for teaching and exemplifying agile development.
* Myron Marston and Erin Dees for making outside-in TDD so practical in Ruby.
* Kent C. Dodds, Edd Yerburgh, and the Cypress team for creating great frontend test tooling.
* Atlanta tech meetup organizers, connect.tech, and Chain React for opportunities to speak and teach about testing.
* Jack Franklin and Justin Searls for informing and challenging my thoughts on frontend testing.
* James Shore for consistently championing the importance of TDD in JavaScript.
* Matthew Strickland and Jonathan Martin for encouraging and inspiring me to write and create other content.
* The creators of Docusaurus and VuePress for creating great platforms for publishing online content.
* Graham Lee, Brian Marick, Ron Jeffries, Noel Rappin, and Elisabeth Hendrickson for being generous enough to field my out-of-the-blue questions.
* My wife Jennifer and my three children, Emily, Katherine, and James, for supporting me in my passion for programming, and for making me look forward to finishing work for the day.

## What's Next

With that, we're ready to get started learning about the concepts behind outside-in frontend development. We begin by looking at the problem that agile development practices are intended to solve.
