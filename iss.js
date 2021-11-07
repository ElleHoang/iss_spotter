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
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null); // Error(...) creates new Error obj we can pass around (here, we pass it back to callback indic that sumthing wrong)
      /* const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null); */
      return;
    }

    const data = JSON.parse(body); // extract IP address
    console.log(data);
    callback(null, data.ip); // pass data trough callback as 2nd arg if no error
  });
};

module.exports = { fetchMyIP };