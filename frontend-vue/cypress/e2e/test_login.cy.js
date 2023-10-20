describe('Login user', () => {
    it('works correctly', () => {
        cy.visit('/')

        // Make sure login, register buttons exist
        cy.get('#loginUser').should('exist')
        cy.get('#registerUser').should('exist')
        cy.get('#logoutUser').should('not.exist')

        const username = Cypress.env('user1')
        const password = Cypress.env('pw1')

        // Login
        cy.get('#loginUser').click()
        cy.get('form')
        .find('input[type="email"]').type(username)
        .get('input[type="password"]').type(password)
        .get('button[type="submit"]').click()

        // Due to slow load time
        // cy.get('.user-form').find('button').first().click({force: true})
        cy.wait(5000)

        // Check if login was successful
        cy.get('#logoutUser').should('exist').then((logoutButton) => {
            if (logoutButton.length === 0) {
                // Login failed, try logging in
                cy.get('#registerUser').click()
                cy.get('form')
                .find('input[type="email"]').type(username)
                .get('#password').scrollIntoView().type(password)
                .get('#password2').scrollIntoView().type(password)
                .get('form').get('button[type=submit]').click()
                cy.get('#logoutUser').should('exist')
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