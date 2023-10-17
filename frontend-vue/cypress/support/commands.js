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
    // Register
    cy.get('#registerUser').click()
    cy.get('form').get('input[type="email"]').type(user.username)
    cy.get('form').get('input[type="password"]').type(user.password)
    cy.get('form').find('button[type=submit]').click()

    // Check if alert appears
    cy.on('window:alert', (text) => {
        expect(text).to.contains('Error')
    })
    cy.get('.user-form').find('button').first().click()

    // Login
    cy.get('#loginUser').click()
    cy.get('form').get('input[type="email"]').type(user.username)
    cy.get('form').get('input[type="password"]').type(user.password)
    cy.get('form').find('button').type('submit').click()
    cy.get('#logoutUser').should('exist')
})