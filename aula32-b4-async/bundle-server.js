'use strict'

const http = require('http')
const express = require('express')
const morgan = require('morgan')
const Bundles = require('./lib/bundles-mock')

const es = {
    host: 'localhost',
    port: '9200',
    books_index: 'books',
    bundles_index: 'bundles'
}

const bundles = Bundles.init(es)
const app = express()
app.use(morgan('dev'))
require('./bundle-web-api')(app, bundles)
http
    .createServer(app)
    .listen(3000, () => {
        console.log('HTTP Server listening on port 3000')
    })
