require('dotenv').config();
const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173',
        specPattern: [
            "cypress/e2e/test_register.cy.js",
            "cypress/e2e/test_login.cy.js",
            "cypress/e2e/test_new_ticket.cy.js",
            "cypress/e2e/test_edit.cy.js",
            "cypress/e2e/*.cy.js"
        ]
    },
    env: {
        user1: process.env.TEST_USER1,
        pw1: process.env.TEST_PW1
    }
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
});
