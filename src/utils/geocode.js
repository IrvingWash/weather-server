const request = require('request');

const mapBoxPublicKey = 'pk.eyJ1IjoiaXJ2aW5nd2FzaCIsImEiOiJjang1MjVmaG4wZWZsNDNudDR6NmZzOHJkIn0.BKOJEYH93ar1v4oQthnnOA';
const mapBoxBaseURL = 'https://api.mapbox.com/';

function geocode(address, callback) {
	const url = `${mapBoxBaseURL}geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapBoxPublicKey}`;

	request(
		{ url, json: true },
		(error, { body }) => {
			if (error !== null) {
				callback('Unable to connect to MapBox');
			} else if (body.message !== undefined) {
				callback(body.message);
			} else {
				const searchResult = body.features[0];

				callback(
					undefined,
					{
						latitude: searchResult.center[1],
						longitude: searchResult.center[0],
						location: searchResult.place_name,
					}
				);
			}
		}
	);
}

module.exports = geocode;
