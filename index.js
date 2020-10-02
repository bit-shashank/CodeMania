const express = require("express");
const path = require('path');
const app = express();
var compile = require("./judge/compile");
require("dotenv").config();

// setting the public static folder
app.use(express.static(path.join(__dirname)));

// Setting up the view engine
app.set("view engine", "ejs");

// Route for the home page

// We would be using Router very soon
app.get("/", (req, res) => {
	res.render(path.join(__dirname+"/views/editor.ejs"));
});

//Making the server to listen to a port
app.listen(process.env.PORT || 80, () => {
	console.log("SERVER STARTED.....");
});
