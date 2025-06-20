// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    throttledGetDataFromApi.cancel();
  });
  test('should create instance with provided base url', async () => {
    // Write your test here
    const spyCreate = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('posts');
    expect(spyCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    const originalModule = jest.requireActual('axios');
    const mockAxiosInstance = {
      ...originalModule,
      get: jest.fn(async () => ({})),
    };
    jest.spyOn(axios, 'create').mockReturnValue(mockAxiosInstance);

    await throttledGetDataFromApi('someData');
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('someData');
  });

  test('should return response data', async () => {
    // Write your test here
    const someData = {
      data: [
        {
          userId: 1,
          id: 1,
          title: 'Lorem ipsum',
          body: 'dolor sit amet',
        },
        {
          userId: 1,
          id: 2,
          title: 'consectetur adipiscing elit',
          body: 'Suspendisse vestibulum quam eget',
        },
      ],
    };
    const originalModule = jest.requireActual('axios');
    const mockAxiosInstance = {
      ...originalModule,
      get: jest.fn(async () => someData),
    };
    jest.spyOn(axios, 'create').mockReturnValue(mockAxiosInstance);
    await expect(throttledGetDataFromApi('someData')).resolves.toBe(
      someData.data,
    );
  });
});
