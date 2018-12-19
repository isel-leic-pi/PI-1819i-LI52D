'use strict'

const http = require('http')
const express = require('express')
const morgan = require('morgan')
const Bundles = require('./lib/bundles')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config.js')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const authWebApi = require('./auth-web-api')
const bundleWebApi = require('./bundle-web-api')

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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(expressSession({secret: 'keyboard cat', resave: false, saveUninitialized: true }))
app.use(webpackMiddleware(webpack(webpackConfig)))
authWebApi(app)
bundleWebApi(app, bundles)
/**
 * Start HTTP server
 */
http
    .createServer(app)
    .listen(3000, () => {
        console.log('HTTP Server listening on port 3000')
    })
