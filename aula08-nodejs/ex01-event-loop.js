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

ze.print()
nando.print()

setTimeout(() => {
    console.log('Alert ringing!!!!')
    setTimeout(() => console.log('2nd Alert!!!'), 3000)
}, 3000)

maria.print()
ze.print()
console.log('bla bla...')