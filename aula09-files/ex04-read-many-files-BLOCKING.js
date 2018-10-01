'use strict'

const fs = require('fs')

if(process.argv.length < 3)
    throw new Error('You must provide a file name!')

for (let index = 2; index < process.argv.length; index++) {
    const filename = process.argv[index]
    console.log('Reading ' + filename)
    const buffer = fs.readFileSync(filename)
    console.log('########## ' + filename + ':')
    console.log(buffer.toString())
}
