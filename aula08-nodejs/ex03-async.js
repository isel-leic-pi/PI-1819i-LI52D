'use strict'

let stop = false

setTimeout(() => stop = true, 1000)

checkStop()

function checkStop(){
    console.log('Waiting...')
    if(!stop) 
        setTimeout(checkStop, 10)
}
