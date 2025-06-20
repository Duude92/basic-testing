// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'node:path';
import fs from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    const timerCallback = () => 'Hello world!';
    const timeoutObject = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(timerCallback, 100);
    expect(timeoutObject).toHaveBeenCalledWith(timerCallback, 100);
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const callback = jest.fn();
    doStuffByTimeout(callback, 100);
    jest.advanceTimersByTime(99);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(2);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    const callback = jest.fn();
    const spyObject = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 100);
    expect(spyObject).toHaveBeenCalledWith(callback, 100);
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    const callback = jest.fn();
    doStuffByInterval(callback, 100);
    jest.advanceTimersByTime(99); // 99
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(2); // 101
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(200); //301
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'somefile.ext';
  test('should call join with pathToFile', async () => {
    // Write your test here
    const joinObject = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(joinObject).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    (fs.existsSync as jest.Mock).mockReturnValueOnce(false);
    await expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    (fs.existsSync as jest.Mock).mockReturnValueOnce(true);
    (readFile as jest.Mock).mockResolvedValue('SomeText');
    await expect(readFileAsynchronously(pathToFile)).resolves.toBe('SomeText');
  });
});
