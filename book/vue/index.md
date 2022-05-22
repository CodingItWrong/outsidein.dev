---
title: 1 - About This Exercise | Vue
pagination_prev: exercise
---
import Chat from '../_chat.mdx';

# Outside-In Vue Development

This is the beginning of a six-part exercise building a Vue.js application using outside-in test-driven development (TDD) and other agile development practices.

If you've been linked directly to this part of the guide, and you'd like to learn about the concepts behind outside-in TDD and agile development, you can go to [About This Book](../about-this-book.md), start from there, and continue with this exercise when you get back to it. Or, you can jump right in to the exercise, then go back to learn more about the concepts when you're done.

The app we'll begin building is for rating dishes at restaurants. We'll call it Opinion Ate. Note that we won't get anywhere near finishing the app as part of this guide: we'll only get it started.

If you'd like to download the completed project, you can do so from the [Opinion Ate Vue repo](https://github.com/CodingItWrong/opinion-ate-vue). But I would highly encourage you to write the code through the exercise yourself. Maybe even more so than programming in general, test-driven development requires practice to get into the habit of how to do it.

## Tech Stack
Here's the stack of libraries we'll use for our Vue application:

* **Build Tooling: [Vue CLI][vue-cli]**

Vue CLI allows running our application locally and building it for production. It strikes a great balance between being easy to get up and running, and being extensible via plugins. It gives us everything we need for this tutorial and many production applications, so it's an obvious choice for Vue apps.

* **State Management: [Vuex][vuex]**

When you need central state management in a Vue app, Vuex is the official state management library. It combines the traceability of the Flux pattern with the familiarity of using mutable data.

* **HTTP Client: [Axios][axios]**

Axios provides a nice simple interface for making web service requests. The browser's built-in `fetch()` function is close, but still has some repetitive parts. Plus, our E2E testing tool can't stub backend requests when `fetch()` is used.

* **UI Components: [Vuetify][vuetify]**

Agile development is all about minimizing unnecessary work. For tutorials like this, side projects, internally-facing systems, and MVPs, unless visual design is your passion you may be better off using an off-the-shelf component library. Plus, with a thorough test suite like the one we'll write, you can always refactor to a new visual design with confidence that you haven't broken any functionality. For this tutorial we'll go with Vuetify, a popular Vue implementation of Google's Material Design.

* **Test Runner: [Jest]**

Jest has become an extremely popular test runner in many JavaScript circles, including Vue. It includes everything you need out of the box, including mocking functionality.

* **Component Tests: [Vue Test Utils][vue-test-utils]**

Vue Test Utils is Vue's built-in library of component testing helper functions.

* **End-to-End Tests: [Cypress][cypress]**

Cypress is an end-to-end testing tool that was written with test-driven development in mind. Because it runs in the same browser context as your frontend app, it has insight into the event loop and network requests, reducing flake and allowing easy request stubbing. If you've had a bad experience with complex and flaky tests using other browser automation tools in the past, Cypress will convince you that E2E tests *can* be great.

* **Continuous Integration: [GitHub Actions][github-actions]**

GitHub is extremely popular for source control, and now it has a CI service built in as well. There are other great CI options too, but the GitHub integration means that all we need to do is add an Actions config file and we're set to run our tests on every pull request.

* **Deployment: [Netlify][netlify]**

For deploying frontend applications there's no service simpler than Netlify. Choose your repo, enter a build command, and your app will be built and deployed. We won't use the following feature in this tutorial, but it's easy to add a custom domain to your app as well, with an automatically-provisioned SSL certificate.

## What's Next

Now that we've reviewed the tech stack we'll be using, it's time to get our app set up. In the next chapter we'll create our application, the environment it runs in, and do some setup for our development process.

<Chat />

[axios]: https://github.com/axios/axios
[cypress]: https://www.cypress.io/
[github-actions]: https://github.com/features/actions
[jest]: https://jestjs.io/
[netlify]: https://www.netlify.com/
[vue-cli]: https://cli.vuejs.org/
[vue-test-utils]: https://vue-test-utils.vuejs.org/
[vuetify]: https://vuetifyjs.com/
[vuex]: https://vuex.vuejs.org/
