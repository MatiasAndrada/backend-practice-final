const ContenedorFirebase = require("../Container/ContainerFirebase")

class ProductosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('productos')
    }
}

module.exports = ProductosDaoFirebase