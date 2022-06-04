---
title: "Next Steps"
sidebar_position: 7
---

# Next Steps

You've finished this book and gotten a taste of outside-in test-driven development on the frontend. I wrote this book because I hope the principles that have helped me will help other developers. If you've benefited from it and/or have feedback, I would love to hear from you—please [get in touch](/connect)!

If you choose to continue on in outside-in TDD, then this book will be only the beginning of your journey. Here are some suggestions for ways to take your learning further.

## A Community of Practice

Agile development really sank in for me once I started doing it alongside other people. Fellow agile developers provides accountability to stick with your principles and insights when it's not clear what to do.

Here are some suggestions for how to find others to do agile development with:

- An easy first step is to join the [#outside-in-dev channel](https://discord.gg/k8e8ZSuQr6) on my Discord server. You can chat about what we've learned together and how we're applying it.
- Find a local [meetup](https://www.meetup.com/) focused on agile development practices. "Software crafters" or "software craftsmanship" are common terms for such meetups.
- Attend a workshop on TDD or refactoring. One instructor I would recommend is [Sandi Metz](https://www.sandimetz.com/courses), who is so amazing that it is *absolutely* worth learning a little Ruby programming to take her course.
- Share this book with someone you think would benefit from it, and talk together about your experiences with it.
- Start a book club with your coworkers to read through this book and work through the exercise together.
- The next time you are looking for a new job, look for one that prioritizes agile development practices. Just hearing them say "we do agile" or "we do testing" isn't enough: ask them what their agile process is like, and see if they have a thorough understanding of small stories, TDD, refactoring, and evolutionary design.
- Share this book with someone you think would benefit from it, and talk together about your experiences with it.

## Testing Tool Documentation

In the same way that an experienced developer will learn their programming languages and frameworks deeply, it's important to learn testing tools deeply as well. This will show you what features you can utilize in your tests, give you ideas for how to test, and prevent buggy tests due to misunderstanding the functionality of the testing tool. All of the tools we used have excellent guides and I would recommend reviewing through them thoroughly:

- [Cypress web site](https://www.cypress.io)
- [Jest web site](https://jestjs.io)
- [React Testing Library web site](https://testing-library.com/react)
- [Vue Test Utils 1.x web site](https://v1.test-utils.vuejs.org)

## Books

If you get the opportunity to work on a team with someone who has helped push agile practice forward, take it. Unfortunately, we won't all get the opportunity to do so, but many of them have recorded insights in books to share them with a broader audience. Here are some recommendations.

*Some of the links below are affiliate links: if you purchase through them I make a little money without any cost to you. If you’d rather not use these links, feel free to search for these books at your preferred bookseller. I recommend InformIT and Pragmatic Programmers for DRM-free ebooks.*

### Outside-In TDD

<div className="media">
  <img src="/images/growing-object-oriented-software.jpg" title="Growing Object-Oriented Software, Guided by Tests book cover" className="media-image" />
  <p className="media-description">
    <a href="https://click.linksynergy.com/link?id=9YtTAZ2g23E&offerid=145238.681793&type=2&murl=https%3A%2F%2Fwww.informit.com%2Ftitle%2F9780321503626"><em>Growing Object-Oriented Software, Guided by Tests</em></a><img border={0} width={1} height={1} src="https://ad.linksynergy.com/fs-bin/show?id=9YtTAZ2g23E&bids=145238.681793&type=2&subid=0" /> by Steve Freeman and Nat Pryce is the book that introduced outside-in test-driven development. The authors are also the inventors of mock objects, and over the course of the book they illustrate how mocking is intended to be used to isolate parts of your code, as we've done in our exercise. This book will help you develop an even deeper understanding of the way outside-in TDD addresses change in software by guiding you to code that has a high degree of both external and internal quality.
  </p>
</div>

### Test Patterns

<div className="media">
  <a href="https://www.informit.com/store/xunit-test-patterns-refactoring-test-code-9780131495050" target="_blank"><img src="/images/xunit-test-patterns.jpg" title="xUnit Test Patterns book cover" className="media-image" /></a>
  <p className="media-description">
    As we went through the exercise there were many moments where we had to make a decision about how to organize our tests. Most of these decisions were informed by <a href="https://click.linksynergy.com/link?id=9YtTAZ2g23E&offerid=145238.1694771&type=2&murl=https%3A%2F%2Fwww.informit.com%2Ftitle%2F9780132800051"><em>xUnit Test Patterns: Refactoring Test Code</em></a><img border={0} width={1} height={1} src="https://ad.linksynergy.com/fs-bin/show?id=9YtTAZ2g23E&bids=145238.1694771&type=2&subid=0" /> by Gerard Meszaros. This book is a guide to creating high-quality tests in any programming language, and its principles apply as well to frontend JavaScript as anywhere else. This book also provides a <em>language</em> for talking about test patterns you may have seen, which can help make conversations about organizing tests more productive.
  </p>
</div>

To get a preview of a few of the book's test patterns and how they apply to JavaScript, check out a talk I gave based on it at Assert(js) 2019, ["Old Solutions to New Testing Problems"][old-solutions].


### Refactoring

Over the course of this book we did a little refactoring, but not much: by and large the functionality we wrote was pretty straightforward. Real applications are different: as they grow and change, the code gets complex and it's essential to refactor to avoid getting bogged down. Here are two resources for learning about refactoring.

<div className="media">
  <a href="https://www.informit.com/store/refactoring-improving-the-design-of-existing-code-9780134757711" target="_blank"><img src="/images/refactoring.jpg" title="Refactoring book cover" className="media-image" /></a>
  <p className="media-description">
    <a href="https://click.linksynergy.com/link?id=9YtTAZ2g23E&offerid=145238.2754839&type=2&murl=https%3A%2F%2Fwww.informit.com%2Ftitle%2F9780134757599"><em>Refactoring: Improving the Design of Existing Code</em></a><img border={0} width={1} height={1} src="https://ad.linksynergy.com/fs-bin/show?id=9YtTAZ2g23E&bids=145238.2754839&type=2&subid=0" /> by Martin Fowler is the original book that introduced refactoring as a disciplined process. It includes a comprehensive reference for different kinds of refactorings, helping you understand when you would want to apply them and how to do so. The second edition of the book has all of its examples written in JavaScript, so it's very easy for frontend developers to pick up.
  </p>
</div>

<div className="media">
  <a href="https://www.sandimetz.com/99bottles" target="_blank"><img src="/images/99-bottles-of-oop.jpg" title="99 Bottles of OOP JavaScript edition book cover" className="media-image" /></a>
  <p className="media-description">
    <a href="https://www.sandimetz.com/99bottles" target="_blank"><em>99 Bottles of OOP</em></a> is by Sandi Metz, Katrina Owen, and TJ Stankus. It walks through one extended refactoring process step-by-step, giving you the experience of what refactoring over time looks like. It's available in JavaScript and several other programming languages. Don't let the "object-oriented" in the name fool you: even if you write your code in a functional-programming style, you'll be able to apply this book's principles of identifying code smells, listening to the code, and making small changes.
  </p>
</div>

### Agile Methodology

This book has briefly introduced agile development practices, but there is much more to consider about the broader scope of doing agile as a team. There are many books on agile development; here are two I would recommend.

<div className="media">
  <a href="https://www.informit.com/store/extreme-programming-explained-embrace-change-9780321278654" target="_blank"><img src="/images/extreme-programming-explained.jpg" title="Extreme Programming Explained book cover" className="media-image" /></a>
  <p className="media-description">
    <a href="https://click.linksynergy.com/link?id=9YtTAZ2g23E&offerid=145238.173981&type=2&murl=https%3A%2F%2Fwww.informit.com%2Ftitle%2F9780321278654"><em>Extreme Programming Explained: Embrace Change</em></a><img border={0} width={1} height={1} src="https://ad.linksynergy.com/fs-bin/show?id=9YtTAZ2g23E&bids=145238.173981&type=2&subid=0" /> is by Kent Beck, the creator of Extreme Programming, one of the early agile methodologies. Beck is also the creator of test-driven development. Unlike some other agile methodologies, Extreme Programming is not agnostic about technical practices, but rather makes very specific recommendations. This is important because you can't deliver reliable software on a regular basis without applying technical practices that keep the software reliable and development speed consistent. <em>Extreme Programming Explained</em> also gets into the big-picture values behind Extreme Programming, such as the fact that humans have limited capacities and we should design software practices that acknowledge and support that, rather than deny it.
  </p>
</div>

<div className="media">
  <a href="https://pragprog.com/book/rjnsd/the-nature-of-software-development" target="_blank"><img src="/images/nature-of-software-development.jpg" title="The Nature of Software Development book cover" className="media-image" /></a>
  <p className="media-description">
    <a href="https://pragprog.com/titles/rjnsd/the-nature-of-software-development/" target="_blank"><em>The Nature of Software Development</em></a>, by Ron Jeffries, is a recent attempt to restate the values and priorities of agile development in a methodology-agnostic way. Rather than teaching a complex approach, it lays out principles common to agile methods and makes a case for them.
  </p>
</div>


## Epilogue
I decided to write this book because I found that I couldn't stop thinking about, talking about, and advocating for outside-in TDD and other agile development practices. And the reason I couldn't stop is that I've seen them solve a problem that I haven't seen solved any other way: the problem of development slowdown over time due to code that is hard to work with.

New languages and frameworks don't fix this problem, because you can make a mess in any language. More process doesn't fix the problem if the process doesn't account for change. Trying harder doesn't fix the problem, because we're human and have limited capacity.

The reason agile development practices work is because they're based on a realistic view of the world in which software development occurs. Alternate approaches to development envision a world where requirements can be fully understood and perfectly executed. That world is appealing to programmers and businesspeople alike, but its call is a siren song, and if you follow it you'll suffer for it. Instead, agile development recognizes that in the world we live in change is inevitable and people have limited capacities. It provides practices that work with the forces of this world, not merely to weather them, but to thrive because of them.

These practices are the best way I've found to deliver value to my employers and to have a smooth and calm development experience. It's no exaggeration to say that they've had a life-changing effect on me. And now you have a foundation in these practices and a taste of the results as well. I hope you'll try putting them to use in your development work. I think you'll like the results.

Thanks for reading, and keep in touch!


[old-solutions]: https://youtu.be/OwbgFbr83Jk
