// imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();


// databse connection
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/node_crud');
}

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//routes prefix
app.use("", require('./routes/routes'));


//error handling
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send(error.message);
});


let port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("working on port 5000")
})