'use strict'

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

const ok = delay(2000, true)
ok.then(data => { console.log('SUCCEED: ' + data) }) // Chamado passado 2 segs
ok.catch(err => { console.log('FAILED: ' + err) }) // Não vai ser chamado

console.log('Delay begin for ok...')

const fail = delay(2000, false)
    .then(data => console.log('SUCCEED: ' + data)) // Não vai ser chamado
    .catch(err => { console.log('FAILED: ' + err); throw err }) // Chamado passado 2 segs

console.log('Delay begin for fail...')

fwrdPromise(ok)
fwrdPromise(fail)

/**
 * 
 * @param {*} prm is a Promise of a String.
 */
async function fwrdPromise(prm) {
    try{
        const str = await prm // <=> length = prm.get() SEM bloquear
        const nr = str.length
        console.log(nr % 2 == 0)
    }catch(err) {
        console.log('FAILED: ' + err)
    }
}

/*
function fwrdPromise1(prm) {
    prm                          // P<String>
        .then(str => str.length)         // P<Number>
        .then(nr => nr % 2 == 0)              // P<Boolean>
        .then(flag => console.log(flag)) // P<undefined>
        .catch(err => console.log('FAILED: ' + err))
}
*/