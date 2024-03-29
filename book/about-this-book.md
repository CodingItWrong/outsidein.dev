---
title: "About This Book"
sidebar_position: 1
---

# About This Book

## Testing on the Frontend
The World Wide Web started out as a platform for displaying only static documents, but now it hosts fully-featured interactive applications. The JavaScript language and browser APIs allow building user interfaces that are as rich as conventional desktop and mobile applications in many respects. Frontend JavaScript frameworks like React and Vue.js abstract away many of the low-level details of managing rich user interfaces, allowing developers to focus on delivering business functionality.

Back when JavaScript was only used to provide a little enhancement on top of server-rendered web pages, testing JavaScript code was both difficult and, in many cases, unnecessary. But with many web applications now implementing their entire user interface in JavaScript, testing that JavaScript code has become essential. Responding to this need, in the past few years the open-source community has heavily invested in JavaScript testing tools—test runners, framework-specific testing libraries, and browser automation tools.

But good testing tools aren't the only thing needed for developers to achieve a positive testing experience. Many developers loathe writing tests, and JavaScript developers are no exception. Maybe the tests take much longer to write than the corresponding production code. Maybe one change to production code breaks many tests, necessitating lots of effort to fix them. Maybe the tests fail sporadically for no obvious reason. Maybe the tests don't actually seem to be confirming anything that matters. Whatever the reason, many JavaScript developers feel like testing isn't delivering on its promise to make their apps better.

There's a good reason that testing is so challenging. After many years of practicing, studying, and having conversations about software testing, I've become convinced that testing is an irreducibly complex topic. There might be only one obvious way to implement a given feature, but there are usually several ways to test it, each with pros and cons that make it difficult to know which to choose. Judgment is necessary. And you can't learn judgment from a quick read of a testing tool's documentation: judgment only comes after time and experience.

But there is one hack we can use to develop our judgment more quickly. We can listen to *others'* experiences and learn from them—not only the experience of frontend JavaScript developers, but also developers on other platforms who have struggled with the same testing challenges. This book examines testing principles that emerged in other programming environments and applies them to frontend development. These principles center around the practice of test-driven development—specifically, a variety known as *outside-in* test-driven development. This practice helps you write tests that thoroughly cover your app but are loosely-coupled so they don't hinder you from making changes.

## Who Is This Book For

You're likely to benefit from reading this book if you would describe yourself as:

- **A frontend developer new to testing.** If you haven't written unit or end-to-end tests before, this book will teach you how to write both. You'll get experience with excellent testing tools and with techniques that will help you maximize the value of these tests and minimize their cost.
- **A frontend developer new to test-driven development.** If you write your frontend tests after you write your production code, this book will show you why you might consider writing your tests first. You'll learn how test-driven development makes it easier to fully cover the functionality of your app with tests, and you'll see how it prevents test fragility by keeping your tests focused on the interface rather than the implementation.
- **An experienced TDDer new to the frontend.** This was me when I moved into frontend development. I didn't want to leave behind the TDD practices that had helped me so much in server-side apps, but there weren't many resources on how to do TDD effectively in modern frontend frameworks. This book will help you apply the TDD techniques you love to React or Vue, and it will show how the different constraints of the frontend environment might lead to small adjustments to your TDD approach.
- **A frontend TDDer who only writes component tests, or writes them before end-to-end tests.** This is sometimes referred to as "classic TDD" or "middle-out TDD" because you start with the inside of your app—in the case of frontend apps, your components. You'll see how end-to-end tests complement your unit tests by adding a different kind of coverage, and how they can help your code become even more focused by steering you away from TDDing unneeded functionality. You'll also see how Cypress overcomes some of the pain points you may have experienced with end-to-end testing tools in the past.

## Chapters

This book consists of three parts.

The first part, **Concepts**, lays out big-picture ideas related to outside-in TDD:

- *About This Book* is this chapter.
- *Why Agile?* describes some problems that commonly occur in software development, and it shows how addressing those problems is the goal of agile development practices. These practices include small stories, evolutionary design, test-driven development, refactoring, and others.
- *Testing Concepts* introduces some important terms related to software testing and clarifies how they will be used in this book.
- *Why TDD?* goes into detail about the agile development practice that this book focuses on: test-driven development. It will explain the surprising benefits of writing tests before you write production code, including regression safety, test robustness, and speed of development.
- *Outside-In TDD* describes the variant of TDD this book will follow, known as outside-in TDD. It explains how, in this approach, end-to-end tests and unit tests work together to confirm both the external and internal quality of your software.

