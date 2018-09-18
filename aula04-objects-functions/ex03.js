'use strict'

'use strict'

function inspect(obj) {
    let str = ''
    for (let prop in obj) {
        // const val = obj.prop // !!!! ALERTA Não existe uma propriedade como nome prop
        const val = obj[prop] // propriedade com nome = valor da variavel prop
        if(val instanceof Function)
            str += prop + '() => ' + val.call(obj) + ', '
        else
            str += val + ', '
    }
    console.log(str)
}

function makePerson(fullname, address) {
    const std = {}
    std.fullname = fullname
    std.address = address
    std.toString = function (){
        return this.fullname + ': ' + this.address
    }
    return std
}

function makeStudent(nr, fullname) {
    const std = {}
    std.nr = nr
    std.fullname = fullname
    return std
}


const nando = makePerson('Nando', 'Rua Amarela')
const nadia = makePerson('Nadia', 'Rua Rosa')

const std1 = makeStudent(86153, 'Maria')
const std2 = makeStudent(8736487, 'Ze Manel')

/*
console.log(nando.toString())
console.log(nadia.toString())
nadia.fullname = 'Alberta'
console.log(nadia.toString())
*/

inspect(nando)
inspect(nadia)
inspect(std1)
inspect(std2)
