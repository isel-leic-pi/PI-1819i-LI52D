'use strict'


function makeStudent(nr, name) {
    // std = {} // !!!! std NÃO é local
    const std = {}
    std.nr = nr
    std.name = name
    return std
}

const std = makeStudent(86153, 'Maria')
const std2 = makeStudent(8736487, 'Ze Manel')

console.log(std2) // { nr: 8736487, name: "Ze Manel"}
console.log(std)  // { nr: 86153, name: "Maria"}