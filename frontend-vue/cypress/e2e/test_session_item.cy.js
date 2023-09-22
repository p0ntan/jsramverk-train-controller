describe('Check "train" in Session Storage', () => {
    it('displays TicketView', () => {
        cy.visit('/');

        // Save train number in the first element
        let trainNumber

        cy.get('.train-number').first().then(($element) => {
            trainNumber = $element.text()
            expect(trainNumber).to.exist
        });

        // Navigate to the TicketView
        cy.get('.delayed-trains')
        .find('div').first().click()

        // Get the value from session storage
        cy.window().then((win) => {
            const storedValue = win.sessionStorage.getItem('train')
            const retrievedObj = JSON.parse(storedValue)

            // Check if the train numbers are equal
            expect(retrievedObj).to.exist
            expect(retrievedObj.OperationalTrainNumber).to.exist
            expect(retrievedObj.OperationalTrainNumber).to.equal(trainNumber)
        });

    });
});