---
title: 1 - Intro
---

# 1 - Intro

## About This Exercise
This is the beginning of a six-part exercise building a React application using Outside-In Test-Driven Development (TDD).

If you've been linked directly to this part of the guide, and you'd like to learn about the concepts behind Outside-In TDD, you can go to [About This Guide](./about-this-guide.html), start from there, and continue with this exercise when you get back to it. Or, you can jump right in to the code, then go back to learn about the concepts when you're done.

The app we'll begin building is for rating dishes at restaurants. We'll call it Opinion Ate. Note that we won't get anywhere near finishing the app as part of this guide: we'll only get it started.

## Tech Stack
Here's the stack of libraries we'll use for our React application:

* Build Tooling: [Create React App][create-react-app]

For a production application you might want a more flexible build tool, like Parcel or a custom Webpack config. This tutorial doesn't get into build configuration, though, so Create React App will work fine, and should be familiar to many readers.

* State Management: [Redux][redux]

Redux has been criticized for being fairly verbose and indirect. I wouldn't necessarily reach for it first on personal projects. But it's familiar to a lot of React developers, and provides structure and a way to visualize the data in your app. Also, it works well to demonstrate how to test your data layer.

* State Management Asynchrony: [Redux-Thunk][redux-thunk]

Redux-Thunk is the recommended way to add asynchrony to a Redux data layer.

* HTTP Client: [Axios][axios]

Axios provides a nice simple interface for making web service requests. The browser's built-in `fetch()` function is close, but still has some repetitive parts. Plus, our E2E Testing tool can't stub backend requests when `fetch()` is used.

* UI Components: [Material-UI][material-ui]

Agile development is all about minimizing unnecessary work. For tutorials like this, side projects, internally-facing systems, and MVPs, unless visual design is your passion, you may be better off using an off-the-shelf component library. Plus, with a thorough test suite like the one we'll write, you can always refactor to a new visual design with confidence that you haven't broken any functionality. For this tutorial we'll go with Material-UI, a popular React implementation of Google's Material Design.

* Test Runner: [Jest]

Jest has become an extremely popular test runner in many JavaScript circles, but especially React circles. It includes everything you need out of the box, including mocking functionality.

* Component Tests: [React Testing Library][react-testing-library]

RTL will help us write component tests. Unlike other component testing libraries, RTL executes `useEffect()` hooks, so we'll be able to test the full functionality of our components. It's also designed around testing the interface instead of the implementation, which will help us write tests that are resistant to change.

* E2E Tests: [Cypress][cypress]

Cypress is an end-to-end testing tool that was written with Test-Driven Development in mind. Because it runs in the same browser context as your frontend app it has insight into the event loop and network requests, reducing flake and allowing easy request stubbing. If you've had a bad experience with complex and flaky tests using other browser automation frameworks in the past, Cypress will convince you that E2E tests *can* be great.

* CI: [GitHub Actions][github-actions]

GitHub is extremely popular for source control, and now it has a CI service built in as well. There are other great CI options too, but the integration means that all we need to do is add an Actions config file and we're set to run our tests on every pull request.

* Deployment: [Netlify][netlify]

For deploying frontend applications there's no service simpler than Netlify. Choose your repo, enter a build command, and your app will be built and deployed. We won't use the following feature in this tutorial, but it's easy to add a custom domain to your app as well, with an automatically-provisioned SSL certificate.

[axios]: https://github.com/axios/axios
[create-react-app]: https://create-react-app.dev/
[cypress]: https://www.cypress.io/
[github-actions]: https://github.com/features/actions
[jest]: https://jestjs.io/
[material-ui]: https://material-ui.com/
[netlify]: https://www.netlify.com/
[react-testing-library]: https://testing-library.com/react
[redux]: https://redux.js.org/
[redux-thunk]: https://github.com/reduxjs/redux-thunk
