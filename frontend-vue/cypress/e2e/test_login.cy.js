describe('Login user', () => {
    it('works correctly', () => {
        cy.visit('/')

        // Make sure login, register buttons exist
        cy.get('#loginUser').should('exist')
        cy.get('#registerUser').should('exist')
        cy.get('#logoutUser').should('not.exist')

        const username = Cypress.env('user1')
        const password = Cypress.env('pw1')

        // Fill out register form
        cy.get('#registerUser').click()
        cy.get('form').get('input[type="email"]').type(username)
        cy.get('form').get('#password').type(password)
        cy.get('form').get('#password2').type(password)
        cy.get('form').find('button[type="submit"]').click({force: true})

        // Check if an error message exists
        cy.contains('Error').then((errorElement) => {
            if (errorElement.length > 0) {
            // If error is found
            // Fill out login form
            cy.get('#loginUser').click()
            cy.get('form').get('input[type="email"]').type(username)
            cy.get('form').get('input[type="password"]').type(password)
            cy.get('form').find('button[type="submit"]').click({force: true})
            }
        })

        // Check the change in DOM occurred
        cy.get('#logoutUser').should('exist')
        cy.get('#loginUser').should('not.exist')
        cy.get('#loginUser').should('not.exist')

        // Logout
        cy.get('#logoutUser').click()

        // Make sure login button is visible again
        cy.get('#loginUser').should('exist')
        cy.get('#registerUser').should('exist')
        cy.get('#logoutUser').should('not.exist')
    })
})