console.log('hello')

// !!!! Não é necessária a definição de uma Classe

var std = {
    "nr": 0,
    "name": null
}

function makeStudent(nr, name) {
    return {
        "nr": nr,
        "name": name
    } 
}

std.nr = 836463;
console.log(std.nr)

std.address = "Rua das Papolias"
console.log(std.address)

std = true
console.log(std)

std2 = makeStudent(86153, "Maria")
console.log(std2.nr)
