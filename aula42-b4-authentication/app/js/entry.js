'use strict'

require('./../../node_modules/bootstrap/dist/css/bootstrap.css')
const Handlebars = require('handlebars/dist/handlebars')
const b4index = require('./b4index')
const booksSearch = require('./bookSearch')
const bundles = require('./bundles')
const login = require('./login')

const mainView = require('./../views/main.html')
const navbarView = Handlebars.compile(require('./../views/navbar.hbs'))

document.body.innerHTML = mainView
const divMain = document.getElementById('divMain')
const divNavbar = document.getElementById('divNavbar')

showNavbar()
window.onload = showView
window.onhashchange = showView

function showNavbar() {
    divNavbar.innerHTML = navbarView({auth: false})
}

function showView() {
    const path = window.location.hash
    switch(path) {
        case '#b4index':
            b4index(divMain)
            break
        case '#login':
            login(divMain)
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