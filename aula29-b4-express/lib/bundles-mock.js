'use strict'

const parallel = require('./parallel')

class Bundles {

    constructor(es) {
        this.urlBooks =  `http://${es.host}:${es.port}/${es.books_index}/book/`
        this.urlBundles = `http://${es.host}:${es.port}/${es.bundles_index}/bundle/`
    }

    static init(es) {
        return new Bundles(es)    
    }

    get(id, cb) {
        const bundle = bundles[id]
        if(!bundle) 
            return cb({code: 404})
        cb(null, bundle)
    }
    delete(id, cb) {
        const bundle = bundles[id]
        if(!bundle) 
            return cb({code: 404})
        delete bundles[id]
        cb(null)
    }
    create(name, cb) {
        const bundle = {
            'name' : name,
            'books': []
        }
        const id = count
        bundles[id] = bundle
        count++
        const data = {'_id': id}
        cb(null, data)
    }
    /**
     * 
     * @param {*} id Bundle id
     * @param {*} pgid Book id -- project gutenberg id
     * @param {*} cb callback
     */
    addBook(id, pgid, cb){
        const bundle = bundles[id]
        const book = books[pgid]
        if(!bundle || !book) 
            return cb({code: 404})
        const idx = bundle.books.findIndex(b => b.id == pgid)
        if(idx >= 0) 
            return cb(null)
        bundle.books.push({
            'id': pgid,
            'title': book.title
        })
        cb(null)
    }
}

let count = 1
/**
 * Emulates the bundles index
 */
const bundles = {}
/**
 * Emulates the books index
 */
const books = {
    'pg132': {
        'id': 'pg132',
        'title': 'The Art of War'
    },
    'pg2680': {
        'id': 'pg2680',
        'title': 'Meditations',
    },
    'pg6456': {
        'id': 'pg6456',
        'title': 'Public Opinion'
    }
}

module.exports = Bundles