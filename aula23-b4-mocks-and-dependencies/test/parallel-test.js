'use strict'

const assert = require('assert')
const parallel = require('./../lib/parallel')


describe('Parallel Function', () => {

    it('should execute all tasks on success', done => {
        const tasks = [
            cb => setTimeout(() => cb(null, 'one'), 10),
            cb => setTimeout(() => cb(null, 'two'), 300),
            cb => setTimeout(() => cb(null, 'three'), 200),
            cb => setTimeout(() => cb(null, 'four'), 100)
        ]
        parallel(tasks,(err, results) => {
            assert.equal(results[0], 'one')
            assert.equal(results[1], 'two')
            assert.equal(results[2], 'three')
            assert.equal(results[3], 'four')
            done()
        })   
    })

    it('should interrupt on first error', done => {
        const tasks = [
            cb => setTimeout(() => cb(null, 'one'), 10),
            cb => setTimeout(() => cb(null, 'two'), 300),
            cb => setTimeout(() => cb(new Error('three')), 200),
            cb => setTimeout(() => cb(null, 'four'), 100)
        ]
        parallel(tasks,(err, results) => {
            assert.equal(results, undefined)
            assert.equal(err.message, 'three')
            done()
        })   
    })
})