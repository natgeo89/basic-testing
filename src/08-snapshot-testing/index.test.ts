import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList(['a', 20]);

    expect(linkedList).toStrictEqual({
      value: 'a',
      next: { value: 20, next: { value: null, next: null } },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([10, 20]);

    expect(linkedList).toMatchSnapshot();
  });
});
