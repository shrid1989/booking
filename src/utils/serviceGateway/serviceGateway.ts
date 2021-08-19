/*
 * Service Gateway Main file.
 * - Use camel case for method names.
 * 
 * Follow this format for methods with single parameter:
 * YOUR-METHOD-NAME: param => {};
 * 
 * Follow this format for methods with multiple parameters:
 * YOUR-METHOD-NAME: (param1, param2) => {};
 */

import { get } from './serviceGateway_helpers';
import { API, COMMON_VARIABLE } from '../constants';

//https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows={number_of_results_required}&solrTerm={search_term}
const serviceGateway = {
  // this service is used to get random jokes by sending get parameters firstname and lastname
  getLocations: data => {
    return get(`${API.GET_PICKUP_LOCATION}&solrRows=${COMMON_VARIABLE.SUGESTIONs_COUNT_DISPLAY}&solrTerm=${data}`);
  }
}
export default serviceGateway
