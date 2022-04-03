const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.getElementById('messageOne');
const messageTwo = document.getElementById('messageTwo');

weatherForm.addEventListener('submit', getWeather);

function getWeather(event) {
	event.preventDefault();

	const address = searchInput.value;

	if (address === undefined) {
		console.log('You need to specify an address');

		return;
	}

	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';

	fetch(`http://localhost:3000/weather?address=${address}`)
		.then((response) => {
			response.json()
				.then((data) => {
					if (data.error) {
						messageOne.textContent = data.error;

						clearInput(searchInput);

						return;
					}

					messageOne.textContent = data.location;
					messageTwo.textContent = data.forecastData;

					clearInput(searchInput);
				});
		});
}

function clearInput(input) {
	input.value = '';
}
