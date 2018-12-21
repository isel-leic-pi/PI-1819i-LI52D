'use strict'

require('./../../node_modules/bootstrap/dist/css/bootstrap.css')
require('./../../node_modules/bootstrap/dist/js/bootstrap.js')
const Handlebars = require('handlebars/dist/handlebars')
const util = require('./util')
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
    .then(() => {
        window.onload = showView
        window.onhashchange = showView
        showView()
        util.showAlert('b4app is running', 'success')     
    })

async function showNavbar() {
    const resp = await fetch('/api/auth/session')
    const body = await resp.json() // body => {auth, fullname}
    if(resp.status != 200) {
        util.showAlert(JSON.stringify(body))
    }   
    divNavbar.innerHTML = navbarView(body)
}

function showView() {
    const path = window.location.hash
    switch(path) {
        case '#b4index':
            b4index(divMain)
            break
        case '#login':
            login(divMain, showNavbar)
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