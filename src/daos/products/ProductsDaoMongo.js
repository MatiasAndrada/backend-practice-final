const ContainerMongo = require('../Container/ContainerMongo')

class ProductosDaoMongo extends ContainerMongo {

    constructor() {
        super('productos', {
            id: { type: Number, require: true, max: 255 },
            timestamp: { type: String, require: true, max: 100 },
            name: { type: String, require: true, max: 100 },
            description: { type: String, require: true, max: 100 },
            code: { type: String, require: true, max: 100 },
            thumbnail: { type: String, require: true, max: 100 },
            price: { type: String, require: true, max: 100 },
            stock: { type: String, require: true, max: 100 }
        })
    }
}

module.exports = ProductosDaoMongo;