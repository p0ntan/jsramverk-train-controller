describe('Test editing tickets', () => {
    beforeEach(() => {
        const user = {
            username: Cypress.env('user1'),
            password: Cypress.env('pw1')
        }
        // Bypass the login before each test
        cy.bypassLogin(user);
        cy.get('.delayed-trains')
        .find('div').first().click()
        cy.url().should('contain', '/tickets')
    });
    it('edit button exists', () => {
        // Check that edit button is visible
        cy.get('button').contains('edit').should('exist')

        // Check that the options to edit the code appear
        cy.get('#old-tickets').find('button').first().click()
        cy.get('#old-tickets').find('form').should('exist')
        cy.get('#old-tickets').find('option').its('length').should('be.gt', 1)
        cy.get('#old-tickets').find('button').contains('save').should('exist')
        cy.get('#old-tickets').find('button').contains('cancel').should('exist')

        // Check that cancel button works
        cy.get('#old-tickets').find('button').contains('cancel').click()
        cy.get('#old-tickets').find('button').contains('save').should('not.exist')
        cy.get('#old-tickets').find('button').contains('cancel').should('not.exist')
    });
    it('edit one at a time', () => {
        // Check that only one ticket at a time is edited
        cy.get('#old-tickets').find('button').last().click()
        cy.get('#old-tickets').find('button').first().click()
        cy.get('#old-tickets').find('button').contains('save').its('length').should('be.lte', 1)
        cy.get('#old-tickets').find('button').contains('cancel').its('length').should('be.lte', 1)
    });
    //TODO finish this test
    // it('edit button works', () => {
    //     // Check that the save button works
    //     cy.get('#old-tickets').find('button').last().click()

    //     let selectedOption;

    //     cy.get('#old-tickets').find('select').invoke('val').then(val => {
    //     selectedOption = val;
    //     });

    //     cy.get('#old-tickets').find('select').then($select => {
    //     // Get all options inside the select element
    //     const options = $select.find('option')
        
    //     // Find an option that is not equal to the selected option
    //     const newOption = options.toArray().find(option => option.value !== selectedOption)
        
    //     // Submit the new option
    //     $select.select(newOption[0])
    //     cy.get('#old-tickets').find('button[type=submit]').click()
    //     });
    // });
    afterEach(() => {
        // Perform a logout action to end the session
        cy.get('a').click()
        cy.get('#logoutUser').click()
        cy.get('#loginUser').should('exist')
    })
});