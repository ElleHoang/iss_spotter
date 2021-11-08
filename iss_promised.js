const request = require('request-promise-native');

//fetchMyIP fetch IP address from API, defined to return promise of response
const fetchMyIP = function() {
  
  return request(`https://api.ipify.org?format=json`); // request when called, returns promise & want func to return same promise as JSON string

};

const fetchCoordsByIP = function() {
  
  //takes as input the JSON string of IP and needs to parse the JSON content & then use IP as part of the next API call
  //const ip = JSON.parse(body).ip; // extract ip from it
  return request(`https://freegeoip.app/json/`); // make request to site & return promise from request

};

const fetchISSFlyOverTimes = function (body) {

  const { latitude, longitude }= JSON.parse(body); // input JSON body containing geo data response from site
  // request data from site using provided lat/lon data
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`); // promise of request for fly over data, returned as JSON string

};

const nextISSTimesForMyLocation = function() {
  
  // nextISSTimesForMyLocation chains 3 earlier function calls adn return final result
  return fetchMyIP() // promise for fly over data for user location
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });

}
module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};