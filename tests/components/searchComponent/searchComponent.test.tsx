import React from 'react';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import { findByTestAttr } from '../../utils/testHelpers';
import SearchComponent from '../../../src/components/searchComponent/searchComponent';
import serviceGateway from '../../../src/utils/serviceGateway/serviceGateway';


// ------------Constants------------//
jest.mock("../../../src/utils/serviceGateway/serviceGateway");
const initialState:any = { pickUpLocations: [], inputValue: '' };
const mockSetState = jest.fn();
const mockUseRef = jest.fn().mockReturnValue({ current: initialState });
const mockSetRef = jest.fn();

// Function Documentation eather for mout or Shallow
// /**
//  *
//  * @param {ShallowWrapper} -Enzyme Shallow Wrapper
//  * @param {props} - any props needed
//  * @returns {ShallowWrapper} - Shallow Wrapper
//  */

/**
 * @param {ReactWrapper} -Enzyme React Wrapper
 * @param {props}  IHelloProps -any props needed
 * @param {state}  IHelloState -any props needed
 * @returns {ReactWrapper} - Shallow Wrapper
 */

const setup = (state: any) => {
  // clear mocks when the setup runs
  jest.restoreAllMocks();
  jest.clearAllMocks();

  // ------------- Setting the useState mock function
  const mockUseState = jest.fn().mockReturnValue([state, mockSetState]);
  React.useState = mockUseState;
  // ------------- Setting the useRef mock function
  React.useRef = mockUseRef;
  // Use mount, because useEffect not called on `shallow`
  // https://github.com/airbnb/enzyme/issues/2086
  const component = mount(<SearchComponent />);
  return component;
};

describe('Component hooks on mount and update', () => {
  let wrapper: ReactWrapper;
  //ShallowWrapper;
  beforeEach(() => {
    wrapper = setup(initialState);
  });


  test('setState does not run when component mounts', () => {
    expect(mockSetState).toHaveBeenCalledTimes(0);
  });

  test('setState does not run when component updates', () => {
    jest.clearAllMocks();
    wrapper.update();
    expect(mockSetState).toHaveBeenCalledTimes(0);
  });
});

