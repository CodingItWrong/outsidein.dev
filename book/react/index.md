---
title: 1 - About This Exercise
prev: /exercise-intro.html
---

# Outside-In React Development

This is the beginning of a six-part exercise building a React application using outside-in test-driven development (TDD) and other agile development practices.

If you've been linked directly to this part of the guide, and you'd like to learn about the concepts behind outside-in TDD and agile development, you can go to [About This Guide](/book/about-this-guide), start from there, and continue with this exercise when you get back to it. Or, you can jump right in to the exercise, then go back to learn more about the concepts when you're done.

The app we'll begin building is for rating dishes at restaurants. We'll call it Opinion Ate. Note that we won't get anywhere near finishing the app as part of this guide: we'll only get it started.

If you'd like to download the completed project, you can do so from the [Opinion Ate React repo](https://github.com/CodingItWrong/opinion-ate-react). But I would highly encourage you to write the code through the exercise yourself. Maybe even more so than programming in general, test-driven development requires practice to get into the habit of how to do it.

## Tech Stack
Here's the stack of libraries we'll use for our React application:

* **Build Tooling: [Create React App][create-react-app]**

Create React App allows running our application locally and building it for production. Depending on your production needs you might or might not want a more flexible build tool, like Parcel or a custom Webpack config. This tutorial doesn't get into build configuration, though, so Create React App will work fine, and should be familiar to many readers.

* **State Management: [Redux][redux]**

Redux has been criticized for being fairly verbose and indirect. I wouldn't necessarily reach for it first on personal projects. But it's familiar to a lot of React developers, and provides structure and a way to visualize the data in your app. Also, it works well to demonstrate how to test your data layer.

* **State Management Asynchrony: [Redux-Thunk][redux-thunk]**

Redux-Thunk is the recommended way to add asynchrony to a Redux data layer for most projects. It works directly with JavaScript's built-in Promises, so this makes it a natural fit for most JavaScript developers.

* **HTTP Client: [Axios][axios]**

Axios provides a nice simple interface for making web service requests. The browser's built-in `fetch()` function is close, but Axios removes some repetitive parts and improves on the API.

* **UI Components: [MUI][mui]**

Agile development is all about minimizing unnecessary work. For tutorials like this, side projects, internally-facing systems, and MVPs, unless visual design is your passion you may be better off using an off-the-shelf component library. Plus, with a thorough test suite like the one we'll write, you can always refactor to a new visual design with confidence that you haven't broken any functionality. For this tutorial we'll go with MUI, a popular React implementation of Google's Material Design.

* **Test Runner: [Jest]**

Jest has become an extremely popular test runner in many JavaScript circles, but especially React circles. It includes everything you need out of the box, including mocking functionality.

* **Component Tests: [React Testing Library][react-testing-library]**

React Testing Library (RTL) will help us write component tests. It's designed around testing the interface instead of the implementation, which will help us write tests that are not fragile to change.

* **End-to-End Tests: [Cypress][cypress]**

Cypress is an end-to-end testing tool that was written with test-driven development in mind. Because it runs in the same browser context as your frontend app, it has insight into the event loop and network requests, reducing flake and allowing easy request stubbing. If you've had a bad experience with complex and flaky tests using other browser automation tools in the past, Cypress will convince you that E2E tests *can* be great.

* **Continuous Integration: [GitHub Actions][github-actions]**

GitHub is extremely popular for source control, and it has a CI service built in as well. There are other great CI options too, but the GitHub integration means that all we need to do is add an Actions config file and we're set to run our tests on every pull request.

* **Deployment: [Netlify][netlify]**

For deploying frontend applications there's no service simpler than Netlify. Choose your repo, enter a build command, and your app will be built and deployed. We won't use the following feature in this tutorial, but it's easy to add a custom domain to your app as well, with an automatically-provisioned SSL certificate.

## What's Next

Now that we've reviewed the tech stack we'll be using, it's time to get our app set up. In the next chapter we'll create our application, the environment it runs in, and do some setup for our development process.

[axios]: https://axios-http.com/
[create-react-app]: https://create-react-app.dev/
[cypress]: https://www.cypress.io/
[github-actions]: https://github.com/features/actions
[jest]: https://jestjs.io/
[mui]: https://mui.com/
[netlify]: https://www.netlify.com/
[react-testing-library]: https://testing-library.com/react
[redux]: https://redux.js.org/
[redux-thunk]: https://github.com/reduxjs/redux-thunk

:::tip
Questions about this chapter? Come chat with us on the [Gitter Community for Outside-In Dev](https://gitter.im/outsideindev/community)!
:::
