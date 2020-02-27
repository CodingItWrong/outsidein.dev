---
title: 1 - Setup
---

# 1 - Setup

## Planning Our Work
Before we start our work, we want a way to track it. Let's use Trello.

* Set Up Development Environment
* Create App
* Set Up Tests On CI
* Set Up Automatic Deployment
* Fill In Readme
* Allow users to create a restaurant
* Apply basic styling to the app
* Save restaurants to the server
* Allow users to log in

## Setting Up Development Environment
Here are the tools we'll need to install:

- Git
- Node
- Yarn
- Vue CLI
- Recommended editor: VS Code with Vetur extension

### Node
Like most frontend build tools, Vue CLI runs on top of Node.js, so you’ll need node installed locally.

### Yarn
Yarn is an alternative `npm` client. Generally I find it to be faster, more predictable, and more reliable than using the default `npm` client. I use `yarn` for all my projects.

If you’d prefer to use `npm`, you can still follow this guide, you’ll just need to replace any `yarn` commands with the equivalent `npm` commands.

### Vue CLI
The Vue CLI is a robust tooling layer that allows you to create, run, and build Vue single-page applications. Rather than having to set up your own configuration of a bundler like Webpack, Vue CLI abstracts over it and gives you the settings most applications need.

Install it:

```sh
$ npm install -g @vue/cli
```

With this, we can mark off our first task in Trello:

- [x] Set Up Development Environment

## Creating the App
Create a new Vue app:

```sh
$ vue create opinion-ate
```

You’ll be asked for a preset; choose “Manually select features”.

You'll be prompted with a list of features to choose. Use the spacebar to select:

- Babel
* Vuex
* Linter / Formatter
* Unit Testing
* E2E Testing

Then you'll be given followup questions for some of these. Choose:

* `Pick a linter / formatter config`: choose `ESLint + Prettier`. Prettier automatically formats your code when you save the file. Code consistency is a big help for productivity and catching bugs.
* `Pick a unit testing solution:` choose `Jest`. Jest has a lot of features built in.
* `Pick a E2E testing solution:` choose `Cypress (Chrome only)`. Cypress is built from the ground up for rich frontend applications. The tradeoff, as Vue CLI mentions, is that Cypress 3.x runs only in Chrome. But Cypress 4 has added support for testing in Firefox and MS Edge as well! Vue CLI should be updated to use Cypress 4 soon.

Vue CLI will start the installation process, and when it completes, your application will be created and ready to use.

Open your `package.json` and note the commands we have available:

- `serve` to run the app locally
- `build` to create a release build of the app
- `test:unit` to run unit tests, including Vue component tests
- `test:e2e` to run end-to-end tests
- `lint` to run code linting

Let's try it out. Run `yarn serve`. You’ll see something like the following:

```
 DONE  Compiled successfully in 2578ms


  App running at:
  - Local:   http://localhost:8080/
  - Network: http://10.0.1.16:8080/

  Note that the development build is not optimized.
  To create a production build, run yarn build.
```

Open the `Local` URL in the browser and you should see a page welcoming you to your Vue.js app.

Next, let's tweak the autoformatting setup. Prettier doesn't have a lot of configuration options, but you can adjust a little.

And a `.prettierrc.js` file at the root of your project and add the following:

```js
module.exports = {
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'all',
};
```

