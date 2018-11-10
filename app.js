const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to Database
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', () => {
    console.log('connected to database'+ config.database);
});

//On Error Connection
mongoose.connection.on('Error', (err) => {
    console.log('database error: '+ err);
});

const app = express();

const port = 3000;

var users = require('./routes/users');
const jwtVerify = require('./middlewares/jwt-verify');
const accessControl = require('./middlewares/access-control');

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser Middleware
app.use(bodyparser.json());

app.use(jwtVerify);
app.use(accessControl);

app.use('/users', users);


//Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

//Start Server
app.listen(port, () => {
    console.log('Server started on port'+port);
});