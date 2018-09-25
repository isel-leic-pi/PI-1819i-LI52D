'use strict'

function Person(fullname, address) {
    this.fullname = fullname
    this.address = address
}

Person.prototype.print = function() {
    console.log(this.fullname + ': ' + this.address)
}

const ze = new Person('Ze', 'Rua da Bolivia')
const nando = new Person('Nando', 'Rua Amarela')
const maria = new Person('Maria', 'Rua Rosa')

nando.print = function () {
    console.log('Nando o MAIOR !!!!')
}

ze.print()
nando.print()
nando.constructor.prototype.print.call(nando)
maria.print()