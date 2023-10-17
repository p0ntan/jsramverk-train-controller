describe('Visit tickets while logged out', () => {
it('works successfully', () => {
    cy.visit('/')

    cy.contains('h1', 'Försenade Tåg').should('exist');

    cy.get('.delayed')

    cy.get('#nav-tickets').click()

    cy.contains('h2', 'Befintliga ärenden').should('exist');

    cy.get('a').click()
})
})