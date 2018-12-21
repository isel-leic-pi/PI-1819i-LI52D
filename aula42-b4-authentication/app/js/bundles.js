'use strict'

const Handlebars = require('handlebars/dist/handlebars')
const bundlesCreateTemplate = require('./../views/bundlesCreate.hbs')
const bundlesListTemplate = require('./../views/bundlesList.hbs')
const bundlesCreateView = Handlebars.compile(bundlesCreateTemplate)
const bundlesListView = Handlebars.compile(bundlesListTemplate)


module.exports = (divMain) => {
    divMain.innerHTML = bundlesCreateView() + bundlesListView()
}