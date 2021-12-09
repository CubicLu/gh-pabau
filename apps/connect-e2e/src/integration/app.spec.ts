describe('connect', () => {
  it('should display error message for root access', () => {
    cy.visit('/')
    cy.contains('Invalid online bookings URL')
  })
})
