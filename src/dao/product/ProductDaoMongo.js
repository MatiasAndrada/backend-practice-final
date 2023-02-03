const ContainerMongo = require('../Container/ContainerMongo')

class ProductosDaoMongo extends ContainerMongo {

    constructor() {
        super('products', {
            id: { type: Number, require: true, max: 100 },
            stock: { type: Number, require: false, max: 100 },
            name: { type: String, require: true, max: 100 },
            description: { type: String, require: true, max: 100 },
            thumbnail: { type: String, require: true, max: 150 },
            price: { type: String, require: true, max: 100 },
            category:  { type:  String, require: true, max: 100, default: "undefined"}, 
            created_at: { type: String, require: true, max: 100 },
            updated_at: { type: String, require: false, max: 100 },
        })
    }
}

module.exports = ProductosDaoMongo;