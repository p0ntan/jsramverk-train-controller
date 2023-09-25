describe('New ticket', () => {
    it('created successfully', () => {
        cy.visit('/');

        // The uncommented code modifies the deployed db
        // TODO look up how to use a test database
        // Save train number in the first element
        let trainNumber

        cy.get('.train-number').first().then(($element) => {
            trainNumber = $element.text()
            expect(trainNumber).to.exist

            // Navigate to the TicketView
            cy.get('.delayed-trains')
            .find('div').first().click()

            // Select option ANA031
            cy.get('select').select('ANA031 - Kort tåg')

            // Submit choice
            cy.get('input[type="submit"]').should('exist')
            cy.get('input[type="submit"]').click()

            // Ticket list
            cy.get('.old-tickets').find('div').last().should('exist')

            cy.get('.old-tickets').find('div').last().invoke('text').should('include', 'ANA031')

            cy.get('.old-tickets').find('div').last().should('contain', trainNumber)
        })
    });
});