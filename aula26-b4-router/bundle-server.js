'use strict'

const http = require('http')
const express = require('express')
const Bundles = require('./lib/bundles-mock')

const es = {
    host: 'localhost',
    port: '9200',
    books_index: 'books',
    bundles_index: 'bundles'
}

const webServer = express()
const bundles = Bundles.init(es)
require('./bundle-web-api')(webServer, bundles)
const server = http.createServer(webServer)
server.listen(3000)
