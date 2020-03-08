---
title: 0 - Intro
---

# 0 - Intro

Here's the stack of libraries we'll use for our Vue application:

* Build Tooling: [Vue CLI][vue-cli]

Vue CLI strikes a great balance between being easy to get up and running, and being easy to extend with plugins. It gives us everything we need for this tutorial and many production applications, so it's an obvious choice for Vue apps.

* State Management: [Vuex][vuex]

When you need central state management in a Vue app, Vuex is the official state management library. It combines the traceability of the Flux pattern with the familiarity of using mutable data.

* HTTP Client: [Axios][axios]

Axios provides a nice simple interface for making web service requests. The browser's built-in fetch() function is close, but still has some repetitive parts. Plus, our E2E Testing tool can't stub backend requests when fetch() is used.

* UI Components: [Vuetify][vuetify]

Agile development is all about minimizing unnecessary work. For tutorials like this, side projects, internally-facing systems, and MVPs, unless visual design is your passion, you may be better off using an off-the-shelf component library. Plus, with a thorough test suite like the one we'll write, you can always refactor to a new visual design with confidence that you haven't broken any functionality. For this tutorial we'll go with Vuetify, a popular Vue implementation of Google's Material Design.

* Test Runner: [Jest][jest]

Jest has become an extremely popular test runner in many JavaScript circles, including Vue. It includes everything you need out of the box, including mocking functionality.

* Component Tests: [Vue Test Utils][vue-test-utils]

Vue Test Utils is Vue's built-in library of component testing helper functions.

* E2E Tests: [Cypress][cypress]

Cypress is an end-to-end testing tool that was written with Test-Driven Development in mind. Because it runs in the same browser context as your frontend app it has insight into the event loop and network requests, reducing flake and allowing easy request stubbing.

* CI: [GitHub Actions][github-actions]

GitHub is extremely popular for source control, and now it has a CI service built in as well. There are other great CI options too, but the integration means that all we need to do is add an Actions config file and we're set to run our tests on every pull request.

* Deployment: [Netlify][netlify]

For deploying frontend applications there's no service simpler than Netlify. Choose your repo, enter a build command, and your app will be built and deployed. We won't use the following feature in this tutorial, but it's easy to add a custom domain to your app as well, with an automatically-provisioned SSL certificate.

[axios]: https://github.com/axios/axios
[cypress]: https://www.cypress.io/
[github-actions]: https://github.com/features/actions
[jest]: https://jestjs.io/
[netlify]: https://www.netlify.com/
[vue-cli]: https://cli.vuejs.org/
[vue-test-utils]: https://vue-test-utils.vuejs.org/
[vuetify]: https://vuetifyjs.com/
[vuex]: https://vuex.vuejs.org/
