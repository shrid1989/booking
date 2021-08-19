import serviceGateway from '../../src/utils/serviceGateway/serviceGateway';
import { get } from '../../src/utils/serviceGateway/serviceGateway_helpers';
import { API, COMMON_VARIABLE } from '../../src/utils/constants';

jest.mock('../../src/utils/serviceGateway/serviceGateway_helpers');

describe('Test suite for Service Gateway methods', () => {
  const {
    getLocations,
  } = serviceGateway;



  it('Test to check getLocations works properly', () => {
    const inputValue = 'test'
    getLocations(inputValue);
    expect(get).toHaveBeenCalledWith(API.GET_PICKUP_LOCATION+'&solrRows='+COMMON_VARIABLE.SUGESTIONs_COUNT_DISPLAY+'&solrTerm='+inputValue);
  });
});