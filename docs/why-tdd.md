---
title: "Why Test-Driven Development?"
---

# Why Test-Driven Development?

This guide will walk us through a number of agile development practices, but with a particular focus on test-driven development.

Test-driven development is the practice of writing a test for functionality before you write the functionality itself. It follows a three-step process, "Red-Green-Refactor":

1. Red: write a test for functionality that does not yet exist, and watch it fail
2. Green: write only enough production code to pass the test
3. Refactor: rearrange the test and production code to improve it without changing its functionality

Then the cycle repeats again for your next bit of functionality: you write the next test and watch it fail, etc.

These three steps can be visualized as a loop:

<img src="/images/loop-unit.png" alt="Diagram of the TDD Loop" class="centered" />

Why would you want to practice test-driven development? Let's talk about a few extremely common problems in programming that test-driven development addresses in a unique way.

If you'd rather watch a video, [James Shore's Assert(js) 2019 talk "Thinking in Tests"](https://www.youtube.com/watch?v=UOOuW5tqT8M&feature=share) hits a lot of similar points.

## Regression Safety
As you add new features to your application and change existing features, you need a way to make sure you don't change any functionality except what you intend. Manual retesting becomes impractical as the application grows larger and larger, so an automated test suite is needed. Most developers write tests after the corresponding production code is complete, but this "test-after development" approach has several downsides.

First, with test-after development, some of your code can be difficult to write a test for. This can happen if your production code has a complex interface or lots of dependencies on the rest of your application. Many developers respond to this situation by reaching for complex testing approaches that make the tests fragile, or giving up on the goal of testing this code. Instead, it's better to rearrange the code to make it more testable. Some would say "designing your code for the sake of the tests" is a problem, but code that is easier to test is easier to reuse and adapt to future changes. But even if a developer understands the benefit of testable code, it can be unmotivating to do that if the code is already working, and changing it without tests would require more manual testing.

Second, with test-after development it's difficult to fully specify the functionality of your app, so that if the tests are passing you can be sure the application is working. Test coverage metrics are one attempt to measure whether your application is fully covered by test. It's true that metrics are able to indicate whether your tests are executing each function, statement, and branch. But metrics can't tell you if you are making assertions about every important result—they don't tell you if you are making any assertions at all! They also don't generally check if you are testing every possible combination of booleans, which can lead to missed combinations. Testing *every* boolean combination is often too many possibilities, and many combinations aren't important for the application—but this is a judgment call you need to make by assessing the meaning of your code, that code coverage tooling can't help you with. Because of all this, code coverage tools aren't sufficient to ensure your application's functionality is fully specified, which can allow bugs to make it to production.

**Test-driven development results in a test suite that fully protects your application's functionality from regressions.** It results in 100% test coverage *by definition:* every line of code you have is the result of a failing test that drove you to write that line. Because of this, you can be sure that if you make an unintentional change it will be caught by the tests. Also, each of your tests adds value: it was required to get some bit of functionality added (or, much less frequently, to cover an important case that was already working correctly). There is no situation where you have code that can't be tested, because the test is what resulted in that code being written.

## Robust Tests
Although we see the value of unit tests in theory, in practice our tests can often have a cost that outweighs the value. It can seem like whenever we make the smallest production change, we need to change the tests as well—and the test changes take more time than the production changes. Tests are supposed to ensure our changes don't break anything, but if the test fails when we make a change, are we really getting that much assurance?

When a test needs to change any time its production code changes, this is a sign of an over-specified test. The test is specifying details of the implementation of the production code. Instead, what we want is a test of the *interface* or *contract* of the production code. Given a certain set of inputs, what are the outputs and effects visible to the rest of the application? We don't care about what's happening *inside* the module as long as what's happening *outside* of it stays consistent. Testing the contract is what allows you to make production changes without updating your test code: it allows you to make changes to the implementation that don't affect the contract.

**Test-driven development guides you toward testing the interface rather than the implementation,** because there *is* no implementation yet at the time you're writing the test. At that time, it's easy to visualize the inputs and outputs of the production code you want to write, and it's harder to visualize the implementation: internal state, helper function calls, etc. Because you can't visualize the implementation, you can't write a test that's coupled to it; instead, your test specifies only the interface of the code.

By guiding you to test the contract, test-driven development helps you build up a test suite that is less fragile, that doesn't need to change every time production code changes. This increases your tests' value for regression safety, and decreases the test maintenance work that can make testing so expensive.

## Speed of Development
As we discussed in [Why Agile?](/why-agile.html), as many applications grow over time, the speed of development gets slower and slower. There is more code, so when you need to make a change, more existing code is affected. There is an increasing (sometimes, exponentially-increasing) amount of effort needed to add functionality. You can even reach the point where it takes all the developers' effort just to keep the system working, and adding new functionality is impossible.

Why does this slowdown happen? Because when you wrote the code in the first place, your understanding of the needs of the application was different than it is now. The code was never designed to handle this new requirement. So to make this new feature fit, you put a workaround in place. Then another. And as these workarounds multiply, you end up with code that is very difficult to understand and change. The amount of effort to follow what even one massive function is doing can be overwhelming.

**One way test-driven development speeds up your development is by guiding you to the simplest implementation.** Programmers can jump to conclusions about the implementation needed for a module, but sometimes the needs of an application are simpler than that. With TDD, you will only change to the complex implementation when there are enough tests to force you to do so. If you don't need those tests, you don't need that implementation, and you avoid carrying the cost of a complex implementation.

**Test-driven development also guides you to write the simplest interface for a module.** Before you write the implementation, you think about how you want the rest of your application to use it. You're a lot less likely to end up with a function with eight positional arguments when the first thing you write is the function call passing those eight arguments. Interface thinking helps ensure your code presents a clean abstraction to the rest of the application. This reduces time spent trying to understand the calling code in the future, and makes changes easier.

Once you *do* need to add additional functionality, you can adjust the code as you go so that it's always the simplest representation of the requirements as they stand right now. If you have a regression test suite that gives you 100% confidence, you can make adjustments at any time. But if you have even a *little bit* of doubt in your test suite, you'll hesitate. It will be safer to just leave the workaround in place. After an accumulation of thousands of such decisions, you can end up with a codebase that is a mess of giant functions with deeply-nested conditional logic, that continues to get slower and more fragile to work with.

**With test-driven development, because you have a regression test suite you know you can trust, you can clean up the code any time with very little friction.** You can make the code just a bit clearer or simpler, and if the tests are green you have a high degree of confidence that you haven't broken anything. Over time these tiny improvements add up to a codebase that looks like it was designed from the start knowing what you know now. And this simple, clear code helps your development speed stay fast.

Another cause of development slowdown is dependencies. If each bit of your code talks to many many other bits of code, then one change is likely to have a ripple effect across many places in your codebase, resulting in much more development effort to make a change. Code that is easy to change is loosely-coupled, only having minimal dependencies on other bits of code. The problem is that it's difficult to see the dependencies in your code in production use. Your application is arranged just so, and all the bits are accessible where your code needs them—for now. But when things need to change, the number of very specific dependencies your code requires will become painfully clear.

Writing tests helps expose the dependencies in your application because your code is now being reused in a second context: the context of the test. You can see if the code is easy to instantiate or if it requires all the rest of your application to exist as well. This gives you visibility into dependency problems, but if you're writing this test after the production code, it doesn't help you *solve* those problems. You'll still need to refactor your code while it's not under test to break these dependencies.

**Test-driven development helps you avoid writing code with too many dependencies in the first place.** Because you're writing the test code to call your production code first, you can see if too many dependencies are required and change your strategy before you even write the production code. So you'll end up with code with minimal dependencies. This means that changes you make in one bit of code will be less likely to require changes in many other places in your app, allowing you to develop faster.

## When Not TDD?
When would you not want to use test-driven development? I think it would benefit far more projects than are using it today. But here are some cases when it might not make sense—and cautions about those cases.

- **Throwaway code:** there is no need for reliability or evolving your code because it will be tried and discarded. If you know for sure the code won't be used on an ongoing basis, this is fine. However, many programmers are familiar with a "proof-of-concept" system going to production, against all intentions. If there is a chance of this happening, you will already be started down the path of having code that isn't well-specified by tests.
- **Rapidly-changing organizations:** for example, in a startup that is pivoting frequently. In systems built for such a startup, you may still want some end-to-end tests that provide stability. But internal code will be more likely to be replaced than evolved, so thoroughly testing it to prepare for changes is wasted effort. It makes sense to avoid TDD in that case. But what about when the business settles down and needs to start evolving on a stable base? At this point the code will already be written and it will be difficult to add test coverage you can have confidence in.
- **Systems that won't change:** the system isn't something that is going to be evolving much over time, because the needs are well understood. It's a system with a known end state. Once that state is reached, further changes will be minimal. So if you think really hard about the right design and don't make any mistakes, you won't need to make changes. I've worked on systems like this. But I would share a caution: humans find a lot of comfort in certainty, so it's easy to *think* that things are certain and will never change. But many programmers' experience backs up the fact that there are often more changes than you anticipate. And again, in this case, you will have backed yourself into a corner where you don't have the test coverage ready to support that unexpected change.
- **Spikes:** You have a feature you want to implement but you don't know how you want it to work. You want to play around with different alternatives to see how they work before you commit to one. In this approach, you don't *know* what to specify in a test, and if you did specify something it would likely be thrown out 15 minutes later. This approach is called a spike, and it's looked upon favorably in TDD circles. The question is, once you settle on a final approach, do you keep your untested code as-is? Or do you try to retrofit tests around it? I would recommend a third option: for all the reasons above, treat the spike as a learning process, and start over to TDD the code with the approach you settled on. Now, if your application is *all* spikes like this it could be a significant amount of effort, but the alternative is code you don't have confident tests around.

## Human Limitations
One objection to test-driven development is that you can *theoretically* get all the same benefits just by knowing the above software design principles and being disciplined about them. Think about the dependencies of each piece of code carefully and don't give in to the temptation to hard-code. Be extremely careful in each test you write to make sure every edge case is covered. That should give you a test suite that's as good as one TDD would give you.

But is this approach practical? I would ask, have you ever worked with a developer who isn't that careful all the time? I think most of us would agree we've worked with many such developers. Do you want to write your code in such a way that *none* of those developers can work on your codebase? This is how we end up with an industry that demands senior developers for everything and has no way to train juniors.

Let me ask a more personal question: are *you* always that careful? *Always?* Even when management is demanding three number-one priorities before the end of the day? When you're sick? When a major stressful life event happens to you? In the middle of a pandemic?

Programming allows us to create incredibly powerful software with relative ease. As a result, programmers are tempted to think of ourselves as having unlimited abilities. But programmers are still human. We have limited energy, attention, and patience (especially patience). We can't perform at our peak capacity 100% of the time. The more we programmers embrace our limited capacities, the more we will lean on techniques that acknowledge and support those limitations. Test-driven development is one such technique.

## What's Next

We've just seen how test-driven development works and the benefits it provides. This guide will follow a particular kind of TDD approach called outside-in TDD. In the next chapter, we'll see how outside-in TDD adds to the TDD practice we've just seen to provide extra confidence and benefits.

:::tip
Questions about this chapter? Come chat with us on the [Gitter Community for Outside-In Dev](https://gitter.im/outsideindev/community)!
:::
