'use strict'

const http = require('http')
const parse = require('url').parse

const webServer = new WebServer()
require('./bundle-web-api')(webServer)
const server = http.createServer(webServer.router)
server.listen(3000)

function WebServer() {
    const routes = []

    this.use = (route) => routes.push(route)

    this.router = (req, res) => {
        const url = parse(req.url, true) // retorna um objecto {pathname, query, host}
        const {pathname} = url
        console.log(`${Date()}: ${req.method} request to ${pathname}`)

        for (let index = 0; index < routes.length; index++) {
            const r = routes[index]
            if(r(req, res))
                break
        }
    }
}