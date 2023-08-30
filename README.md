# Repository *jsramverk-train-controller*
This is the repository for the course *jsramverk* (h23).
It is maintained by *elmo22* and *poak22*.

## Backend

### Steps to make backend work locally from original repo

Created account [Trafikverket](https://api.trafikinfo.trafikverket.se/) to receive a personal API key, then create an .env file, following the template in .env.example, and store your API key in that file.

```
# When opening the repo for the first time
# Make sure node and npm are installed
# Then install the dependencies in the local node_modules folder
node -v
npm -v
npm install
```

### Start app

```
# To run the app
node app.js
```

### Run a security audit

To check our app for vulnerabilities, run an *npm audit*. For help, check the [documentation](https://docs.npmjs.com/cli/v6/commands/npm-audit).

```
# Scan the project for vulnerabilities and just show the details, without fixing anything:
npm audit

# Scan the project for vulnerabilities and automatically install any compatible updates
npm audit fix
```

**Vulnerabilities found (Specifikation)**

Here we can write about the security holes you found and how you fixed them.

## Frontend

### Start app

```
# To run the app on *http://localhost:9000/frontend/*
python3 -m http.server 9000
```

## Choice of framework

For this project we opted to use the [Vue](https://vuejs.org/) framework for the frontend development of our app. This decision primarily stems from Vue's reputation for its user-friendly and intuitive nature, setting it apart from the potentially steeper learning curves associated with React and Angular. Vue seems furthermore the better choice for a simple application like ours. [^1]
Another advantage of Vue is that it has excellent documentation and learning resources. Compared to Svelte, another JavaScript framework we considered because of it beginner friendly features, Vue has a wider and more robust community, which might be advantageous when we run into difficulties. [^2]

[^1]: *Vue vs React vs... Svelte?!*: https://medium.com/@faulknerproject/vue-vs-react-vs-svelte-5f93d70d2618, last visited 2023-08-30.

[^2]: *React vs Vue vs Angular vs Svelte*: https://dev.to/hb/react-vs-vue-vs-angular-vs-svelte-1fdm, last visited 2023-08-30.