const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

// Set pug as the view engine
app.set("view engine","pug");

// Set static folder
app.use("/static",express.static("public"));

// Listing on port 3000
app.listen(3000,()=>{
    console.log("The application is running on localhost:3000!");
});

// Main route
app.get("/",(req,res)=>{
    res.render("index", { mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN });
});