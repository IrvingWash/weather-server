const request = require('request');

const weatherStackApiKey = 'fdfee650a8cc5f86cdea863e1fbbeba1';
const weatherStackBaseURL = 'http://api.weatherstack.com/'

function forecast(lat, long, callback) {
	const url = `${weatherStackBaseURL}current?access_key=${weatherStackApiKey}&units=m&query=${lat},${long}`;

	request(
		{ url, json: true },
		(error, { body }) => {
			if (error !== null) {
				callback('Unable to connect to WeatherStack');
			} else if (body.error !== undefined) {
				callback(`Error: ${body.error.info}`);
			} else {
				const currentData = body.current;

				callback(
					undefined,
					`${currentData.weather_descriptions[0]}. It is currently ${currentData.temperature} degrees out. There is a ${currentData.precip}% chance of rain.`
				);
			}
		}
	);
}

module.exports = forecast;
