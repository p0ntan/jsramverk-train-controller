describe('New ticket', () => {
    beforeEach(() => {
        cy.visit('/')

        const user = {
            username: Cypress.env('user1'),
            password: Cypress.env('pw1')
        }
        // Bypass the login before each test
        cy.bypassLogin(user);
    });
    it('created successfully', () => {
        // Save train number in the first element
        let trainNumber

        cy.get('.delayed-trains').find('.train-number').last().then(($element) => {
            trainNumber = $element.text()
            expect(trainNumber).to.exist

            // Navigate to the TicketView for that train
            cy.get('.delayed-trains').find('.train').last().find('button').click()
            cy.url().should('contain', '/tickets')
            cy.contains(trainNumber)

            // Form to create new Ticket should exist
            cy.get('form').should('exist')
            cy.get('select').should('exist')
            cy.get('select').find('option').its('length').should('be.gt', 1)

            // The code below modifies the db
            // Make sure to use the test database // TODO look up alternative

            // Select option ANA031
            cy.get('select').contains('ANA031').should('exist')
            cy.get('select').select('ANA031')

            // Submit choice
            cy.get('input[type="submit"]').should('exist')
            cy.get('input[type="submit"]').click()

            // Check ticket added to ticket list
            cy.get('.old-tickets').find('div').last().should('exist')
            cy.get('.old-tickets').find('div').last().invoke('text').should('include', 'ANA031')
            cy.get('.old-tickets').find('div').last().should('contain', trainNumber)
        })
    });
    after(() => {
        // Perform a logout action to end the session
        cy.get('a').click()
        cy.get('#logoutUser').click()
        cy.get('#loginUser').should('exist')
    })
});