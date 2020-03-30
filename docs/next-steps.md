---
title: "Next Steps"
---

# Next Steps

You've completed this guide and gotten a taste of outside-in test-driven development on the frontend. But this is just the beginning of your journey. Here are some more suggestions to take your learning further.

Note that none of the links to products below are affiliate links; I don't make any money off of them. These are just resources that have helped me that I want to pass along. For published books, I link to Pragmatic Bookshelf and InformIT because they offer DRM-free ebooks. They are all available through other channels as well.

## A Community of Practice
Doing agile development with other people provides accountability to stick with it and insights when it's not clear what to do. Here are some suggestions for how to find others to do agile development with:

- An easy first step is the [Outside-In Frontend Dev chat on Gitter](https://gitter.im/outsideindev/community). You can join there to discuss what we've learned and how to apply it with the author (me, Josh!) and other readers.
- If you're on twitter, you can <a href="https://twitter.com/intent/tweet?button_hashtag=outsideintdd&ref_src=twsrc%5Etfw" data-show-count="false">tweet #outsideintdd</a> to share your experiences and questions, or <a href="https://twitter.com/search?lang=en&q=(%23outsideintdd)&src=typed_query">search for #outsideintdd</a> to see who else is thinking about this approach.
- Find a local [meetup](https://www.meetup.com/) focused on agile development practices. "Software craftsmanship" is a common term for such meetups.
- Attend a workshop on TDD or refactoring. Two instructors I would recommend are [James Shore](https://www.jamesshore.com/Calendar/) who focuses on JavaScript, and [Sandi Metz](https://www.sandimetz.com/courses) who is so amazing that it is *absolutely* worth learning a little Ruby programming to take her course.
- The next time you are looking for a new job, look for one that prioritizes agile development practices. Just hearing them say "we do agile" or "we do testing" is not enough: ask them what their agile process is like, and see if they have a thorough understanding of small stories, refactoring, and evolutionary design.
- Share this guide with someone you think would benefit from it, and talk with them about your experiences with it.

## Testing Tool Docs
Just like you learn your framework deeply, it's important to learn your testing tools deeply as well. This will show you what features you can draw from, give you ideas for how to test, and prevent buggy tests due to misunderstanding the test functionality. All of the tools we used have excellent guides, so I would recommend looking through them thoroughly:

- [Cypress - Guides][cypress]
- [Jest - Docs][jest]
- [React Testing Library - Docs][rtl]
- [Vue Test Utils - Guides][vue-test-utils]


## Outside-In TDD

<div class="media">
  <a href="https://www.informit.com/store/growing-object-oriented-software-guided-by-tests-9780321503626" target="_blank"><img src="/images/growing-object-oriented-software.jpg" title="Growing Object-Oriented Software, Guided by Tests book cover" class="media-image" /></a>
  <p class="media-description">
    <a href="https://www.informit.com/store/growing-object-oriented-software-guided-by-tests-9780321503626" target="_blank"><em>Growing Object-Oriented Software, Guided by Tests</em></a> by Steve Freeman and Nat Pryce is the book that introduced outside-in test-driven development. It's written by the inventors of mock objects, and shows how mocking is intended to be used to isolate parts of your code, as we've done in our tutorial. This book has a more thorough description of the way outside-in TDD addresses change in software by producing code that has both high external and internal quality.
  </p>
</div>

## Test Patterns

<div class="media">
  <a href="https://www.informit.com/store/xunit-test-patterns-refactoring-test-code-9780131495050" target="_blank"><img src="/images/xunit-test-patterns.jpg" title="xUnit Test Patterns book cover" class="media-image" /></a>
  <p class="media-description">
    As we went through the tutorial, we made a lot of decisions about how to organize our tests. Most of these decisions were informed by <a href="https://www.informit.com/store/xunit-test-patterns-refactoring-test-code-9780131495050" target="_blank"><em>xUnit Test Patterns</em></a> by Gerard Meszaros. This is a programming-language-agnostic guide to how to create high-quality tests, and the principles apply directly to frontend JavaScript tests. In addition to providing ideas for how to arrange your tests, the book also provides a <em>language</em> for talking about test patterns and their tradeoffs. This can be helpful when guiding others, or when making a case to a team for changing unhelpful patterns.
  </p>
</div>

To get a preview of the book's test patterns and how they apply to JavaScript, check out a talk I gave at Assert(js) 2019, ["Old Solutions to New Testing Problems"][old-solutions].


## Refactoring
The functionality we wrote in this guide was pretty straightforward, so there wasn't much need for refactoring. But as real applications grow and change, the code gets complex, and it's essential to refactor it to avoid getting bogged down in cluttered code. Here are two options for learning about refactoring.

<div class="media">
  <a href="https://www.informit.com/store/refactoring-improving-the-design-of-existing-code-9780134757711" target="_blank"><img src="/images/refactoring.jpg" title="Refactoring book cover" class="media-image" /></a>
  <p class="media-description">
    <a href="https://www.informit.com/store/refactoring-improving-the-design-of-existing-code-9780134757711" target="_blank"><em>Refactoring</em></a> by Martin Fowler is the original book that presented refactoring as a disciplined process. It includes a comprehensive reference of different kinds of refactorings that will equip you with options to consider and clear steps to take. The second edition of the book was rewritten in JavaScript, so it's extremely accessible to frontend developers.
  </p>
</div>

<div class="media">
  <a href="https://www.sandimetz.com/99bottles" target="_blank"><img src="/images/99-bottles-of-oop.jpg" title="99 Bottles of OOP book cover" class="media-image" /></a>
  <p class="media-description">
    <a href="https://www.sandimetz.com/99bottles" target="_blank"><em>99 Bottles of OOP</em></a>, by Sandi Metz and Katrina Owen, walks through one extended refactoring step-by-step, giving you the experience of what refactoring over time looks like. Don't let the "object-oriented programming" in the name fool you: even if you write your code in a functional-programming style, this book's principles of identifying code smells, listening to the code, and making small changes all apply just as well.
  </p>
</div>

## Agile Methodology
This book has contained a brief introduction to agile development practices, but it hasn't gotten into the broader scope of doing agile as a team. There are many books on agile development; here are two I would recommend.

<div class="media">
  <a href="https://www.informit.com/store/extreme-programming-explained-embrace-change-9780321278654" target="_blank"><img src="/images/extreme-programming-explained.jpg" title="Extreme Programming Explained book cover" class="media-image" /></a>
  <p class="media-description">
    <a href="https://www.informit.com/store/extreme-programming-explained-embrace-change-9780321278654" target="_blank"><em>Extreme Programming Explained</em></a> is by Kent Beck, the creator of Extreme Programming, one of the early agile methodologies. Beck is also the creator of test-driven development. Unlike some other agile methodologies, Extreme Programming is not agnostic about technical practices. This is important because you can't deliver reliable software on a regular basis without technical processes to keep the software reliable and development speed consistent. *Extreme Programming Explained* also gets into the big-picture values behind Extreme Programming, such as the fact that humans have limited capacities and we should design software practices that acknowledge and support that, rather than deny it.
  </p>
</div>

<div class="media">
  <a href="https://pragprog.com/book/rjnsd/the-nature-of-software-development" target="_blank"><img src="/images/nature-of-software-development.jpg" title="The Nature of Software Development book cover" class="media-image" /></a>
  <p class="media-description">
    <a href="https://pragprog.com/book/rjnsd/the-nature-of-software-development" target="_blank"><em>The Nature of Software Development</em></a>, by Ron Jeffries, is a recent attempt to restate the values and priorities of agile development in a methodology-agnostic way. Rather than teaching a complex approach, it draws out common principles.
  </p>
</div>


## Epilogue
We've reached the end of this guide. I wrote it because I couldn't stop thinking about, talking about, and advocating for outside-in test-driven development and the other agile development practices we've looked at. And the reason for that is because they solve a problem that I haven't seen solved any other way: the problem of development slowdown over time due to code that is hard to work with.

New languages and frameworks don't fix this problem, because you can make a mess in any language. More process doesn't fix the problem if the process doesn't account for change. Trying harder doesn't fix the problem, because we're human and have limited capacity.

The reason agile development practices work is that they are based on an accurate view of reality: one where change is inevitable and people have limited capacities. They're the best way I've found to deliver value to my employers and to have a smooth and calm development experience.

And now you have a foundation and a taste of those practices. I hope you'll try putting them into practice in your development work. I think you'll like the results.


[cypress]: https://docs.cypress.io/guides/overview/why-cypress.html
[jest]: https://jestjs.io/docs/en/getting-started
[old-solutions]: https://youtu.be/OwbgFbr83Jk
[rtl]: https://testing-library.com/docs/react-testing-library/intro
[vue-test-utils]: https://vue-test-utils.vuejs.org/guides/
