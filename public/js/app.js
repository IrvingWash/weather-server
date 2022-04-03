const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');

weatherForm.addEventListener('submit', getWeather);

function getWeather(event) {
	event.preventDefault();

	const address = searchInput.value;

	if (address === undefined) {
		console.log('You need to specify an address');

		return;
	}

	fetch(`http://localhost:3000/weather?address=${address}`)
		.then((response) => {
			response.json()
				.then((data) => {
					if (data.error) {
						console.log(data.error);

						searchInput.value = '';

						return;
					}

					console.log(data.location);
					console.log(data.forecastData);

					searchInput.value = '';
				});
		});
}
