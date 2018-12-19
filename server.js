require('dotenv').config();

//required dependency
const express = require("express");
const path = require('path');

// required files
const route = require("./routes/route");
const postRoute = require("./routes/post");

// create mongo connection
const {mongoose} = require("./db/mongoose");

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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use("/", route);

app.use("/post", postRoute);

app.use(function (req, res){
    res.status(400).send("Oops somehting wrong in url");
});

const port = process.env.PORT || 1234;

app.listen(port, () =>{
    console.log(`--connection open--`);
    console.log(`server running on ${port}`);
});

