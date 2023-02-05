const ContainerMongo = require('../Container/ContainerMongo')
const Schema = require('mongoose').Schema


class ProductosDaoMongo extends ContainerMongo {

    constructor() {
        super('products', {
            name: { type: String, require: true, max: 100 },
            description: { type: String, require: true, max: 100 },
            thumbnail: { type: String, require: true, max: 150 },
            price: { type: String, require: true, max: 100 },
            category:  { type:  String, require: true, max: 100},
            timestamp: { type: String, require: true, max: 100 }
        })
    }
}

module.exports = ProductosDaoMongo;