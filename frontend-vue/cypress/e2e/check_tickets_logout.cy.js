describe('Visit tickets while logged out', () => {
it('works successfully', () => {
    cy.visit('/')

    cy.contains('Försenade Tåg').should('exist');

    cy.get('.delayed')

    cy.get('#nav-tickets').click()

    cy.contains('Befintliga ärenden').should('exist');

    cy.get('a').click()
})
})