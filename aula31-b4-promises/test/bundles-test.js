'use strict'

const assert = require('assert')
const bundles = require('./../lib/bundles.js')

const es = {
    host: 'localhost',
    port: '9200',
    books_index: 'books',
    bundles_index: 'bundles'
}

describe('Bundles API', () => {

    it('should create a bundles service object!', done => {
        const service = bundles.init(es)
        assert.equal(service.urlBooks, 'http://localhost:9200/books/book/')
        assert.equal(service.urlBundles, 'http://localhost:9200/bundles/bundle/')
        done()
    })

    it('should create a new bundle object and get it and delete it!', done => {
        const service = bundles.init(es)
        service
            .create('action')
            .then(data => {
                if(!data._id)
                    assert.fail('Missing _id on bundle creation')
                const id = data._id
                return Promise.all([ // P<[String, Bundle]>
                    Promise.resolve(id), 
                    service.get(id)]) 
            })
            .then(([id, bundle]) => {
                assert.equal(bundle.name, 'action')
                return service.delete(id).then(id)
            })
            .catch(() => {
                assert.fail('bundle delete failed!')
                done()
            })
            .then(id => service.get(id))
            .then(() => {
                assert.fail('bundle not deleted')
                done()
            })
            .catch(() => done())
    })
    it('should create a new bundle object and add it a book!', done => {
        const service = bundles.init(es)
        service.create('action', (err, data) => {
            if(!data._id)
                assert.fail('Missing _id on bundle creation')
            const id = data._id
            service.addBook(id, 'pg2680', (err) => {
                service.get(id, (err, bundle) => {
                    assert.equal(bundle.name, 'action')
                    assert.equal(bundle.books[0].title, 'Meditations')
                    service.delete(id, (err) => {
                        if(err) assert.fail('bundle delete failed!')
                        service.get(id, (err) => {
                            if(!err) assert.fail('bundle not deleted')
                            done()
                        })
                    })
                })            
            })
        })
    })
})