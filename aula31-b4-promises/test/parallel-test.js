'use strict'

const assert = require('assert')

describe('Parallel Function', () => {

    it('should execute all tasks on success', done => {
        const tasks = [
            () => new Promise(resolve => setTimeout(() => resolve('one'), 10)),
            () => new Promise(resolve => setTimeout(() => resolve('two'), 300)),
            () => new Promise(resolve => setTimeout(() => resolve('three'), 200)),
            () => new Promise(resolve => setTimeout(() => resolve('four'), 100))
        ]
        const prms = tasks.map(t => t())
        Promise
            .all(prms)
            .then(results => {
                assert.equal(results[0], 'one')
                assert.equal(results[1], 'two')
                assert.equal(results[2], 'three')
                assert.equal(results[3], 'four')
                done()
            })   
    })

    it('should interrupt on first error', done => {
        const tasks = [
            () => new Promise(resolve => setTimeout(() => resolve('one'), 10)),
            () => new Promise(resolve => setTimeout(() => resolve('two'), 300)),
            () => new Promise((res, reject) => 
                setTimeout(() => reject(Error('three')), 200)),
            () => new Promise(resolve => setTimeout(() => resolve('four'), 100))
        ]
        const prms = tasks.map(t => t())
        Promise
            .all(prms)
            .then(results => {
                assert.equal(results, undefined)
                done()
            })
            .catch(err => {
                assert.equal(err.message, 'three')
                done()
            }) 
    })
})