/*
 * The SERVICE GATEWAY Helpers file. 
 * Methods which the SERVICE GATEWAY uses internally live here.
 * 
 * Follow this format for methods with single param:
 * export const NAME-OF-METHOD = params => {};
 * 
 * Follow this format for methods with multiple params:
 * export const NAME-OF-METHOD = (param1, param2) => {};
 */

import axios from 'axios';

export const get = endpoint => {
  return axios({
    method: 'GET',
    url: endpoint,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (res) {
      if (res.status < 200 || res.status > 302) {
        // This will handle any errors that aren't network related (network related errors are handled automatically)
        return Promise.reject(new Error('Something Went Wrong!'));
      }
      return res.data;
    })
    .catch(function (error) {
      return error
    });
}

export const post = (endpoint, body) => {
  let data = JSON.stringify(body);
  return axios({
    method: 'POST',
    url: endpoint,
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res:any) {
    if (res.status < 200 || res.status > 302) {
      // This will handle any errors that aren't network related (network related errors are handled automatically)
      return res.json().then(function (body) {
        return Promise.reject(new Error('Something Went Wrong!'))
      })
    }
    return res.data;
  })
    .catch(function (error) {
      if(error.response && error.response.data)
        return error.response.data
      else  
        return error
    });
}
