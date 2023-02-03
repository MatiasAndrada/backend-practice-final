const  ContenedorFirebase = require( "../Container/ContainerFirebase")

class CarritosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('carritos')
    }
}

module.exports = CarritosDaoFirebase;