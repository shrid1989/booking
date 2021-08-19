let host = 'https://www.rentalcars.com/'; //'http://10.102.72.105';
let port = '';

export const PLACE_TYPE = {
  A: "Airport",
  C: "City",
  T: "Station"
}

export const API = {
  GET_PICKUP_LOCATION: host + port +'FTSAutocomplete.do?solrIndex=fts_en',  
}

export const COMMON_VARIABLE = {
  SUGESTIONs_COUNT_DISPLAY : 6
  
}

const CommonConstants = {
  PLACE_TYPE,
  API,
  COMMON_VARIABLE
};

export default CommonConstants;
