'use strict'

const EventEmitter = require('events').EventEmitter

class StreamJsonParser extends EventEmitter {
    constructor(socket) {
        super() // Chamada ao construtor da base
        let buffer = ''
        socket.on('data', data => {
            buffer += data
            let boundary = buffer.indexOf('\n\r')
            while (boundary !== -1) {
                const input = buffer.substring(0, boundary)
                buffer = buffer.substring(boundary + 2)
                this.emit('message', JSON.parse(input))
                boundary = buffer.indexOf('\n\r')
            }
        })
    }
    foo() { } // <=> Fora: StreamJsonParser.prototype.foo = function() {}
    static bar() { } // <=> StreamJsonParser.bar = function() {}
    static connect(socket) {
        return new StreamJsonParser(socket)
    }
}

/*
StreamJsonParser.prototype = Object.create(EventEmitter.prototype)

function StreamJsonParser(socket) {
    EventEmitter.call(this) // Chamada ao construtor da base
    let buffer = ''
    socket.on('data', data => {
        buffer += data
        let boundary = buffer.indexOf('\n\r')
        while (boundary !== -1) {
            const input = buffer.substring(0, boundary)
            buffer = buffer.substring(boundary + 2)
            this.emit('message', JSON.parse(input))
            boundary = buffer.indexOf('\n\r')
        }
    })
}

StreamJsonParser.connect = function(socket) {
    return new StreamJsonParser(socket)
}
*/

module.exports = StreamJsonParser