The second part, **Exercise**, walks you through putting outside-in TDD into practice by building the first few features of a real application. There are two versions of this part: one using React and the other using Vue.js.

:::tip

An updated version of the React exercise is [available as an ebook!](https://leanpub.com/outside-in-react-development) It's updated for Cypress 10 and includes more screenshots and two advanced chapters.

:::

This part consists of the following chapters:

- *Exercise Intro* describes the exercise in general and presents the option of choosing either the React or Vue version.
- *About This Exercise* introduces the tech stack you'll be using for your chosen version of the exercise.
- *Project Setup* sets up both the codebase and process we'll use throughout the exercise. We'll list out the stories we'll work on, create the project, and configure it. Before we even write the first feature we'll get tests running on a CI service and get the code automatically deploying to a hosting service.
- *Vertical Slice* puts outside-in TDD into practice with our first feature: reading data from an API server. We'll stay focused on a minimal feature slice that touches all layers of the app so that each will begin to be built out.
- *Refactoring Styles* shows how thorough test coverage allows us to implement functionality and styling in two separate steps. We'll take our plain-looking app and apply a nice look-and-feel to it, relying on the tests to confirm we haven't broken anything.
- *Edge Cases* adds polish to our first feature: visual feedback for loading and error states. Testing these edge cases at the unit level will keep our end-to-end tests simple and fast, and TDD will ensure that all the edge cases are covered by tests.
- *Writing Data* brings everything we've learned together as we build out a second feature: writing data to the API server. We see how to test HTML forms and verify data posted to the server. First we'll build out the core functionality in an outside-in TDD loop with end-to-end and unit tests, then we'll test-drive edge cases with additional unit tests.
- *Exercise Wrap-Up* reflects back on how the outside-in TDD process went over the course of the exercise and summarizes the benefits we gained by following that process.

The brief third part, **Next Steps**, consists of only a single chapter. It wraps up the book by pointing to additional resources you can use to learn more about test patterns, testing tools, TDD, refactoring, and other agile practices.

## Prerequisites

You'll find this book easiest to follow if you already have the following:

### Familiarity with React and Redux, or Vue and Vuex

The second part of this book is an exercise building a frontend application in one of two stacks: React and Redux, or Vue and Vuex. It's helpful if you already have some familiarity with the stack you choose. We won't be using any features that are too advanced, and we'll explain what's happening as we go. But we won't explain *everything* about how these libraries work or why. Because of this, if the stack you choose isn't already familiar to you, it's recommended that you go through an introductory tutorial about that stack first. The React and Vue web sites include excellent documentation and are a great place to start:

- React and Redux
  - [React web site](https://reactjs.org/)
  - [Redux web site](https://redux.js.org/)
- Vue and Vuex
  - [Vue.js 2 web site](https://v2.vuejs.org/v2/guide/)
  - [Vuex web site](https://vuex.vuejs.org/)

### Familiarity with Jest or Mocha

Jest and Mocha are two popular JavaScript testing libraries that are fairly similar. Jest is the main unit testing library we'll use in this book. But if you only know Mocha, don't worry: we won't be using any features of Jest that are too advanced, so you should be able to follow along easily enough. But if you haven't used either Jest or Morcha before, it's recommended that you look through the introductory parts of the Jest docs to get familiar.

- [Jest web site](https://jestjs.io/)

Our end-to-end test framework, Cypress, uses Mocha under the hood instead of Jest. But in our Cypress tests we won't use many Mocha APIs; we'll mostly be using Cypress-specific ones. So don't worry about getting familiar with Mocha if you haven't used it before.

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

<img src="/images/josh.jpg" className="author" title="photo of the author, Josh Justice" />

I'm Josh Justice, and I've worked as a professional software developer since 2004. For the first 10 years I worked in server-rendered web applications (the only kind of web applications most of us had back then). I wasn't writing any automated tests; every change I made required manually retesting in the browser. As you might imagine, that resulted in a lot of builds sent back from QA, a lot of delayed releases, and a lot of bugs that made it to production anyway. I was fortunate enough not to have to work too many nights or weekends, but there was always the very real threat of an evening phone call about a production issue I needed to fix urgently. I tried different programming languages and frameworks to see if they would help make my apps more reliable, but none made much of a difference.

Eventually I was introduced to unit testing and browser automation testing, and I saw a glimmer of hope. Unfortunately, the language ecosystem and teams I was working on at the time didn't have much experience with automated testing; we tried to learn it but didn't have much success. That all changed when I started working in Ruby on Rails. In Ruby, the testing paths are well-trodden. I was able to learn from experienced testers and see the way they approached writing tests. They shipped code to production as soon as the pull request was merged, confident it would work because the tests passed—and then they made *me* do the same! I saw security patches applied in a matter of minutes instead of weeks; as soon as the tests were green we knew it was safe to release.

Testing wasn't the only thing I learned from the Ruby community. With the safety that test coverage gave us, we had the confidence to make tiny improvements to the code constantly. We renamed variables, methods, and classes to more clearly describe what they were intended to do. We split long, complex methods into smaller ones so that each was a short, easily-understood series of steps at a single level of abstraction. We rearranged code so that new features fit in cleanly instead of being hacked in with increasingly-complex conditionals. When improvements like these are consistently applied to a codebase, I found that I could jump into that codebase for the first time and understand it quickly. This not only made my development more productive; it also made it a lot more fun. I spent a lot less time worried and stressed, and a lot more time interested and excited—and *that* made me more productive, too.

A few years after my professional focus shifted to Ruby, it shifted again, this time to frontend development. Because of all the benefits I'd seen from testing, one of the first things I looked for was how to test frontend web applications. The answer at the time was effectively "we're working on it." The community was still working through fundamental questions about how to build frontend apps that were consistent, performant, and simple—and with those fundamentals in flux, testing approaches were necessarily in flux as well. I tracked with community conversations about testing practices as they evolved over the years, and I became increasingly convinced that the testing principles I'd learned on the backend applied just as much to frontend apps. Those practices weren't widely applied on the frontend, but it wasn't usually because of inherent differences between the platforms: usually, it was due to a lack of information flow from one programming ecosystem to another.

That lack of testing information flow into the frontend community is the problem I've tried to address over the years by creating a variety of frontend testing resources. This book is the culmination of that process so far. It encompasses the practices I'm most convinced lead to applications that are reliable, maintainable, and evolvable. These are the practices I reach for on the frontend, and that I would reach for on any platform, language, or framework. This book contains the advice I most commonly give in code reviews and pairing sessions. These practices were passed along to me having stood the test of time, and I believe they'll continue to do so for you.

## Thanks

It's no exaggeration to say that this book has no original content and is only an arrangement of the good ideas of others. I'd like to thank the following people for playing a role in the ideas or the process of writing it.

* Kent Beck for creating and writing about TDD, Extreme Programming, and other practices that help geeks feel safe in the world.
* Nat Pryce and Steve Freeman for evolving TDD by creating and writing about mock objects and outside-in TDD.
* Jeffrey Way for introducing me to TDD and object-oriented design.
* Toran Billups for helping me see the possibilities of outside-in TDD on the front end.
* The Big Nerd Ranch web team, past and present, for teaching and exemplifying agile development.
* Myron Marston and Erin Dees for making outside-in TDD so practical in Ruby.
* Kent C. Dodds, Edd Yerburgh, and the Cypress team for creating great frontend test tooling.
* Atlanta tech meetup organizers, connect.tech, and Chain React for opportunities to speak and teach about testing.
* Jack Franklin and Justin Searls for informing and challenging my thoughts on frontend testing.
* James Shore for consistently championing the relevance of TDD to JavaScript.
* Matthew Strickland and Jonathan Martin for encouraging and inspiring me to write and create other content.
* The creators of Docusaurus and VuePress for creating great platforms for publishing online content.
* Graham Lee, Brian Marick, Ron Jeffries, Noel Rappin, and Elisabeth Hendrickson for being generous enough to field my out-of-the-blue questions.
* My wife Jennifer and my three children, Emily, Katherine, and James, for supporting me in my passion for programming, and for making me look forward to finishing work for the day.

## What's Next

With that, we're ready to get started learning about the concepts behind outside-in frontend development. We begin by looking at the problems that agile development practices are intended to solve.
