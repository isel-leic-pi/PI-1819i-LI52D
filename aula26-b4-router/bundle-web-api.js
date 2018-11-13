'use strict'

const parse = require('url').parse

/**
 * @param {WebServer} app With a use() method to add a new route.
 * @param {Bundle} bundles Object of class Bundles with methods: create(), get(), etc
 */
module.exports = (app, bundles) => {
    if(!bundles) 
        throw new Error('You must provide a Bundles instance as second argument')
    app.use(postBundle)
    app.use(getBundle)
    app.use(resourceNotFound)

    /**
     * POST /api/bundle?name=<name> -- insere um novo bundle
     */
    function postBundle(req, res, next) {
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
        }
        next()
    }

    /**
     * GET /api/bundle/<id> -- lê um bundle com o id
     */
    function getBundle(req, res, next) {
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
        }
        next()
    }

    function resourceNotFound(req, res) {
        res.statusCode = 404
        res.end('Resource Not Found')    
    }
}

