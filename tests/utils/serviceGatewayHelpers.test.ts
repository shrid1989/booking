import axios from 'axios';
import { get, post } from '../../src/utils/serviceGateway/serviceGateway_helpers';

jest.mock('axios');

describe('Test suite for Service Gateway Helpers', () => {

  const mockEndPoint = '/some-endpoint';
  describe('Test suite for post method', () => {
    it('Test to check when status is less than 200', async () => {
      const response = {
        status: 199,
        json: () => Promise.resolve({
          error: {
            message: 'Something Went Wrong!',
          },
        }),
      };
      (axios as unknown as jest.Mock<any, any>).mockImplementation(() => Promise.resolve(response));
      const endPoint = mockEndPoint;
      const body = {
        
      };
      const data =  await post(endPoint, body);
      const errorMessage = 'Something Went Wrong!'
      expect(data).toEqual(new Error(errorMessage));
    });
  
    it('Test to check returned data when status is 200', async () => {
      const mockData = {
        testKey: 'testValue',
      };
      const response = {
        status: 200,
        data: mockData,
      };
      (axios as unknown as jest.Mock<any, any>).mockImplementation(() => Promise.resolve(response));
      const endPoint = mockEndPoint;
      const body = {
       
      };
      const data =  await post(endPoint, body);
      expect(data).toEqual(mockData);
    });
  
    it('Test to check failure scenario of gateway', async () => {
      const errorMessage = 'Bad gateway';
      const mockErrorData = {
        error: errorMessage,
      };
      const error = {
        response: {
          data: mockErrorData,
        },
      };
      (axios as unknown as jest.Mock<any, any>).mockImplementation(() => Promise.reject(error));
      const endPoint = mockEndPoint;
      const body = {
       
      };
      const returnedData =  await post(endPoint, body);
      expect(returnedData).toEqual(mockErrorData);
    });
  });
  
  describe('Test suite for get method', () => {
    const mockData = {
      testKey: 'testValue',
    };

    it('Test to check returned data when status is 100', async () => {
      const response = {
        status: 100,
        data: mockData,
      };
      (axios as unknown as jest.Mock<any, any>).mockImplementation(() => Promise.resolve(response));
      const endPoint = mockEndPoint;
      const data =  await get(endPoint);
      expect(data).toEqual(new Error('Something Went Wrong!'));
    });

    it('Test to check returned data when status is 200', async () => {
      const response = {
        status: 200,
        data: mockData,
      };
      (axios as unknown as jest.Mock<any, any>).mockImplementation(() => Promise.resolve(response));
      const endPoint = mockEndPoint;
      const data =  await get(endPoint);
      expect(data).toEqual(mockData);
    });
  });
});