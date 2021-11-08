const { nextISSTimesForMyLocation } = require('./iss_promised');
/*
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss_promised'); // require from iss_promised

// moved to nextISSTimesForMyLocation to be called
// call function fetchMyIP
fetchMyIP() //function returns promise
  .then(fetchCoordsByIP) // provide fetchCoordsByIP as callback so it's next thing to run after fetchMyIP
  .then(fetchISSFlyOverTimes)
  .then(body => console.log(body)); // then take in callback which accepts reponse body & prints to screen
*/

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

// call nextISSTimesForMyLocation
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  /*.catch((error) => {
    console.log("It didn't work: ", error.message);
  });
  */