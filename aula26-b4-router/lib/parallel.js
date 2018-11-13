'use strict'


module.exports = parallel

/**
 * 
 * @param {array} tasks Array of void functions with a callback argument.
 * @param {function} cb Callback function.
 */
function parallel(tasks, cb) {
    const results = []
    let count = 0

    tasks.forEach((task, i) => {
        task((err, data) => {
            if (err) return cb(err)
            results[i] = data
            if (++count >= tasks.length)
                cb(null, results)
        })
    })
}