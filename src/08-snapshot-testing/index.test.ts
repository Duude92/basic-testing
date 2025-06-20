// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    // Write your test here
    const values = ['a', 2, { b: 0 }];
    const expected = {
      value: 'a',
      next: {
        value: 2,
        next: {
          value: { b: 0 },
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    expect(generateLinkedList(values)).toEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    // Write your test here
    const values = ['b', 3, { a: 1 }];
    expect(generateLinkedList(values)).toMatchSnapshot();
  });
});
