const  ContenedorMongo =  require( "../Container/ContainerMongo") 

class CarritosDaoMongo extends ContenedorMongo {

    constructor() {
        super('carritos', {
            id: {type: Number, require: true, max: 255},
            'timestamp(carrito)': {type: String, require: true, max: 255},
            productos: {type: [], require: true}            
        })
    }
}

module.exports = CarritosDaoMongo