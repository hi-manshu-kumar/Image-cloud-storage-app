//required dependency
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');

// required files
const postRoute = require("./routes/route");



// create mongo connection

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();  
});

app.set('views' , './view');
app.set('view engine', 'ejs');

app.use("/" , (req, res) => {
    res.send("/ handler");
});

app.use("/post", postRoute);

app.use("/user", (req, res) =>{
    res.send("user handler");
});

app.use(function (req, res, next){
    // res.send("Oops somehting wrong in url");
    next();
});

const port = process.env.PORT || 1234;

app.listen(port, () =>{
    console.log(`--connection open--`);
    console.log(`server running on ${port}`);
});

