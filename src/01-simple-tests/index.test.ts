// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 3, b: 4, action: Action.Add })).toBe(7);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 2, b: 5, action: Action.Subtract })).toBe(-3);
  });

  test('should multiply two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: -3, b: 5, action: Action.Multiply })).toBe(
      -15,
    );
  });

  test('should divide two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 21, b: 7, action: Action.Divide })).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 3, b: 5, action: Action.Exponentiate })).toBe(
      243,
    );
  });

  test('should return null for invalid action', () => {
    // Write your test here
    expect(simpleCalculator({ a: 2, b: 10, action: 'something' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    expect(
      simpleCalculator({ a: 'something', b: 10, action: Action.Add }),
    ).toBe(null);
  });
});
