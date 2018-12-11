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
            .then(books => searchResults(books))
            .then(view => divResults.innerHTML = view)
    }

    const searchResults = Handlebars.compile(`
        <table>
            <thead>
            <tr>            
                <th>Tile</th>
                <th>Authors</th>
                <th>Subjects</th>
            </tr>
            <body>
                {{#each .}}
                    <tr>
                        <td>{{title}}</td>
                        <td>{{authors}}</td>
                        <td>{{subjects}}</td>
                    </tr>
                {{/each}}
            </body>
            </thead>
        </table>
    `)
}
