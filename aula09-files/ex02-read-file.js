'use strict'

const fs = require('fs')

if(process.argv.length < 3)
    throw new Error('You must provide a file name!')

const filename = process.argv[2]

fs.readFile(filename, (err, buffer) => {
    // if(err) return // ABAFADOR de Excepções => NUNCA fazer!!!!
    if(err) throw err
    console.log(buffer.toString())
})
