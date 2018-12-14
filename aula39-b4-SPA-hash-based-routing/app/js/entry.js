'use strict'

require('./../../node_modules/bootstrap/dist/css/bootstrap.css')

const mainView = require('./../views/main.html')

document.body.innerHTML = mainView
const divMain = document.getElementById('divMain')

window.onload = showView
window.onhashchange = showView

function showView() {
    const path = window.location.hash
    switch(path) {
        case '#b4index':
            divMain.innerHTML = require('./../views/b4index.html')
            break
        case '#bookSearch':
            divMain.innerHTML = require('./../views/bookSearch.html')
            break
        case '#bundles':
            divMain.innerHTML = require('./../views/bundles.html')
            break
        default:
            divMain.innerHTML = 'Resource Not Found!'
    }
}