describe('Login user', () => {
    it('works correctly', () => {
        cy.visit('/')

        //TODO This is bad!!!
        const username = Cypress.env('user1')
        const password = Cypress.env('pw1')

        // Fill out register form
        cy.get('#registerUser').click()
        cy.get('form').get('input[type="email"]').type(username)
        cy.get('form').get('input[type="password"]').type(password)
        cy.get('form').find('button').type('submit').click()

        // Check if alert appears
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Error')
        })
        
        // Close form
        cy.get('.user-form').find('button').first().click()

        // Fill out login form
        cy.get('#loginUser').click()
        cy.get('form').get('input[type="email"]').type(username)
        cy.get('form').get('input[type="password"]').type(password)
        cy.get('form').find('button').type('submit').click()

        // Logout
        cy.get('#logoutUser').click()

        // Make sure login button is visible again
        cy.get('#loginUser').click()
        cy.get('.user-form').find('button').first().click()
    })
})