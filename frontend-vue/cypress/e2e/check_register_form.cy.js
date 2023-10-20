describe('Register form', () => {
    it('exits', () => {
        cy.visit('/')

        // Register button exists
        cy.get('#registerUser').should('exist')
        cy.get('#registerUser').click()

        // Form appears after click
        cy.contains("Registrera").should('exist')
        cy.get('form').should('exist')
        cy.get('form').find('input[type="email"]').should('exist')
        cy.get('form').find('input[type="password"]').its('length').should('eq', 2)
        cy.get('form').find('button').contains('Registrera').should('exist')

        // Cancel button exists
        cy.get('.user-form').find('button').should('exist')
        cy.get('.user-form').find('button').first().click()
    })
})