import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 10, b: 3, action: Action.Subtract, expected: 7 },
  { a: 13, b: 2, action: Action.Subtract, expected: 11 },
  { a: 5, b: 32, action: Action.Subtract, expected: -27 },

  { a: 20, b: 3, action: Action.Multiply, expected: 60 },
  { a: 11, b: 2, action: Action.Multiply, expected: 22 },
  { a: 5, b: -1, action: Action.Multiply, expected: -5 },

  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 33, b: 3, action: Action.Divide, expected: 11 },
  { a: 5, b: -1, action: Action.Divide, expected: -5 },

  {
    a: 5,
    b: 3,
    action: Action.Exponentiate,
    expected: 125,
  },
  {
    a: 10,
    b: -1,
    action: Action.Exponentiate,
    expected: 0.1,
  },
  {
    a: 100500,
    b: 0,
    action: Action.Exponentiate,
    expected: 1,
  },

  { a: 1, b: 2, action: 5, expected: null },
  { a: 1, b: 2, action: '_', expected: null },
  { a: 1, b: 2, action: '++', expected: null },

  { a: 1, b: 'test', action: Action.Add, expected: null },
  { a: [], b: {}, action: Action.Divide, expected: null },
  {
    a: undefined,
    b: 100,
    action: Action.Divide,
    expected: null,
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$a $action $b should be equal $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
