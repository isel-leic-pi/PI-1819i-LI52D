'use strict'

require('./../../node_modules/bootstrap/dist/css/bootstrap.css')
const b4index = require('./b4index')
const booksSearch = require('./bookSearch')
const bundles = require('./bundles')

const mainView = require('./../views/main.html')

document.body.innerHTML = mainView
const divMain = document.getElementById('divMain')

window.onload = showView
window.onhashchange = showView

function showView() {
    const path = window.location.hash
    switch(path) {
        case '#b4index':
            b4index(divMain)
            break
        case '#bookSearch':
            booksSearch(divMain)
            break
        case '#bundles':
            bundles(divMain)
            break
        default:
            divMain.innerHTML = 'Resource Not Found!'
    }
    updateNav(path)
}

function updateNav(path) {
    const current = document.querySelector('a.active')
    if(current) current.classList.remove('active')
    const nav = document.getElementById('nav' + path)
    if(!nav) return
    nav.classList.add('active')
}