'use strict'

const net = require('net')
const EventEmitter = require('events').EventEmitter

StreamJsonParser.prototype = Object.create(EventEmitter.prototype)

const socket = net.connect({'port': 3000})
const parser = new StreamJsonParser(socket)
parser
    .on('message', msg => {
        switch(msg.type){
            case 'watching': 
                onFileWatching(msg)
                break
            case 'changed': 
                onFileChanged(msg)
                break
            default:
                onUnknownMessage(msg)
        }
    })

function StreamJsonParser(socket) {
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

function onFileWatching(msg) {
    console.log('Now watching:' + msg.file)
}

function onFileChanged(msg) {
    const date = new Date(msg.timestamp)
    console.log('File' + msg.file + ' changed: ' + date)
}

function onUnknownMessage(msg) {
    console.log('Unrecognized message type:' + msg.type)    
}