'use strict'

const net = require('net')
const StreamJsonParser = require('./lib/stream-json-parser.js')

const socket = net.connect({'port': 3000})
StreamJsonParser
    .connect(socket)
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

function onFileWatching(msg) {
    console.log('Now watching:' + msg.file)
}

function onFileChanged(msg) {
    const date = new Date(msg.timestamp)
    console.log('File ' + msg.file + ' changed: ' + date)
}

function onUnknownMessage(msg) {
    console.log('Unrecognized message type:' + msg.type)    
}