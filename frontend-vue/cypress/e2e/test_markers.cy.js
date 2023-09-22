describe('The Map and Markers', () => {
    it('successfully load', () => {
        cy.visit('/')

        // Check if a div with id "map" exists
        cy.get('#map').should('exist')

        // Zoom in on the map
        cy.get('.leaflet-control-zoom-in').click()
        cy.get('.leaflet-control-zoom-out').click()

        // Check that there are markers
        cy.get('.leaflet-marker-icon', { timeout: 5000 }).should('exist')
    })
    })