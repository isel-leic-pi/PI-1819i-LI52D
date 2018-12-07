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

    it('should search for the Book with author Twain', done => {
        const service = bundles.init(es)
        service
            .searchBook(undefined, 'Twain')
            .then(books => {
                assert.equal(books.length, 10)
                assert.equal(books[1].title, 'Editorial Wild Oats')
                done()
            })
    })

    it('should create a new bundle object and get it and delete it!', async () => {
        const service = bundles.init(es)
        const data = await service.create('action')
        if(!data._id)
            assert.fail('Missing _id on bundle creation')
        const id = data._id
        const bundle = await service.getBundle(id)
        assert.equal(bundle.name, 'action')
        await service.delete(id)
        try{
            await bundle.getBundle(id)
        } catch(err) {
            // It is ok to fail when trying to get a deleted bundle
            return
        }
        // It should not succeed getting the bundle. Otherwise it means that bundle was not removed.
        assert.fail('bundle not deleted')
    })

    it('should create a new bundle object and add it a book!', done => {
        const service = bundles.init(es)
        service
            .create('action')
            .catch((err) => {
                assert.fail(err)
                done()
            })
            .then(data => {
                if(!data._id)
                    assert.fail('Missing _id on bundle creation')
                return data._id
            })
            .then(id => service
                .addBook(id, 'pg2680')
                .then(() => id)
            )
            .catch(() => assert.fail('Book not added to Bundle!!!'))
            .then(id => Promise.all([Promise.resolve(id), service.getBundle(id)]))
            .then(async ([id, bundle]) => {
                assert.equal(bundle.name, 'action')
                assert.equal(bundle.books[0].title, 'Meditations')
                await service.delete(id);
                return id;
            })
            .catch(() => assert.fail('bundle delete failed!'))
            .then(id => service.getBundle(id))
            .then(() => assert.fail('bundle not deleted'))
            .catch(() => done())
    })
})