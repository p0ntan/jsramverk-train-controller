describe('Register form', () => {
    it('exits', () => {
        cy.visit('/')

        // Register button exists
        cy.get('#registerUser').should('exist')
        cy.get('#registerUser').click()

        // Form appears after click
        cy.get('h2').contains("Registrera").should('exist')
        cy.get('form').should('exist')
        cy.get('form').get('input[type="email"]').should('exist')
        cy.get('form').get('input[type="password"]').should('exist')
        cy.get('form').find('button').type('submit').should('exist')

        // Cancel button exists
        cy.get('.user-form').find('button').should('exist')
        cy.get('.user-form').find('button').first().click()
    })
})