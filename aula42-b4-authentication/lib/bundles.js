'use strict'

const rp = require('request-promise')

class Bundles {

    constructor(es) {
        this.bundlesRefresh = `http://${es.host}:${es.port}/${es.bundles_index}/_refresh`
        this.urlBooks =  `http://${es.host}:${es.port}/${es.books_index}/book/`
        this.urlBundles = `http://${es.host}:${es.port}/${es.bundles_index}/bundle/`
    }

    static init(es) {
        return new Bundles(es)    
    }

    /**
     * E.g. http://localhost:9200/books/_search?q=(authors:Twain)AND(title:Tom)
     * @param {*} title 
     * @param {*} authors 
     */
    searchBook(title, authors){
        if(!authors) authors='*'
        if(!title) title = '*'
        const query = `q=(authors:${authors})AND(title:${title})`
        return rp
            .get(`${this.urlBooks}_search?${query}`)
            .then(body => JSON.parse(body))
            .then(resp => resp.hits.hits.map(b => b._source))
    }

    getBundle(id) {
        return rp
            .get(`${this.urlBundles}${id}`)
            .then(body => JSON.parse(body)._source)
    }
    delete(id) {
        return rp
            .delete(`${this.urlBundles}${id}`)
            .then(body => JSON.parse(body))
    }
    async create(userId, name) {
        const options = {
            'uri': this.urlBundles,
            'json': true,
            'body': { 'user_id': userId, 'name': name, 'books': []}
        }
        const resp = await rp.post(options)
        await rp.post(this.bundlesRefresh)
        return resp
    }

    getAll(userId) {
        const query = `user_id:${userId}`
        const url = `${this.urlBundles}_search?q=${query}`
        return rp
            .get(url)
            .then(body => JSON.parse(body).hits.hits)
            .then(arr => arr.map(item => { return {
                '_id': item._id,
                'name': item._source.name,
                'books': item._source.books
            }}))

    }

    getBook(pgid){
        return rp
            .get(`${this.urlBooks}${pgid}`)
            .then(body => JSON.parse(body)._source)
    }
    addBookToBundle(bundle, book, pgid) {
        const idx = bundle.books.findIndex(b => b.id == pgid)
        if(idx >= 0) return
        bundle.books.push({
            'id': pgid,
            'title': book.title
        })
        return bundle
    }
    updateBundle(bundle, id) {
        if(!bundle) return
        const options = {
            url: `${this.urlBundles}${id}`,
            json: true,
            body: bundle
        }
        return rp.put(options)
    }

    /**
     * @param {*} id Bundle identifier
     * @param {*} pgid Book identifier
     */
    async addBook(id, pgid){
        const [bundle, book] = await Promise.all([
            this.getBundle(id), 
            this.getBook(pgid)
        ])
        this.addBookToBundle(bundle, book, pgid)
        return this.updateBundle(bundle, id)
        /* BEM
        return Promise
            .all([this.getBundle(id), this.getBook(pgid)])
            .then(([bundle, book]) => this.addBookToBundle(bundle, book, pgid))
            .then(bundle => this.updateBundle(bundle, id))
        */
        /** MAL*/
        /*
        const bundle = await this.getBundle(id)
        const book = await this.getBook(pgid)
        this.addBookToBundle(bundle, book, pgid)
        return this.updateBundle(bundle, id)
        */
        /** MAL <=>*/
        /*
        return this
            .getBundle(id)
            .then(bundle => Promise.all(bundle, this.getBook(pgid)))
            .then(([bundle, book]) => this.addBookToBundle(bundle, book, pgid))
            .then(bundle => this.updateBundle(bundle, id))
        */
    }
}

module.exports = Bundles