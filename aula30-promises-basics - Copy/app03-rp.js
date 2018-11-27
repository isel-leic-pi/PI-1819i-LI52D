'use strict'

const rp = require('request-promise')


delay(2000, true) // P<String>
    .then(msg => getStatusCode('http://www.github.com')) // P<Number>
    .then(nr => console.log(nr))

delay(2000, true) // P<String>
    .then(msg => getStatusCode('http://www.github.com/kjadhkfhdkhfa')) // P<Number>
    .then(nr => console.log(nr))


function getStatusCode(uri) {
    return rp
        .get(uri) 
        .then(body => 200)
        .catch(err => err.statusCode)
}

function delay(timeout, success) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(success)
                resolve(`DELAYED by ${timeout} ms`)
            else 
                reject(`REJECTED after ${timeout} ms`)
        }, timeout)
    })
}
