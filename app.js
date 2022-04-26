var fetch = require("node-fetch");
var prompt = require('prompt-sync')();
var personName = prompt('What is your name?');

var promiseAge = new Promise(function(resolve, reject) {
  var x =  fetch(`https://api.agify.io?name=${personName}`);
  setTimeout(resolve, 3000, x );
  // resolve(x);
});
var promiseGender = new Promise(function(resolve, reject) {
	var y =  fetch(`https://api.genderize.io?name=${personName}`);
	setTimeout(resolve, 2000, y );
  });

var promiseCountry = new Promise(function(resolve, reject) {
	var z = fetch(`https://api.nationalize.io?name=${personName}`);
	setTimeout(resolve, 1000, z );
  });

  Promise.any([promiseAge, promiseGender,promiseCountry]).then((value) => {
	console.log( "Any:",value);
	// Both resolve, but promise2 is faster
  }).catch((reason) => {
	console.log('Any:', reason);
  });

Promise.race([promiseAge, promiseGender,promiseCountry]).then((value) => {
	console.log("Race:",value);
	// Both resolve, but promise2 is faster
  }).catch((reason) => {
	console.log('Race:', reason);
  });

Promise.all([
	promiseAge,promiseGender,promiseCountry
	
]).then(function (responses) {
	// Get a JSON object from each of the responses
	return Promise.all(responses.map(function (response) {
		return response.json();
	}));
}).then(function (data) {
	// Log the data to the console
	// You would do something with both sets of data here
    const dataString = JSON.stringify(data);
	console.log("All:",dataString);
}).catch(function (error) {
	// if there's an error, log it
	console.log("one of the api is rejected");
});

Promise.allSettled([
	promiseAge,promiseGender,promiseCountry
	
]).then(function (responses) {
	// Get a JSON object from each of the responses
	return Promise.allSettled(responses.map(function (response) {
		return response;
	}));
}).then(function (data) {
	// Log the data to the console
	// You would do something with both sets of data here
    const dataString = JSON.stringify(data);
	console.log("AllSettled:",dataString);
}).catch(function (error) {
	// if there's an error, log it
	console.log("AllSettled:",error);
});



 