'use strict'

window.onload = () => {
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
            .then(books => searchResults(books[0]))
            .then(view => divResults.innerHTML = view)
    }

    function searchResults(book) {
        const {title, authors, subjects} = book
        return `
            <ul class="list-group">
                <li class="list-group-item">Title: ${title}</li>
                <li class="list-group-item">Authors: ${authors}</li>
                <li class="list-group-item">Subjects: ${subjects}</li>
            </ul>
        `
    }
}
