'use strict'

const assert = require('assert')
const EventEmitter = require('events').EventEmitter;
const StreamJsonParser = require('./../lib/stream-json-parser')

describe('StreamJsonParser', () => {

    it('should emit a message event from a single data event', done => {
        const stream = new EventEmitter()
        const parser = StreamJsonParser.connect(stream)
        parser.on('message', msg => { 
            assert.equal('bar', msg.foo)
            done()
        })
        stream.emit('data', '{"foo":"bar"}\n\r')
    })

    it('should emit a message event from JSON string split in two data events', done => {
        
    })

    it('should emit 2 message events from a single data event with 2 JSON strings ', done => {
        
    })
})