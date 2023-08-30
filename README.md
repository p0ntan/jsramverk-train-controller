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

11 vulnerabilities found in original repo where 3 are moderate and 8 high.

- debug <=2.6.8 (**high**), inefficient Regular Expression Complexity vulnerability and Regular Expression Denial of Service.
  - Vulnerable to regular expression denial of service when untrusted user input is passed into the 'o' formatter.
  - A vulnerability classified as problematic has been found in debug-js debug up to 3.0.x. This affects the function useColors of the file src/node.js. The manipulation of the argument str leads to inefficient regular expression complexity.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v2.2.0 to v2.6.9.

- express  2.5.8 - 4.15.4 || 5.0.0-alpha.1 - 5.0.0-alpha.5 (**high**), depends on vulnerable versions of debug, finalhandler, fresh, qs, send and serve-static.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v4.14.0 to v4.18.2.

- finalhandler <=1.0.5 (**high**), depends on vulnerable versions of debug.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v0.5.0 to v1.2.0.

- fresh <0.5.2 (**high**), Regular Expression Denial of Service.
  - Vulnerable to regular expression denial of service when parsing specially crafted user input.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v0.3.0 to v0.5.2.

- mime <1.4.1 (**moderate**), Regular Expression Denial of Service when mime lookup performed on untrusted user input.
  - Vulnerable to regular expression denial of service when a mime lookup is performed on untrusted user input.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v1.3.4 to v1.6.0.

- ms <2.0.0 (**moderate**), Inefficient Regular Expression Complexity vulnerability.
  - This issue affects the function parse of the file index.js. The manipulation of the argument str leads to inefficient regular expression complexity. The attack may be initiated remotely.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v0.7.1 to v2.0.0 and removed 'node_modules/serve-static/node_modules/ms' v0.7.2.

- node-fetch <2.6.7 (**high**), vulnerable to Exposure of Sensitive Information to an Unauthorized Actor.
  - **Fixed** by manually setting node-fetch to ^v2.7.0 in package.json.

- qs <=6.2.3 (**high**), Prototype Pollution Protection Bypass in qs and vulnerable to Prototype Pollution.
  - The qs.parse function fails to properly prevent an object's prototype to be altered when parsing arbitrary input. Input containing [ or ] may bypass the prototype pollution protection and alter the Object prototype. This allows attackers to override properties that will exist in all objects, which may lead to Denial of Service or Remote Code Execution in specific circumstances.
  - qs before 6.10.3 allows attackers to cause a Node process hang because an __ proto__ key can be used. In many typical web framework use cases, an unauthenticated remote attacker can place the attack payload in the query string of the URL that is used to visit the application, such as a[__proto__]=b&a[__proto__]&a[length]=100000000.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v6.2.0 to v6.11.0.

- semver 6.0.0 - 6.3.0 || 7.0.0 - 7.5.1 (**moderate**), semver vulnerable to Regular Expression Denial of Service.
  - Versions of the package semver before 7.5.2 on the 7.x branch, before 6.3.1 on the 6.x branch, and all other versions before 5.7.2 are vulnerable to Regular Expression Denial of Service (ReDoS) via the function new Range, when untrusted user data is provided as a range.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v7.5.1 to v7.5.4 and v6.3.0 to v6.3.1 (node_modules/make-dir/node_modules/semver).

- send <=0.15.6 (**high**), depends on vulnerable of debug, fresh, mime and ms.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v0.14.1 to v0.18.0 and removed 'node_modules/serve-static/node_modules/send' v0.14.2.

- serve-static 1.1.0 - 1.12.5 (**high**), depends on vulnerable version of send.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v1.11.2 to v1.15.0.

Running *npm audit fix* after changing package.json manually added 7 packages, removed 20 packages, changed 24 packages.

## Frontend

### Start app

```
# To run the app on *http://localhost:9000/frontend/*
python3 -m http.server 9000
```

## Choice of framework

Here we can write about the framework we chose for this project.
