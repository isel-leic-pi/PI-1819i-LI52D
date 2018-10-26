'use strict'

const assert = require('assert')
const bundles = require('./../lib/bundles.js')

describe('Bundles API', () => {

    it('should create a bundles service object!', done => {
        const es = {
            host: 'localhost',
            port: '9200',
            books_index: 'books',
            bundles_index: 'bundles'
        }
        const service = bundles.init(es)
        assert.equal(service.urlBooks, 'http://localhost:9200/books/book/')
        assert.equal(service.urlBundles, 'http://localhost:9200/bundles/bundle/')
        done()
    })

})