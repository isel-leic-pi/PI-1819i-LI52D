'use strict'

/**
 * @param {WebServer} app With a use() method to add a new route.
 * @param {Bundle} bundles Object of class Bundles with methods: create(), get(), etc
 */
module.exports = (app, bundles) => {
    if(!bundles) 
        throw new Error('You must provide a Bundles instance as second argument')
    app.post('/api/bundle', postBundle)
    app.get('/api/bundle/:bundleId', getBundle)
    app.use(resourceNotFound)
    app.use(errorHandler)

    /**
     * POST /api/bundle?name=<name> -- insere um novo bundle
     */
    function postBundle(req, res, next) {
        const name = req.query.name
        bundles.create(name, (err, data) => {
            if(err) return next(err)
            res
                .status(201)
                .json(data)
        })
    }

    /**
     * GET /api/bundle/<id> -- lê um bundle com o id
     */
    function getBundle(req, res, next) {
        bundles.get(req.params.bundleId, (err, bundle) => {
            if(err) return next(err)
            res.json(bundle)
        })
    }

    function resourceNotFound(req, res, next) {
        next({
            'code': 404,
            'message': 'Resource Not Found'
        })
    }

    function errorHandler(err, req, res, next) {
        res.statusCode = err.code
        res.json(err)
    }
}

