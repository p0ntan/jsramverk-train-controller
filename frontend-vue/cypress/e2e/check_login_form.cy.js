describe('Login form', () => {
    it('exits', () => {
        cy.visit('/')

        // Login button exists
        cy.get('#loginUser').should('exist')
        cy.get('#loginUser').click()

        // Form appears after click
        cy.get('h2').contains("Logga in").should('exist')
        cy.get('form').should('exist')
        cy.get('form').get('input[type="email"]').should('exist')
        cy.get('form').get('input[type="password"]').should('exist')
        cy.get('form').find('button').contains('Logga in').should('exist')

        // Cancel button exists
        cy.get('.user-form').find('button').should('exist')
        cy.get('.user-form').find('button').first().click()
    })
})