import { getGreeting } from '../support/app.po'

describe('mgmt', () => {
  it('should display welcome message', () => {
    cy.visit('/', { retryOnNetworkFailure: true, timeout: 60_000 })

    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword')

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('responsibility')
  })
})
