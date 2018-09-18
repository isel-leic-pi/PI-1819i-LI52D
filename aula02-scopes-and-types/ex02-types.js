'use strict'

'use strict'

function makeStudent(nr, name) {
    const std = {}
    std.nr = nr
    std.name = name
    return std
}

const std1 = makeStudent(86153, 'Maria')
let std2 = makeStudent(8736487, 'Ze Manel')

console.log(std2)  // { nr: 8736487, name: "Ze Manel"}
console.log(std1)  // { nr: 86153, name: "Maria"}

console.log(typeof(std1))
console.log(typeof(std2))

std2 = true
console.log(typeof(std2))