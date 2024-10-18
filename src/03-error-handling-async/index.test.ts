import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect.assertions(3);

    const result1 = await resolveValue(555);
    expect(result1).toEqual(555);

    const result2 = await resolveValue('resolved_string');
    expect(result2).toEqual('resolved_string');

    const result3 = await resolveValue(['1', 2]);
    expect(result3).toEqual(['1', 2]);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => {
      throwError('NodeJS');
    }).toThrow(new Error('NodeJS'));
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
    expect(throwCustomError).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect.assertions(1);

    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