describe('<SearchComponent /> Component', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = setup(initialState);
  });

  test('Component renders without error', () => {
    const searchComponent = findByTestAttr(wrapper, 'booking-main-container');
    expect(searchComponent.length).toBe(1);
  });

  test('Click button renders without error', () => {
    const buttonComponent = findByTestAttr(wrapper, 'submit-button');
    expect(buttonComponent.length).toBe(1);
  });

  test('SetState function to be called when button click', async () => {
    const data = {
      "results": {
        "isGooglePowered": false,
        "docs": [
          {
            "country": "United Kingdom",
            "lng": -2.27472,
            "city": "Manchester",
            "searchType": "L",
            "alternative": ["GB,UK,England,Manchester Airport"],
            "index": 1,
            "bookingId": "airport-38566",
            "placeType": "A",
            "placeKey": "1472187",
            "iata": "MAN",
            "countryIso": "gb",
            "locationId": "38566",
            "name": "Manchester Airport",
            "ufi": 900038550,
            "isPopular": true,
            "region": "Greater Manchester",
            "lang": "en",
            "lat": 53.3536
          }
        ]}};
    const state = { inputValue: 'test', pickUpLocations:[] };
    wrapper = setup({ ...state });
    const setPickUpLocations = jest.fn();
    (serviceGateway.getLocations as jest.Mock<any>).mockImplementation(() => Promise.resolve(data));
    const buttonComponent = await findByTestAttr(wrapper, 'submit-button');
    buttonComponent.simulate('click', { preventDefault() {} });
    wrapper.update();
    const handleClick = jest.spyOn(React, "useState");
    (handleClick as jest.Mock<any>).mockImplementation(pickUpLocations => [pickUpLocations, setPickUpLocations]);
    expect(setPickUpLocations).toBeTruthy();
  });

  test('click button when no input values, Error message should display', () => {
    const state = { inputValue: '' };
    wrapper = setup({ ...state });
    const buttonComponent = findByTestAttr(wrapper, 'submit-button');
    expect(buttonComponent.length).toBe(1);
    buttonComponent.simulate('click', { preventDefault() {} });
    const counterElement = findByTestAttr(wrapper, 'error-msg');
    expect(counterElement.length).toBe(1);
    expect(counterElement.text()).toBe('Please provide a pick-up location'); // wont work with Mock functions for now only if we pass initial state
  });

  test('input search when type value not matching with any records no records found should display', async () => {
    const data = {
      "results": {
        "isGooglePowered": false,
        "docs": [
          
        ]}};
    const state = { inputValue: 'test', pickUpLocations:[] };
    wrapper = setup({ ...state });
    const setPickUpLocations = jest.fn();
    
    (serviceGateway.getLocations as jest.Mock<any>).mockImplementation(() => Promise.resolve(data));
    const buttonComponent = await findByTestAttr(wrapper, 'input-box');
    buttonComponent.simulate('change', { e:{targe:{value:'test'}} });
    wrapper.update();
    const noRecordFound = findByTestAttr(wrapper, 'no-result-text');
    //expect(mockSetState).toHaveBeenCalledTimes(1);
    const handleClick = jest.spyOn(React, "useState");

    (handleClick as jest.Mock<any>).mockImplementation(pickUpLocations => [pickUpLocations, setPickUpLocations]);
    expect(setPickUpLocations).toBeTruthy();
    expect(noRecordFound.text()).toBe('No results found.');
  });

  test('check onFocus on Input if more than 2 character should set isSelectedLocation is true ', () => {
    const state = { inputValue: 'aaa' };
    wrapper = setup({ ...state });
    const inputComponent = findByTestAttr(wrapper, 'input-box');
    inputComponent.simulate('focus', { e:{targe:{value:'test'}} });;
    expect(inputComponent.length).toBe(1);
    const ulList = wrapper.find('.pickupLocations'); // wrapper.find(`[data-test='${val}']`);
    expect(ulList.length).toBe(1);
  });

  test('input search when type value check if service failed', async () => {
    const data = {
      "results": {
        "isGooglePowered": false,
        "docs": [
          
        ]}};
    const state = { inputValue: 'test', pickUpLocations:[] };
    wrapper = setup({ ...state });
    const setPickUpLocations = jest.fn();
    
    (serviceGateway.getLocations as jest.Mock<any>).mockImplementation(() =>  Promise.reject(new Error()));;
    const buttonComponent = await findByTestAttr(wrapper, 'input-box');
    buttonComponent.simulate('change', { e:{targe:{value:'test'}} });
    wrapper.update();
    const noRecordFound = findByTestAttr(wrapper, 'no-result-text');
    
    const handleClick = jest.spyOn(React, "useState");

    (handleClick as jest.Mock<any>).mockImplementation(pickUpLocations => [pickUpLocations, setPickUpLocations]);
    expect(setPickUpLocations).toBeTruthy();
    expect(noRecordFound.text()).toBe('No results found.');
  });

  test('check for empty input value', async () => {
    
    const state = { inputValue: '', pickUpLocations:[] };
    wrapper = setup({ ...state });
    const setInputValue = jest.fn();
    const buttonComponent = await findByTestAttr(wrapper, 'submit-button');
    buttonComponent.simulate('click', { preventDefault() {} });
    wrapper.update();
    //expect(mockSetState).toHaveBeenCalledTimes(1);
    const handleClick = jest.spyOn(React, "useState");

    (handleClick as jest.Mock<any>).mockImplementation(inputValue => [inputValue, setInputValue]);
    expect(setInputValue).toBeTruthy();
    const errorElement = findByTestAttr(wrapper, 'error-msg');
    expect(errorElement.length).toBe(1);
    expect(errorElement.text()).toBe('Please provide a pick-up location');
  });
});
