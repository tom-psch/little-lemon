import { render, screen } from '@testing-library/react';
import App from './App';
import { LoginProvider } from './LoginContext';
import { BrowserRouter } from 'react-router';


/*THIS TEST IS RUNNING CORRECTLY AFTER 
1) CHANGING THE REACT-ROUTER-HASH-LINK DEPENDENCY FOR JUST "REACT-ROUTER" INSTEAD OF "REACT-ROUTER-DOM"
2) ADDING THE FOLLOWING ADD'ONS IN THE FILE "setupTests.js"

import { TextEncoder, TextDecoder } from 'util'; // Use 'node:util' in newer Node versions

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}
if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder;
}

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});
*/

test('Default react test changed for Little Lemon', () => {
  render(
  <BrowserRouter>
    <LoginProvider>
      <App/>
    </LoginProvider>
  </BrowserRouter>
  );
  const linkElement = screen.getByText(/specials/i);
  expect(linkElement).toBeInTheDocument();
});
