const  ContainerFile=  require( "../../containers/ContainerFs.js")

class CarritosDaoFile extends ContainerFile {

    constructor() {
        super('carrito.txt')
    }
}

module.exports = CarritosDaoFile