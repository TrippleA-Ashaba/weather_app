require("dotenv").config();
const _ = require("lodash");
const axios = require("axios");
const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 4000;
const API_KEY = process.env.API_KEY;

// view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: false }));

app.get("/blog", async (req, res) => {
	axios
		.get("https://jsonplaceholder.typicode.com/posts")
		.then((result) => {
			let objects = result.data;
			data = objects.slice(0, 10);
			console.log(data);
			res.render("blog", data);
		})
		.catch((err) => {
			console.log(err);
		});
});

// app.get("/", (req, res) => {
// 	res.render("index");
// });

// app.post("/", (req, res) => {
// 	let city = _.capitalize(req.body.city);
// 	let country = _.toUpper(req.body.country);
// 	console.log(city, country);
// 	axios
// 		.get(
// 			`http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${API_KEY}`
// 		)
// 		.then((result) => {
// 			let objects = result.data;
// 			let lat = objects[0].lat;
// 			let lon = objects[0].lon;
// 			console.log(lat, lon);

// 			axios
// 				.get(
// 					`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
// 				)
// 				.then((weatherObject) => {
// 					let weatherData = weatherObject.data;
// 					let cityName = weatherData.name;
// 					let countryName = weatherData.sys.country;
// 					let temp = weatherData.main.temp;
// 					let feel = weatherData.main.feels_like;
// 					let max_temp = weatherData.main.temp_max;
// 					let min_temp = weatherData.main.temp_min;
// 					let description = weatherData.weather[0].description;
// 					let icon = weatherData.weather[0].icon;

// 					console.log(
// 						cityName,
// 						countryName,
// 						temp,
// 						feel,
// 						max_temp,
// 						min_temp,
// 						description,
// 						icon
// 					);
// 					res.render("index2");
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 				});
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// });

app.get("/", (req, res) => {
	let city;
	if (req.query.city) city = _.capitalize(req.query.city);
	// let city = _.capitalize(req.body.city);
	let country;
	if (req.query.city) country = _.toUpper(req.query.country);
	// let country = _.toUpper(req.body.country);
	if (city && country) {
		console.log(city, country);
		axios
			.get(
				`http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${API_KEY}`
			)
			.then((result) => {
				let objects = result.data;
				let lat = objects[0].lat;
				let lon = objects[0].lon;
				// console.log(lat, lon);

				axios
					.get(
						`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
					)
					.then((weatherObject) => {
						let weatherData = weatherObject.data;
						let cityName = weatherData.name;
						let countryName = weatherData.sys.country;
						let temp = weatherData.main.temp;
						let feel = weatherData.main.feels_like;
						let max_temp = weatherData.main.temp_max;
						let min_temp = weatherData.main.temp_min;
						let description = _.startCase(weatherData.weather[0].description);
						let icon = weatherData.weather[0].icon;

						// console.log(
						// 	cityName,
						// 	countryName,
						// 	temp,
						// 	feel,
						// 	max_temp,
						// 	min_temp,
						// 	description,
						// 	icon
						// );
						res.render("index", {
							cityName,
							countryName,
							temp,
							feel,
							max_temp,
							min_temp,
							description,
							icon,
						});
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		res.render("index2");
	}
});

app.listen(PORT, console.log(`Listening on port ${PORT}`));
