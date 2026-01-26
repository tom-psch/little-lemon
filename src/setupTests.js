// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// //ESTO DE ACÁ ABAJO ES NUEVO
// import { TextEncoder } from 'util';

// global.TextEncoder = TextEncoder;

/* TODO LO DE ACÁ ABAJO TAMBIEN Y FUNCIONÓ*/

import { TextEncoder, TextDecoder } from 'util'; // Use 'node:util' in newer Node versions

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}
if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder;
}

/* ESTO VAMOS A VER */
beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

// import { configure } from '@testing-library/react';

// configure({computedStyleSupportsPseudoElements: true});