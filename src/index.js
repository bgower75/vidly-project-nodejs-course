const express = require('express')
const joi = require("@hapi/joi")
const app = express()
const log = require('../middleware/logger')
//importing middleware to secure app by setting http headers
const helmet = require('helmet')
const genres = require('./routes/genres')
//import debug module - returns a function that needs an argument for the namespace
const debug = require('debug')('app:startup')
//importing middleware to log http requests
const morgan = require('morgan')

app.use(express.json())
app.use(express.urlencoded({ extended: true} )) 
app.use('/api/genres', genres)

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    //call the debugger function to log the console messages
    debug("Morgan enabled");
}

app.use(log)
app.use(helmet())
const port = process.env.PORT || 3002
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})