// import { render } from '@testing-library/react'
// import Index from '../pages/index'
// import { MockedProvider } from '@apollo/client/testing'

// //manual mock to handle matchMedia not found function ref: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   value: jest.fn().mockImplementation((query) => ({
//     matches: false,
//     media: query,
//     onchange: null,
//     addListener: jest.fn(), // deprecated
//     removeListener: jest.fn(), // deprecated
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     dispatchEvent: jest.fn(),
//   })),
// })

// it('should render successfully', () => {
//   const { baseElement } = render(
//     <MockedProvider>
//       {/*<Index />*/}
//       <h1>temporarily disabled</h1>
//     </MockedProvider>
//   )
//   expect(baseElement).toBeTruthy()
// })
