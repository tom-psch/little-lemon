import { render, screen } from '@testing-library/react';
import App, {updateTimes} from './App';
import { LoginProvider } from './LoginContext';
import { BrowserRouter } from 'react-router';
import { initializeTimes } from './App';

const testingArray = initializeTimes();

describe("App test", () => {
beforeEach(()=>{
  render(
  <BrowserRouter>
    <LoginProvider>
      <App/>
    </LoginProvider>
  </BrowserRouter>
  );
})
  test('Renders the word specials', () => {
  const linkElement = screen.getByText(/specials/i);
  expect(linkElement).toBeInTheDocument();
});

test("updateTimes reducer-function returns array with available times for the selected day", () => {
  expect(updateTimes(testingArray,
{ type: "selected_day",
  day: new Date().toISOString().split('T')[0],
})).toBeInstanceOf(Array);
});

test("initializeTimes returns today's array with available times", () => {
  expect(initializeTimes()).toBeInstanceOf(Array);
});
});


//README!

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