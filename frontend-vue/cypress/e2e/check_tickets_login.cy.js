describe('Visit tickets while logged in', () => {
it('works successfully', () => {
    cy.visit('/')

    const user = {
        username: Cypress.env('user1'),
        password: Cypress.env('pw1')
    }
    // Bypass the login
    cy.bypassLogin(user)

    // Check we are on train view
    cy.contains('h1', 'Försenade Tåg').should('exist')

    // Check ticket button exists
    cy.get('.delayed-trains').find('.train').first().find('button').should('exist')

    // Click on button and navigate to ticket view
    cy.get('.delayed-trains').find('.train').first().find('button').click()
    cy.url().should('contain', '/tickets')
    cy.contains('h2', 'Befintliga ärenden').should('exist');

    // Navigate back to train view
    cy.get('a').click()
    cy.contains('h1', 'Försenade Tåg').should('exist')
})
})