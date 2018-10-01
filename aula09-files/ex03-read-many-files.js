'use strict'

const fs = require('fs')

if(process.argv.length < 3)
    throw new Error('You must provide a file name!')

process
    .argv
    .slice(2)
    .forEach(filename => {
        console.log('Reading ' + filename)
        fs.readFile(filename, (err, buffer) => {
            if(err) throw err
            console.log('########## ' + filename + ':')
            console.log(buffer.toString())        
        })
    })