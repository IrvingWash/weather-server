const path = require('path');

const express = require('express');
const hbs = require('hbs');

const app = express();

// Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

// Setup views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicDirectoryPath));

app.get(
	'',
	(req, res) => {
		res.render(
			'index',
			{
				title: 'Weather',
				name: 'Wash Irving',
			}
		);
	}
);

app.get(
	'/about',
	(req, res) => {
		res.render(
			'about',
			{
				title: 'About',
				name: 'Wash Irving',
			}
		);
	}
)

app.get(
	'/help',
	(req, res) => {
		res.render(
			'help',
			{
				title: 'Help',
				name: 'Wash Irving',
			}
		);
	}
)

app.get(
	'/weather',
	(req, res) => {
		res.send(
			{
				temperature: 17,
				location: 'Rostov-na-Donu',
			}
		);
	}
);

app.get(
	'/help/*',
	(req, res) => {
		res.render(
			'404',
			{
				title: '404',
				error: 'Help article not found',
				name: 'Wash Irving',
			}
		);
	}
);

app.get(
	'*',
	(req, res) => {
		res.render(
			'404',
			{
				title: '404',
				error: 'Page not found',
				name: 'Wash Irving',
			}
		);
	}
);

app.listen(
	3000,
	() => {
		console.log('Server is up on port 3000');
	}
);
