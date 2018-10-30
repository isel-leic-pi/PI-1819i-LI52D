'use strict'

const parse = require('url').parse
const Bundles = require('./lib/bundles')


module.exports = (app) => {
    app.use(postBundle)
    app.use(getBundle)
    app.use(resourceNotFound)
}

const es = {
    host: 'localhost',
    port: '9200',
    books_index: 'books',
    bundles_index: 'bundles'
}

const bundles = Bundles.init(es)

/**
 * POST /api/bundle?name=<name> -- insere um novo bundle
 */
function postBundle(req, res) {
    const url = parse(req.url, true) // retorna um objecto {pathname, query, host}
    const {pathname, query} = url
    
    if(req.method == 'POST' && pathname == '/api/bundle') {
        const name = query.name
        bundles.create(name, (err, data) => {
            if(err) {
                res.statusCode = err.code
                res.end(err.message + '\n' + err.error)
            } else {
                res.statusCode = 200
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(data))
            }
        })
        return true
    }
    return false
}

/**
 * GET /api/bundle/<id> -- lê um bundle com o id
 */
function getBundle(req, res) {
    const url = parse(req.url, true) // retorna um objecto {pathname, query, host}
    const {pathname} = url

    if(req.method == 'GET' && pathname.indexOf('/api/bundle') >= 0) {
        const id = pathname.split('/').pop()
        bundles.get(id, (err, bundle) => {
            if(err) {
                res.statusCode = err.code
                res.end(err.message + '\n' + err.error)
            } else {
                res.statusCode = 200
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(bundle))
            }
        })
        return true
    }
    return false
}

function resourceNotFound(req, res) {
    res.statusCode = 404
    res.end('Resource Not Found')    
    return true
}