import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((callback) => callback),
  };
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosClientSpy = jest.spyOn(axios, 'create');

    // Do not perform real request! For this, mock get() method
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: 'do not care about returned value' });

    await throttledGetDataFromApi('do not care about proper relativePath');

    expect(axiosClientSpy).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });

    expect(axiosClientSpy).toHaveBeenCalledTimes(1);
  });

  test('should perform request to correct provided url', async () => {
    const spyGet = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: 'do not care about returned value' });

    await throttledGetDataFromApi('users');

    expect(spyGet).toHaveBeenCalledWith('users');
    expect(spyGet).toHaveBeenCalledTimes(1);
  });

  test('should return response data', async () => {
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({ data: 'response data' });

    const response = await throttledGetDataFromApi('users');

    expect(response).toBe('response data');
  });
});
