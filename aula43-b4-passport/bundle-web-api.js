'use strict'

/**
 * @param {WebServer} app With a use() method to add a new route.
 * @param {Bundle} bundles Object of class Bundles with methods: create(), get(), etc
 */
module.exports = (app, bundles) => {
    if(!bundles) 
        throw new Error('You must provide a Bundles instance as second argument')
    app.post('/api/bundle', postBundle)
    app.get('/api/bundle', getBundles)
    app.get('/api/bundle/:bundleId', getBundle)
    app.get('/api/book/search', bookSearch)
    app.use(resourceNotFound)
    app.use(errorHandler)

    /**
     * GET /api/book/search?title=<title>&authors=<authors>
     */
    function bookSearch(req, resp, next) {
        const title = req.query.title
        const authors = req.query.authors
        bundles
            .searchBook(title, authors)
            .then(books => resp.json(books))
            .catch(next)
    }

    /**
     * POST /api/bundle?name=<name> -- insere um novo bundle
     */
    function postBundle(req, res, next) {
        if(!req.user || !req.user._id)
            next({'statusCode': 401, err: 'Unauthenticated user cannot create bundles!'})
        const name = req.body.name
        const userId = req.user._id
        bundles
            .create(userId, name)
            .catch(err => next(err))
            .then(data => res.status(200).json(data))
    }
    function getBundles(req, resp, next) {
        const userId = req.user ? req.user._id : undefined
        bundles
            .getAll(userId)
            .then(data => resp.json(data))
            .catch(next)
    }
    /**
     * GET /api/bundle/<id> -- lê um bundle com o id
     */
    async function getBundle(req, res, next) {
        try{
            const bundle = await bundles.getBundle(req.params.bundleId)
            res.json(bundle)
        } catch(err) {
            next(err)
        }
    }

    function resourceNotFound(req, res, next) {
        next({
            'statusCode': 404,
            'message': 'Resource Not Found'
        })
    }

    function errorHandler(err, req, res, next) {
        res.statusCode = err.statusCode || 500
        const error = err instanceof Error
            ? { 'message': err.message, 'stack': err.stack}
            : err
        res.json(error)
    }
}

