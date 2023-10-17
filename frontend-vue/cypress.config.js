require('dotenv').config();
const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173',
    },
    env: {
        user1: process.env.TEST_USER1,
        pw1: process.env.TEST_PW1
    }
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
});
