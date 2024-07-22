

// Patches
const {inject, errorHandler} = require('express-custom-error');
inject(); // Patch express in order to use async / await syntax

// Require Dependencies

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const helmet = require('helmet');


const logger = require('./util/logger.js');
const connectDB = require('../src/config/db.js');
const blogRouter = require('../src/routes/blogRoutes.js');

// Load .env Enviroment Variables to process.env

require('mandatoryenv').load(['DB_URL','PORT','SECRET']);

const { PORT } = process.env;

// Instantiate an Express Application
const app = express();


// Configure Express App Instance
app.use(express.json( { limit: '50mb' } ));
app.use(express.urlencoded( { extended: true, limit: '10mb' } ));

// Configure custom logger middleware
app.use(logger.dev, logger.combined);

app.use(cookieParser());
app.use(cors());

// This middleware adds the json header to every response
// app.use('*', (req, res, next) => {
//     res.setHeader('Content-Type', 'application/json');
//     next();
// })

// Assign Routes

connectDB();

app.use('/api', blogRouter);

app.get('/',(req,res)=>{
    res.json({message:"hello saurav"})
});


// Handle errors
app.use(errorHandler());

// Handle not valid route
app.use('*', (req, res) => {
    res.status(404).json( {status: false, message: 'Endpoint Not Found'} );
})

// Open Server on selected Port
app.listen(
    PORT,
    () => console.info('Server listening on port', PORT)
);