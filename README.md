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

11 vulnerabilities found in first repor where 3 are moderate and 8 high.

- node-fetch <2.6.7, vulnerable to Exposure of Sensitive Information to an Unauthorized Actor.
  - Fixed by manually setting node-fetch to ^v2.7.0 in package.json.

## Frontend

### Start app

```
# To run the app on *http://localhost:9000/frontend/*
python3 -m http.server 9000
```

## Choice of framework

Here we can write about the framework we chose for this project.
