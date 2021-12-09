import { getGreeting } from '../support/app.po'

describe('web', () => {
  it('should load the login page', () => {
    cy.visit('/', { retryOnNetworkFailure: true, timeout: 60_000 })
    getGreeting().contains('Log In')
  })
})
