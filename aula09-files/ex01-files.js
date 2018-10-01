'use strict'

const fs = require('fs')

if(process.argv.length < 3)
    throw new Error('You must provide a file name!')

const filename = process.argv[2]

fs.watch(filename, () => console.log(filename + ' changed!'))

console.log('Now watching target.txt for changes...')