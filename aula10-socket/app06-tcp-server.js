'use strict'

const net = require('net')
const fs = require('fs')

if(process.argv.length < 3)
    throw new Error('You must provide a file name!')

const filename = process.argv[2]
net
    .createServer(onNewConnection)
    .listen(3000)
console.log('Waiting for connections')

/**
 * Notified whenever a new connection is established.
 * @param {socket} socket 
 */
function onNewConnection(socket) {
    socket.write('Connnection established!\n\r')
    console.log('New connection')
    
    fs.watch(filename, onFileChanged.bind(null, socket))

    socket.on('close', onConnectionClose)
}
/**
 * Notified on file changes.
 * @param {Socket} socket 
 */
function onFileChanged(socket) {
    socket.write('File ' + filename + ' changed at ' + new Date() + '\n\r')
}

function onConnectionClose() {
    console.log('Client closed the connection!')
}