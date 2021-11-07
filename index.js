//const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
/*
fetchMyIP((error, ip) => {
  if(error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Return IP: ", ip);
});
*/
fetchCoordsByIP('142.186.103.182', (error, coordinates) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned coordinates: ', coordinates);
});
