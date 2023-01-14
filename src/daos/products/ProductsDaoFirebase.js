const  ContenedorFirebase = require( "../../containers/containerFirebase.js")

class ProductosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('productos')
    }
}

module.exports = ProductosDaoFirebase