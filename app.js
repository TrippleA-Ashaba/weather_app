require("dotenv").config();
const axios = require("axios");
const express = require("express");
const app = express();
const path = require("path");

PORT = process.env.PORT || 4000;

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

app.get("/", (req, res) => {
	res.render("index");
});

app.post("/", (req, res) => {
	console.log(req.body);
});

app.listen(PORT, console.log(`Listening on port ${PORT}`));
