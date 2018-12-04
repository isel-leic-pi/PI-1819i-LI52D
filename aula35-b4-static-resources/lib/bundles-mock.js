'use strict'

class Bundles {

    constructor(es) {
        this.urlBooks =  `http://${es.host}:${es.port}/${es.books_index}/book/`
        this.urlBundles = `http://${es.host}:${es.port}/${es.bundles_index}/bundle/`
    }

    static init(es) {
        return new Bundles(es)    
    }

    getBundle(id) {
        /* !!!! DESNECESSÁRIO !!!! => Implementação síncrona
        return new Promise((resolve, reject) =>{
            const bundle = bundles[id]
            if(!bundle) 
                return reject({statusCode: 404})
            resolve(bundle)
        })
        */
        const bundle = bundles[id]
        if(!bundle) 
            return Promise.reject({statusCode: 404})
        return Promise.resolve(bundle)
    }
    delete(id) {
        const bundle = bundles[id]
        if(!bundle) 
            return Promise.reject({statusCode: 404})
        delete bundles[id]
        return Promise.resolve()
    }
    create(name) {
        const bundle = {
            'name' : name,
            'books': []
        }
        const id = count
        bundles[id] = bundle
        count++
        const data = {'_id': id}
        return Promise.resolve(data)
    }
    /**
     * 
     * @param {*} id Bundle id
     * @param {*} pgid Book id -- project gutenberg id
     */
    addBook(id, pgid){
        const bundle = bundles[id]
        const book = books[pgid]
        if(!bundle || !book) 
            return Promise.reject({statusCode: 404})
        const idx = bundle.books.findIndex(b => b.id == pgid)
        if(idx >= 0) 
            return Promise.resolve()
        bundle.books.push({
            'id': pgid,
            'title': book.title
        })
        return Promise.resolve()
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