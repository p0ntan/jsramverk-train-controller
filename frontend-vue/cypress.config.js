const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://www.student.bth.se/~elmo22/editor',
    }
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
});
