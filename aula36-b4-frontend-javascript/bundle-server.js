'use strict'

const http = require('http')
const express = require('express')
const morgan = require('morgan')
const Bundles = require('./lib/bundles')
const staticResources = require('./lib/static-resources')

const es = {
    host: 'localhost',
    port: '9200',
    books_index: 'books',
    bundles_index: 'bundles'
}

const bundles = Bundles.init(es)
const app = express()
/**
 * Add middleware
 */
app.use(morgan('dev'))
app.use(express.static('public'))
require('./bundle-web-api')(app, bundles)
/**
 * Start HTTP server
 */
http
    .createServer(app)
    .listen(3000, () => {
        console.log('HTTP Server listening on port 3000')
    })
