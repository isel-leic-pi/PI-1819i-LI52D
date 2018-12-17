'use strict'

const Handlebars = require('handlebars/dist/handlebars')
const bookSearchView = require('./../views/bookSearch.html')
const bookSearchResultsTemplate = require('./../views/bookSearchResults.hbs')
const searchResults = Handlebars.compile(bookSearchResultsTemplate)

module.exports = (divMain) => {
    divMain.innerHTML = bookSearchView

    document
        .getElementById('buttonSearch')
        .addEventListener('click', bookSearch)

    const inputTitle = document.getElementById('inputTitle')
    const inputAuthors = document.getElementById('inputAuthors')
    const divResults = document.getElementById('divResults')

    function bookSearch(ev) {
        ev.preventDefault()
        fetch(`http://localhost:3000/api/book/search?title=${inputTitle.value}&authors=${inputAuthors.value}`)
            .then(resp => resp.json())
            .then(books => searchResults(books))
            .then(view => divResults.innerHTML = view)
    }
}