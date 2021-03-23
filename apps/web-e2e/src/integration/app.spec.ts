// import { getGreeting } from '../support/app.po'

describe('web', () => {
  beforeEach(() => cy.visit('/', {retryOnNetworkFailure:true,timeout:45000}))

  it('should display welcome message 22', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword')

    // Function helper example, see `../support/app.po.ts` file
    // getGreeting().contains('Welcome')
  })
})
