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

Explanation of vulnerabilities:

**ReDoS** - Regular Expression Denial of Service. Can in an attack or even by accident by a developer make an application become slow, unresponsive or even crash by consuming lots of system resources like CPU time or memory.[^1]

**Inefficient Regular Expression Complexity Vulnerability** - Meaning that the use of regular expressions is unoptimized and leads to inefficiency in the system. Doesn't necessarily lead to a ReDoS, but can slow the application down.[^2]

**Prototype pollution** - is a vulnerability making it possible for a attacker to add properties to global object prototypes, which can harm systems or give an attacker unauthorized access.[^3]

- debug <=2.6.8 (**high**), ReDoS and inefficient Regular Expression Complexity vulnerability.
  - Vulnerable to ReDoS when untrusted user input is passed into the 'o' formatter.
  - Manipulation of the argument str in function useColors in the file src/node.js leads to inefficient regular expression complexity.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v2.2.0 to v2.6.9.

- express  2.5.8 - 4.15.4 || 5.0.0-alpha.1 - 5.0.0-alpha.5 (**high**), depends on vulnerable versions of debug, finalhandler, fresh, qs, send and serve-static.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v4.14.0 to v4.18.2.

- finalhandler <=1.0.5 (**high**), depends on vulnerable versions of debug.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v0.5.0 to v1.2.0.

- fresh <0.5.2 (**high**), ReDoS.
  - Vulnerable to ReDoS when parsing specially crafted user input.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v0.3.0 to v0.5.2.

- mime <1.4.1 (**moderate**), ReDoS.
  - Vulnerable to ReDoS when a mime lookup is performed on untrusted user input.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v1.3.4 to v1.6.0.

- ms <2.0.0 (**moderate**), Inefficient Regular Expression Complexity vulnerability.
  - Manipulation of the argument str in function parse in file index.js leads to inefficient regular expression complexity. The attack may be initiated remotely.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v0.7.1 to v2.0.0 and removed 'node_modules/serve-static/node_modules/ms' v0.7.2.

- node-fetch <2.6.7 (**high**), vulnerable to Exposure of Sensitive Information to an Unauthorized Actor.
  - **Fixed** by manually setting node-fetch to ^v2.7.0 in package.json.

- qs <=6.2.3 (**high**), Prototype Pollution and Prototype Pollution Protection Bypass.
  - qs before 6.10.3 allows attackers to cause a Node process hang because an __ proto__ key can be used.
  - The qs.parse function fails to properly prevent an object's prototype to be altered when parsing arbitrary input.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v6.2.0 to v6.11.0.

- semver 6.0.0 - 6.3.0 || 7.0.0 - 7.5.1 (**moderate**), ReDoS.
  - Vulnerable to ReDoS (ReDoS) via the function new Range, when untrusted user data is provided as a range.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v7.5.1 to v7.5.4 and v6.3.0 to v6.3.1 (node_modules/make-dir/node_modules/semver).

- send <=0.15.6 (**high**), depends on vulnerable of debug, fresh, mime and ms.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v0.14.1 to v0.18.0 and removed 'node_modules/serve-static/node_modules/send' v0.14.2.

- serve-static 1.1.0 - 1.12.5 (**high**), depends on vulnerable version of send.
  - **Fixed** automatically with *npm audit fix*, updating affected version from v1.11.2 to v1.15.0.

Running *npm audit fix* after changing package.json manually added 7 packages, removed 20 packages, changed 24 packages.

[^1] https://www.regular-expressions.info/redos.html, last visited 2023-08-30.

[^2] https://www.martellosecurity.com/kb/mitre/cwe/1333/, last visited 2023-08-30.

[^3] https://portswigger.net/web-security/prototype-pollution, last visited 2023-08-30.


## Frontend

### Start app

```
# To run the app on *http://localhost:9000/frontend/*
python3 -m http.server 9000
```

## Choice of framework

Here we can write about the framework we chose for this project.
