const express = require('express');
const app= express();
require('dotenv').config();


// Setting up the view engine
app.set('view engine', 'ejs');

// Route for the home page 
// We would be using Router very soon
app.get('/',(req,res)=>{
    res.render('index.ejs');
});


//Making the server to listen to a port
app.listen(process.env.PORT | 9000,()=>{
    console.log("SERVER STARTED.....");
})