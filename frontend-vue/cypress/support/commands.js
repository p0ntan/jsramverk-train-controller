// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('bypassLogin', (user) => {
    // Login
    cy.get('#loginUser').click()
    cy.get('form')
    .find('input[type="email"]').type(user.username)
    .get('input[type="password"]').type(user.password)
    .get('button[type="submit"]').click()

    // Due to slow load time
    // cy.get('.user-form').find('button').first().click({force: true})
    // cy.wait(5000)

    // // Check if login was successful
    // cy.get('#logoutUser', { timeout: 10000 }).should('exist').then((logoutButton) => {
    //     if (logoutButton.length === 0) {
    //         // Login failed, try logging in
    //         cy.get('#registerUser').click()
    //         cy.get('form')
    //         .find('input[type="email"]').type(user.username)
    //         .get('#password').scrollIntoView().type(user.password)
    //         .get('#password2').scrollIntoView().type(user.password)
    //         .get('form').get('button[type=submit]').click()
    //         cy.get('#logoutUser').should('exist')
    //     }
    // })
})