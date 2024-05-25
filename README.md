# Repository *jsramverk-train-controller*

This is the repository for the course *jsramverk* (HT-23).
It was created by students with acronym *elmo22* and *poak22*.

## How to use this repo

An .env file is needed in the /backend folder with API-key, see *.env.example* for structure.

When developing, both, the backend and frontend, need to be started locally. This will run backend and frontend in the development environment, which won't effect the database used in the deployed application. When starting frontend in development the URL 'localhost:1337' is used to fetch data, where backend then uses it's own database 'development' in the Atlas Cloud.

```
# Run backend from /backend folder
npm run start-dev
```

```
# Run frontend from /frontend-vue folder
npm run dev
```
### Reset development database

If needed during development, the development database can be reset.

```
# To reset the development database, stand in /backend folder.
npm run dev-reset-db
```

### Tests

Test can be run for both backend and frontend.

#### Backend

Mocha together with chai is used for backend testing. Testing is done on a it's own database called 'test' that is set-up in the Atlas Cloud. The command below is also the command used in github actions for continuous integration.

```
# Stand in /backend folder.
npm run test
```

#### Frontend (Vue)

For frontend testing cypress is used for end to end testing. Testing uses the API and also the 'test' database in the Atlas Cloud. The backend needs to be started locally in 'test-mode'. To run the test the commands below is needed to be run, which is also the way it's done during continuous integration.

```
# Stand in /backend folder.
npm run start-test

# Start the front-end server from /frontend-vue
npm run dev

# Then run the test from /frontend-vue
npm run cy:run --e2e
```

## Steps to make backend work locally from original repo

### Backend

Created account [Trafikverket](https://api.trafikinfo.trafikverket.se/) to receive a personal API key, then create an .env file, following the template in .env.example, and store your API key in that file.

```
# When opening the repo for the first time, stand in the folder /backend.
# Make sure node and npm are installed
# Then install the dependencies in the local node_modules folder
node -v
npm -v
npm install

```

#### Start app

```
# To run the app from /backend folder (using a npm-script)
npm run start-dev
```

### Frontend

#### Start app

```
# To run the app on *http://localhost:9000/*
# Stand in the folder /frontend
python3 -m http.server 9000
```
