---
title: "Next Steps"
---

# Next Steps

You've completed this guide and gotten a taste of outside-in test-driven development on the frontend. But this is just the beginning of your journey. Here are some more resources to take your learning further, depending on what you want to learn more about.

Note that none of the below are affiliate links; I don't make any money off of them. These are just resources that have helped me that I want to pass along. For published books, I link to Pragmatic Bookshelf and InformIT because they offer DRM-free ebooks. They are all available through other channels as well.


## Testing Tool Docs
Just like you learn your framework deeply, it's important to learn your testing tools deeply as well. This will show you what features you can draw from, give you ideas for how to test, and prevent buggy tests due to misunderstanding the test functionality. All of the tools we used have excellent guides, so I would recommend looking through them thoroughly:

- [Cypress - Guides][cypress]
- [Jest - Docs][jest]
- [React Testing Library - Docs][rtl]
- [Vue Test Utils - Guides][vue-test-utils]


## Outside-In TDD
[*Growing Object-Oriented Software, Guided by Tests*][goos] by Steve Freeman and Nat Pryce is the book that introduced outside-in test-driven development. It's written by the inventors of mock objects, and shows how mocking is intended to be used to isolate parts of your code, as we've done in our tutorial. This book has a more thorough description of the way outside-in TDD addresses change in software by producing code that has both high external and internal quality.

## Test Patterns
As we went through the tutorial, we made a lot of decisions about how to organize our tests. Most of these decisions were informed by [*xUnit Test Patterns*][xunit-test-patterns] by Gerard Meszaros. This is a programming-language-agnostic guide to how to create high-quality tests, and the principles apply directly to frontend JavaScript tests.

In addition to providing ideas for how to arrange your tests, the book also provides a *language* for talking about test patterns and their tradeoffs. This can be helpful when guiding others, or when making a case to a team for changing unhelpful patterns.

To get a preview of the book's test patterns and how they apply to JavaScript, check out a talk I gave at Assert(js) 2019, ["Old Solutions to New Testing Problems"][old-solutions].


## Refactoring
The functionality we wrote in this guide was pretty straightforward, so there wasn't much need for refactoring. But as real applications grow and change, the code gets complex, and it's essential to refactor it to avoid getting bogged down in cluttered code. Here are two options for learning about refactoring.

[*Refactoring*][refactoring] by Martin Fowler is the original book that presented refactoring as a disciplined process. It includes a comprehensive reference of different kinds of refactorings that will equip you with options to consider and clear steps to take. The second edition of the book was rewritten in JavaScript, so it's extremely accessible to frontend developers.

[*99 Bottles of OOP*][99-bottles], by Sandi Metz and Katrina Owen, walks through one extended refactoring step-by-step, giving you the experience of what refactoring over time looks like. Don't let the "object-oriented programming" in the name fool you: even if you write your code in a functional-programming style, this book's principles of identifying code smells, listening to the code, and making small changes all apply just as well.


## Agile Methodology
This book has contained a brief introduction to agile development practices, but it hasn't gotten into the broader scope of doing agile as a team. There are many books on agile development; here are two I would recommend.

[*Extreme Programming Explained*][xp-explained] is by Kent Beck, the creator of Extreme Programming, one of the early agile methodologies. Beck is also the creator of test-driven development. Unlike some other agile methodologies, Extreme Programming is not agnostic about technical practices. This is important because you can't deliver reliable software on a regular basis without technical processes to keep the software reliable and development speed consistent. *Extreme Programming Explained* also gets into the big-picture values behind Extreme Programming, such as the fact that humans have limited capacities and we should design software practices that acknowledge and support that, rather than deny it.

[*The Nature of Software Development*][nature-sw-dev], by Ron Jeffries, is a recent attempt to restate the values and priorities of agile development in a methodology-agnostic way. Rather than teaching a complex approach, it draws out common principles.


[99-bottles]: https://www.sandimetz.com/99bottles
[cypress]: https://docs.cypress.io/guides/overview/why-cypress.html
[jest]: https://jestjs.io/docs/en/getting-started
[goos]: https://www.informit.com/store/growing-object-oriented-software-guided-by-tests-9780321503626
[nature-sw-dev]: https://pragprog.com/book/rjnsd/the-nature-of-software-development
[old-solutions]: https://youtu.be/OwbgFbr83Jk
[refactoring]: https://www.informit.com/store/refactoring-improving-the-design-of-existing-code-9780134757711
[rtl]: https://testing-library.com/docs/react-testing-library/intro
[vue-test-utils]: https://vue-test-utils.vuejs.org/guides/
[xp-explained]: https://www.informit.com/store/extreme-programming-explained-embrace-change-9780321278654
[xunit-test-patterns]: https://www.informit.com/store/xunit-test-patterns-refactoring-test-code-9780131495050
