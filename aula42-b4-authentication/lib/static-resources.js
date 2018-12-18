'use strict'

const fs = require('fs')

module.exports = mwStaticResources

/**
 * If the request path contains a dot (.) then it looks for
 * a file in path and if exists sends its content to response.
 * 
 * @param {*} path Location of static resources
 */
function mwStaticResources(path){
    return (req, res, next) => {
        if(req.path.indexOf('.') < 0)
            return next()
        const filename = path + req.path
        fs.stat(filename, err => {
            if(err) return next()
            const ext = req.path.split('.').pop()
            if(ext == 'html' || ext == 'css')
                res.setHeader('Content-Type', 'text/' + ext)
            else
                res.setHeader('Content-Type', 'image/' + ext)
            fs
                .createReadStream(filename)
                .pipe(res)
        })
    }
}