const fetch = require("node-fetch");
const prompt = require('prompt-sync')();
const personName = prompt('What is your name?');
Promise.all([
	fetch(`https://api.agify.io?name=${personName}`),
	fetch(`https://api.genderize.io?name=${personName}`),
    fetch(`https://api.nationalize.io?name=${personName}`)
]).then(function (responses) {
	// Get a JSON object from each of the responses
	return Promise.all(responses.map(function (response) {
		return response.json();
	}));
}).then(function (data) {
	// Log the data to the console
	// You would do something with both sets of data here
    const dataString = JSON.stringify(data);
	console.log(dataString);
}).catch(function (error) {
	// if there's an error, log it
	console.log(error);
});