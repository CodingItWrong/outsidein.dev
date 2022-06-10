---
title: 1 - About This Exercise | React
pagination_prev: exercise
---
import Chat from '../_chat.mdx';

# Outside-In React Development

:::tip

An updated version of this React exercise is [available as an ebook!](https://leanpub.com/outside-in-react-development) It's updated for Cypress 10 and includes more screenshots and two advanced chapters.

:::

This is the beginning of a six-chapter exercise building a React application using outside-in test-driven development (TDD) and other agile development practices.

If you've been linked directly to this part of the book, and you'd like to learn about the concepts behind outside-in TDD and agile development, you can go to [About This Book](../about-this-book.md), start from there, and continue with this exercise when you get back to it. Or, you can jump right in to the exercise, then go back to learn more about the concepts when you're done.

The app we'll begin building is for rating dishes at restaurants. We'll call it Opinion Ate. We'll get to experience all parts of the outside-in TDD process, but note that we'll only get the app started and won't get anywhere near finishing it.

If you'd like to download the completed project, you can do so from the [Opinion Ate React repo](https://github.com/CodingItWrong/opinion-ate-react). But I would highly encourage you to work through the exercise yourself. Even more so than programming in general, test-driven development requires practice to get into the habit and to really experience the benefits.

## Tech Stack
Here's the stack of libraries we'll use for our React application:

### Build Tooling: Create React App

[Create React App][create-react-app] allows running our application locally and building it for production. Depending on your production needs you might or might not want a more flexible build tool, like a custom Webpack config or Parcel. This tutorial doesn't get into build configuration, though, so Create React App will work fine, and should be familiar to many readers.

### State Management: [Redux][redux]

[Redux][redux] has been criticized for being fairly verbose and indirect. I wouldn't necessarily reach for it first on personal projects. But it's familiar to a lot of React developers, and provides structure and a way to visualize the data in your app. Also, it works well to demonstrate separating data layer concerns from the UI.

### State Management Asynchrony: Redux Thunk

[Redux Thunk][redux-thunk] is the recommended way to add asynchrony to a Redux data layer for most projects. It works directly with JavaScript's built-in promises, so this makes it a natural fit for most JavaScript developers.

### HTTP Client: Axios

[Axios][axios] provides a nice simple interface for making web service requests. The browser's built-in `fetch()` function is close, but Axios removes some repetitive parts and improves on the API.

### UI Components: MUI

Agile development is all about minimizing unnecessary work. For side projects, internally-facing systems, and MVPs, unless visual design is your passion you may be better off using an off-the-shelf component library. Plus, with a thorough test suite like the one we'll write, you can always refactor to a new visual design with confidence that you haven't broken any functionality. For this tutorial we'll go with [MUI][mui], a popular React implementation of Google's Material Design.

### Test Runner: Jest

[Jest] has one of the most popular JavaScript test runners for a number of years, especially in the React ecosystem. It includes everything you need out of the box for testing plain JavaScript code, including the ability to create test doubles.

### Component Tests: React Testing Library

[React Testing Library][react-testing-library] (RTL) will help us write component tests. It's designed around testing the interface instead of the implementation, which aligns with the testing philosophy we'll take in this book: that way our tests are less likely to break as the application changes.

### End-to-End Tests: Cypress

[Cypress][cypress] is an end-to-end testing tool that was written with test-driven development in mind. Because it runs in the same browser context as your frontend app, it has insight into the event loop and network requests, reducing flake and allowing easy request stubbing. If you've had a bad experience with other browser automation tools in the past, Cypress will convince you that E2E tests *can* be great.

### Continuous Integration: GitHub Actions

GitHub is extremely popular for source control, and it has a CI service built in as well: [GitHub Actions][github-actions]. There are other great CI options too, but the GitHub integration means that all we need to do is add an Actions config file and we're set to run our tests on every pull request.

### Deployment: Netlify

For deploying frontend applications there's no service simpler than [Netlify]. Just choose your repo and Netlify will automatically configure your build process, build your app, and deploy it. We'll only use the most basic Netlify features in this tutorial, but it also has features you'll need to take your app to production, such as adding a custom domain with an automatically-provisioned SSL certificate.

## What's Next

Now that we've reviewed the tech stack we'll be using, it's time to get our app set up. In the next chapter we'll create our application and the environment it runs in, and we'll do some setup for our development process.

<Chat />

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
