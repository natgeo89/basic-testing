import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(100500);

    expect(bankAccount.getBalance()).toBe(100500);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(100500);

    expect(() => {
      bankAccount.withdraw(200000);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(100500);
    const anotherBankAccount = getBankAccount(0);

    expect(() => {
      bankAccount.transfer(200000, anotherBankAccount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(100500);

    expect(() => {
      bankAccount.transfer(10, bankAccount);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(10);
    bankAccount.deposit(150);

    expect(bankAccount.getBalance()).toBe(160);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(10);

    expect(() => {
      bankAccount.withdraw(20);
    }).toThrow(InsufficientFundsError);

    bankAccount.withdraw(5);

    expect(bankAccount.getBalance()).toBe(5);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(100);
    const anotherBankAccount = getBankAccount(200);

    expect(() => {
      bankAccount.transfer(20, bankAccount);
    }).toThrow(TransferFailedError);

    bankAccount.transfer(20, anotherBankAccount);

    expect(bankAccount.getBalance()).toBe(80);
    expect(anotherBankAccount.getBalance()).toBe(220);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    expect.assertions(1);

    jest
      .spyOn(lodash, 'random')
      .mockImplementationOnce(() => 20)
      .mockImplementationOnce(() => 1);

    const bankAccount = getBankAccount(100);

    const balance = await bankAccount.fetchBalance();

    expect(typeof balance).toEqual('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    expect.assertions(1);

    const bankAccount = getBankAccount(100);

    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(20);

    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toEqual(20);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    expect.assertions(2);
    const bankAccount = getBankAccount(100);

    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);

    await expect(async () => bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );

    // Check that balance didn't change
    expect(bankAccount.getBalance()).toEqual(100);
  });
});
