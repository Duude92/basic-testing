// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import { random } from 'lodash';

const initialMoney = 100500;
let bankAccount = getBankAccount(initialMoney);
let anotherAccount = getBankAccount(0);
jest.mock('lodash', () => {
  return {
    random: jest.fn(() => {}),
  };
});
// jest.spyOn(lodash, 'random').mockImplementation(() => 1);
describe('BankAccount', () => {
  beforeEach(() => {
    bankAccount = getBankAccount(initialMoney);
    anotherAccount = getBankAccount(0);
  });
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });
  test('should create account with initial balance', () => {
    // Write your test here
    expect(bankAccount.getBalance()).toBe(100500);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    expect(() => {
      bankAccount.withdraw(200500);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    expect(() => {
      bankAccount.transfer(200500, anotherAccount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    expect(() => {
      bankAccount.transfer(100, bankAccount);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    // Write your test here
    expect(bankAccount.deposit(100).getBalance()).toBe(100600);
  });

  test('should withdraw money', () => {
    // Write your test here
    expect(bankAccount.withdraw(200).getBalance()).toBe(100300);
  });

  test('should transfer money', () => {
    // Write your test here
    bankAccount.transfer(1000, anotherAccount);
    expect(bankAccount.getBalance()).toBe(99500);
    expect(anotherAccount.getBalance()).toBe(1000);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    (random as jest.Mock)
      .mockReturnValueOnce(200)
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(0);
    await expect(bankAccount.fetchBalance()).resolves.toBe(200);
    await expect(bankAccount.fetchBalance()).resolves.toBe(null);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    (random as jest.Mock).mockReturnValueOnce(200).mockReturnValueOnce(1);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(200);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    (random as jest.Mock).mockReturnValueOnce(100).mockReturnValueOnce(0);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
