describe('Test editing tickets', () => {
    beforeEach(() => {
        cy.visit('/')

        const user = {
            username: Cypress.env('user1'),
            password: Cypress.env('pw1')
        }
        // Bypass the login before each test
        cy.bypassLogin(user)

        // Click on first train
        cy.get('.delayed-trains').find('.train').first().find('button').click()
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

        // Close ticket
        cy.get('#old-tickets').find('button').contains('cancel').click()
        cy.get('#old-tickets').find('button').contains('save').should('not.exist')
        cy.get('#old-tickets').find('button').contains('cancel').should('not.exist')
    });
    it('save edit button works', () => {
        // Check that the save button works
        cy.get('#old-tickets').find('button').last().click()

        cy.get('#old-tickets').find('option:selected').invoke('val').then(val => {
            cy.log(val)

            // Select another option (ANA002)
            const edit = 'ANA002'

            cy.get('#old-tickets').find('select').select(edit)
            cy.get('#old-tickets').find('button[type=submit]').click()

            // Check change occurred
            cy.get('#old-tickets').last().contains(edit)

            // Change back
            cy.get('#old-tickets').find('select').select(val)
            cy.get('#old-tickets').find('button[type=submit]').click()
            cy.get('#old-tickets').last().contains(val)
        });
    });
    it('userA enters edit mode and leave page via navigation', () => {
        // Click on edit button and leave
        cy.get('#old-tickets').find('button').contains('edit').first().click()
    });
    it('userB can edit previously blocked ticket', () => {
        // Edit button is not blocked ticket
        cy.get('#old-tickets').find('div').find('div').first()
        .find('button').contains('edit').should('exist')
    });
    it('userA enters edit mode and refreshes the page', () => {
        // Click on edit button and leave
        cy.get('#old-tickets').find('button').contains('edit').first().click()

        // Refresh page and login again
        cy.reload()
        cy.get('a').click()

        const user = {
            username: Cypress.env('user1'),
            password: Cypress.env('pw1')
        }
        cy.bypassLogin(user)

        cy.get('.delayed-trains').find('.train').first().find('button').click()
        cy.url().should('contain', '/tickets')

        // Edit button is not blocked ticket
        cy.get('#old-tickets').find('div').find('div').first()
        .find('button').contains('edit').should('exist')
    });
    afterEach(() => {
        // Perform a logout action to end the session
        cy.get('a').click()
        cy.get('#logoutUser').click()
        cy.get('#loginUser').should('exist')
    })
});