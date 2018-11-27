'use strict'

const rp = require('request-promise')

class Bundles {

    constructor(es) {
        this.urlBooks =  `http://${es.host}:${es.port}/${es.books_index}/book/`
        this.urlBundles = `http://${es.host}:${es.port}/${es.bundles_index}/bundle/`
    }

    static init(es) {
        return new Bundles(es)    
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
    create(name) {
        const options = {
            url: `${this.urlBundles}`,
            json: true,
            body: { 'name': name, 'books': [] }
        }
        return rp
            .post(options)
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
    addBook(id, pgid){
        return Promise
            .all([this.getBundle(id), this.getBook(pgid)])
            .then(([bundle, book]) => this.addBookToBundle(bundle, book, pgid))
            .then(bundle => this.updateBundle(bundle, id))
    }
}

module.exports = Bundles