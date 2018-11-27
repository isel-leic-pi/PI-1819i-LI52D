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

    get(id) {
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
    addBook(id, pgid, cb){
        const tasks = []
        tasks[0] = (cb) => {
            this.get(id, (err, bundle) => {
                if(err) cb(err)
                else cb(null, bundle)
            })
        }
        tasks[1] = (cb) => {
            const url = `${this.urlBooks}${pgid}`
            rp.get(url, (err, res, body) => {
                if(!checkError(200, cb, err, res, body)) {
                    const book = JSON.parse(body)._source
                    cb(null, book)
                }
            })
        }
        parallel(tasks, (err, [bundle, book]) => {
            if(err)  return cb(err)
            const idx = bundle.books.findIndex(b => b.id == pgid)
            if(idx >= 0) 
                return cb(null)
            bundle.books.push({
                'id': pgid,
                'title': book.title
            })
            const options = {
                url: `${this.urlBundles}${id}`,
                json: true,
                body: bundle
            }
            rp.put(options, (err, res, body) => {
                if(!checkError(200, cb, err, res, body)) {
                    cb(null, body)
                }
            })
        })
    }
}

function checkError(statusCode, cb, err, res, body) {
    if(err) {
        cb(err)
        return true
    }
    if(res.statusCode != statusCode) {
        cb({
            code: res.statusCode,
            message: res.statusMessage,
            error: body
        })
        return true
    }
    return false
}

module.exports = Bundles