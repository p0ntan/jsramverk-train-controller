describe('The Page Navigation', () => {
it('works successfully', () => {
    cy.visit('/')

    cy.contains('h1', 'Försenade Tåg').should('exist');

    cy.get('.delayed')

    cy.get('.delayed-trains')
    .find('div').first().click()

    cy.contains('h1', 'Nytt ärende').should('exist');

    cy.get('a').click()
})
})