const  ContainerFile=  require( "../Container/ContainerFs")

class CarritosDaoFile extends ContainerFile {

    constructor() {
        super('carrito.txt')
    }
}

module.exports = CarritosDaoFile