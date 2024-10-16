import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result1 = simpleCalculator({ a: 1, b: 2, action: Action.Add });
    expect(result1).toBe(3);

    const result2 = simpleCalculator({ a: 14, b: 2, action: Action.Add });
    expect(result2).toBe(16);

    const result3 = simpleCalculator({ a: 5, b: 32, action: Action.Add });
    expect(result3).toBe(37);
  });

  test('should subtract two numbers', () => {
    const result1 = simpleCalculator({ a: 10, b: 3, action: Action.Subtract });
    expect(result1).toBe(7);

    const result2 = simpleCalculator({ a: 13, b: 2, action: Action.Subtract });
    expect(result2).toBe(11);

    const result3 = simpleCalculator({ a: 5, b: 32, action: Action.Subtract });
    expect(result3).toBe(-27);
  });

  test('should multiply two numbers', () => {
    const result1 = simpleCalculator({ a: 20, b: 3, action: Action.Multiply });
    expect(result1).toBe(60);

    const result2 = simpleCalculator({ a: 11, b: 2, action: Action.Multiply });
    expect(result2).toBe(22);

    const result3 = simpleCalculator({ a: 5, b: -1, action: Action.Multiply });
    expect(result3).toBe(-5);
  });

  test('should divide two numbers', () => {
    const result1 = simpleCalculator({ a: 9, b: 3, action: Action.Divide });
    expect(result1).toBe(3);

    const result2 = simpleCalculator({ a: 33, b: 3, action: Action.Divide });
    expect(result2).toBe(11);

    const result3 = simpleCalculator({ a: 5, b: -1, action: Action.Divide });
    expect(result3).toBe(-5);
  });

  test('should exponentiate two numbers', () => {
    const result1 = simpleCalculator({
      a: 5,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result1).toBe(125);

    const result2 = simpleCalculator({
      a: 10,
      b: -1,
      action: Action.Exponentiate,
    });
    expect(result2).toBe(0.1);

    const result3 = simpleCalculator({
      a: 100500,
      b: 0,
      action: Action.Exponentiate,
    });
    expect(result3).toBe(1);
  });

  test('should return null for invalid action', () => {
    const result1 = simpleCalculator({ a: 1, b: 2, action: 5 });
    expect(result1).toBeNull();

    const result2 = simpleCalculator({ a: 1, b: 2, action: '_' });
    expect(result2).toBeNull();

    const result3 = simpleCalculator({ a: 1, b: 2, action: '++' });
    expect(result3).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result1 = simpleCalculator({ a: 1, b: 'test', action: Action.Add });
    expect(result1).toBeNull();

    const result2 = simpleCalculator({ a: [], b: {}, action: Action.Divide });
    expect(result2).toBeNull();

    const result3 = simpleCalculator({
      a: undefined,
      b: 100,
      action: Action.Divide,
    });
    expect(result3).toBeNull();
  });
});
