import { render, screen } from '@testing-library/react';
import App from './App';
import { LoginProvider } from './LoginContext';
import { BrowserRouter } from 'react-router';
import { updateTimes, initializeTimes } from './App';


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
const testingArray = [{
  day: "Mon., Jan. 19th, 2026",
  times: [{time: "16:00", available: true},
    {time: "17:00", available: true},
    {time: "18:00", available: false},
    {time: "19:00", available: true},
    {time: "20:00", available: false}]
},
{ day: "Tue., Jan. 20th, 2026",
  times: [{time: "16:00", available: false},
    {time: "17:00", available: true},
    {time: "18:00", available: false},
    {time: "19:00", available: false},
    {time: "20:00", available: true}]
}];

const originalArray = [{
  day: "Mon., Jan. 19th, 2026",
  times: [{time: "16:00", available: true},
    {time: "17:00", available: true},
    {time: "18:00", available: false},
    {time: "19:00", available: true},
    {time: "20:00", available: false}]
},
{ day: "Tue., Jan. 20th, 2026",
  times: [{time: "16:00", available: false},
    {time: "17:00", available: true},
    {time: "18:00", available: false},
    {time: "19:00", available: false},
    {time: "20:00", available: true}]
},
{ day: "Wed., Jan. 21th, 2026",
  times: [{time: "16:00", available: true},
    {time: "17:00", available: true},
    {time: "18:00", available: false},
    {time: "19:00", available: true},
    {time: "20:00", available: false}]
},
{ day: "Thu., Jan. 22th, 2026",
  times: [{time: "16:00", available: true},
    {time: "17:00", available: true},
    {time: "18:00", available: true},
    {time: "19:00", available: false},
    {time: "20:00", available: true}]
},
{ day: "Fri., Jan. 23th, 2026",
  times: [{time: "16:00", available: true},
    {time: "17:00", available: true},
    {time: "18:00", available: true},
    {time: "19:00", available: true},
    {time: "20:00", available: true}]
}
];

describe("App test", () => {
test('Renders the word specials', () => {
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

test("updateTimes reducer-function returns a modified array without the inputed day and time", () => {
  expect(updateTimes(testingArray,
{ type: "selected_day_time",
  day: "Tue., Jan. 20th, 2026",
  time: "17:00",
}))
.toEqual([{
  day: "Mon., Jan. 19th, 2026",
  times: [{time: "16:00", available: true},
    {time: "17:00", available: true},
    {time: "18:00", available: false},
    {time: "19:00", available: true},
    {time: "20:00", available: false}]
},
{ day: "Tue., Jan. 20th, 2026",
  times: [{time: "16:00", available: false},
    {time: "17:00", available: false},
    {time: "18:00", available: false},
    {time: "19:00", available: false},
    {time: "20:00", available: true}]
}]);
});

test("initializeTimes returns de original array", () => {
  expect(initializeTimes()).toEqual(originalArray);
});
});