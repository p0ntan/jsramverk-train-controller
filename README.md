# Repository *jsramverk-train-controller*
This is the repository for the course *jsramverk* (h23).
It is maintained by *elmo22* and *poak22*.

# Backend

## Start app

Register at [Trafikverket](https://api.trafikinfo.trafikverket.se/) to receive a personal API key, then create an .env file, following the template in .env.example, and store your API key in that file.

```
# When opening the repo for the first time
# Make sure node and npm are installed
# Then install the dependencies in the local node_modules folder
node -v
npm -v
npm install

# To run the app
node app.js
```

## Run a security audit

To check our app for vulnerabilities, run an *npm audit*. For help, check the [documentation](https://docs.npmjs.com/cli/v6/commands/npm-audit).

```
# Scan the project for vulnerabilities and just show the details, without fixing anything:
npm audit

# Scan the project for vulnerabilities and automatically install any compatible updates
npm audit fix
```

### Vulnerabilities found (Specifikation)

Here we can write about the security holes you found and how you fixed them.

# Frontend

## Start app

```
# To run the app on *http://localhost:9000/frontend/*
python3 -m http.server 9000
```

# Choice of framework

Here we can write about the framework we chose for this project.