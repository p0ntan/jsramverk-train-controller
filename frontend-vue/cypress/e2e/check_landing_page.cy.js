describe('The Landing Page', () => {
it('successfully loads', () => {
    cy.visit('/')

    // Check that title is displayed
    cy.contains('Försenade Tåg')

    // Check if a div with class ".delayed-trains" exists
    cy.get('.delayed-trains').should('exist');

    // Check if a div with id "map" exists
    cy.get('#map').should('exist');
})
})