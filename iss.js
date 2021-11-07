const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    // inside request callback
    // error can be set if invalid domain, user offline, etc..
    //refactor error callback
    if (error) return callback(error, null); // pass error to callback if error occurs when requesting IP data
    /* if (error) {
      callback(error, null);
      return;
    } */
    
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      // refactor status code callback
      callback(Error(`Status code ${response.statusCode} when fetching IP. Response: ${body}`), null); // Error(...) creates new Error obj we can pass around (here, we pass it back to callback indic that sumthing wrong)
      /* const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null); */
      return;
    }

    const data = JSON.parse(body); // extract IP address
    console.log(data);
    callback(null, data.ip); // pass data trough callback as 2nd arg if no error
  });
};

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */
const fetchCoordsByIP = function(ip, callback) {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }

    const { lat, lon } = JSON.parse(body);
    callback(null, { lat, lon});
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const data = JSON.parse(body);
    const passes = data.response;
    callback(null, passes);
  });
};

module.exports = {
  //fetchMyIP
  //fetchCoordsByIP
  fetchISSFlyOverTimes
};
