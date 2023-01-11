const  ContenedorFirebase = require( "../../containers/containerFirebase.js")

class CarritosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('carritos')
    }
}

module.exports = CarritosDaoFirebase;