Now, set up ESLint integration with your editor by installing the [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

To confirm it works, open `src/App.vue`. You should see yellow underlines at a few different places:

- Double quotes should be replaced with single quotes
- Inside object literals, every property on its own line should have a comma after it, even the last one

Save the file, and these changes should be made for you automatically.

We can update all our files to be formatted this way by running `yarn lint --fix`.

Next, let’s confirm our tests work. Open `tests/unit/example.spec.js`. Note that it’s testing the `HelloWorld` component. Now run `yarn test:unit`. You should see the following:

```
yarn run v1.21.1
$ vue-cli-service test:unit
 PASS  tests/unit/example.spec.js
  HelloWorld.vue
    ✓ renders props.msg when passed (20ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.037s
Ran all test suites.
✨  Done in 4.50s.
```

Now we’ll try our end-to-end tests. Open `tests/e2e/specs/test.js`. Note that we are loading the app and confirming we can see a welcome message. Now run `yarn test:e2e`. You’ll see the Cypress application launch. You’ll see a message that to help you get started Cypress created some example tests, but that’s actually not correct—when Vue CLI sets up Cypress, it sets up a single Vue-related example test instead. Scroll down and click the “OK, got it!” button to dismiss the alert.

You’ll see a list of Integration Tests with just one item: `test.js`. Click on it. A new instance of Chrome will open and you’ll see the Cypress test runner interface. On the left is “My First Test” and a series of steps, which should pass. On the right is our app.

There’s one more mode we can run our Cypress tests in: headless mode. Run `yarn test:e2e --headless`. You’ll see tests run in the console and say in the end that they passed. This runs our whole test suite without a GUI, and will be useful in a moment.

With this, we can mark off our next task in Trello:

- [x] Create App

## Continuous Integration
When Vue CLI creates our project, it initializes a git repo and adds our code to it. Let’s push it up to GitHub. Create a new GitHub repo and add it as the `origin` remote. Push up the repo:

```sh
$ git remote add https://github.com/your-user-name/your-repo-name.git
$ git push --set-upstream origin master
```

In many development approaches, the next thing we would do would be to start building application functionality. We might go ahead and release. Later we might decide to try to add testing and continuous integration.

We’re going to go the opposite route in this guide. We’re going to set up CI and deployment from the very start.

There are a number of great CI services, including:

* [Travis CI](https://travis-ci.com/)
* [CircleCI](https://circleci.com/)(
* [GitHub Actions](https://github.com/features/actions)

We're going to go with GitHub Actions due to the fact that it's already set up in your GitHub repo.

Let’s set this up in a pull request to the mirror the usual approach you’ll take. Create a new `ci` branch:

```sh
$ git checkout -b ci
```

In your project, create a `.github/workflows` folder, create a `test.yml` file, and add the following contents:

```yml
name: Test
on: [push]

jobs:
  unit-test:
    name: Test
    runs-on: ubuntu-16.04
    steps:
      - uses: actions/checkout@v1
      - name: Install Dependencies
        run: yarn install
      - name: Unit Tests
        run: yarn test:unit
      - name: E2E tests
        run: yarn test:e2e --headless
```

Commit the file then push up your changes to GitHub:

```sh
$ git add .
$ git commit -m "Set up test action"
$ git push -u origin ci
```

GitHub will give you a URL to create a pull request. Open it in the browser, and click “Create pull request”.

Notice the yellow “Some checks haven't completed yet” warning, with “Test/Test” under it. That’s our GitHub Action running. Click the “Details” link next to it. You’ll see your unit and E2E tests running. When they pass, the action will be marked as passed. If you go back to the Conversation tab of your PR, you’ll see a green “All checks have passed”. Go ahead and click “Merge pull request”, then “Confirm merge”.

In your local project, switch back to `master` and pull down the latest changes that we merged in from the branch:

```sh
$ git checkout master
$ git pull
```

With this, we can mark off our next task in Trello:

- [x] Set Up Tests On CI

## Deployment
Next we're going to go ahead and deploy our application to production. Yes, even though it doesn't do anything yet!

First let's see how a production build works locally. Run `yarn build`. The files are written to a `dist` folder in your project. Open it and see the HTML file and JS files. Due to the way the file paths work, you can’t just open the HTML file in the browser, but they’ll work when deployed to a server.

There are many ways to deploy frontend apps. One easy one is services like Netlify that are set up to run your frontend build process for you. Netlify has a free Starter plan for individual users.

Create a Netlify account from [Netlify’s Sign Up page](https://app.netlify.com/signup). Since we will need to give it access to GitHub anyway, it might make sense to sign up with your GitHub account.

Once you’re signed in, click "New site from Git”. Click the “GitHub” button. A list of all your repos will appear. Search for your repo and click it. Leave “Branch to deploy” as `master`. Under “Basic build settings”, for the “Build command”, enter `yarn build` just like we ran locally. Then enter `dist` for the Publish directory. This means that Netlify will run that command, then take the files in that directory and deploy them. That’s all we need to configure, so click “Deploy site”.

You will be sent to the Overview page for your new site. In yellow you’ll see “Site deploy in progress”. Click that text and you’ll be taken to the Deploys page. In a list at the bottom you’ll see “Production: master@HEAD Building”—click that. You’ll see a console log of output as the site is being built. Eventually you’ll see:

```
6:53:02 AM: Site is live
6:53:52 AM: Finished processing build request in 2m5.053946316s
```

(Your timestamps will be different depending on how unreasonably early you wake up.)

Click “< Deploys" to go back to the Deploys tab. At the top in green you’ll see the name of your site, with an automatically-assigned set of nonsense words and characters. For example, mine is https://xenodochial-aryabhata-5985da.netlify.com — click this link. You should get the Welcome to Your Vue.js App page.

Now let’s rename that site to be a bit easier to remember. Go back to Netlify, then click the Overview tab, then “Site settings” button. Under General > Site details > Site information, click “Change site name”. Enter anything you like and click Save. At the top of this screen, under “Settings for”, your site URL appears in gray. Click on it to confirm your new domain works.

We're now set to run our app's tests on CI and deploy to production. What would have taken even the most experienced developer days to set up in the past was trivial thanks to the smart defaults provided by Vue CLI, GitHub Actions, and Netlify.

With this, we can mark off our next task in Trello:

- [x] Set Up Automatic Deployment

## Filling In the Readme
Writing down helpful information to help future developers (including yourself) work on the app is important. Open `README.md` and see what Vue CLI created for us by default. It’s a nice minimal readme that lists the NPM scripts available, without a lot of filler text. If these commands weren’t in here, I would recommend that we add them: how to install, run, build, and test.

Let’s add a description of the project and link to production, filling in your Netlify domain:

```diff
 # opinion-ate
+
+An app for tracking reviews of dishes at different restaurants.
+
+Production: https://your-netlify-domain.netlify.com/

 ## Project setup
```

Also, if someone uses `npm` instead of `yarn` they won’t get the right dependencies. Let’s make a note about this:

```diff
 ## Project setup
+Dependencies are locked with a `yarn.lock` file, so please use `yarn` and not `npm` for installing them.
+
```

With this, we can mark off our next task in Trello:

- [x] Fill In Readme

Now all our setup is done and we are ready to work on our first feature!
