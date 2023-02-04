
const Joi = require('joi');

class ProductoDto {
    constructor(product) {
        this.id = product.id;
        this.timestamp = product.timestamp;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.thumbnail = product.thumbnail;
    }

    static validate(product) {
        const schema = Joi.object({
            id: Joi.number().integer().min(1).required(),
            timestamp: Joi.date().required(),
            name: Joi.string().min(3).max(50).required(),
            description: Joi.string().min(3).max(50).required(),
            price: Joi.number().integer().min(1).required(),
            thumbnail: Joi.string().min(3).max(50).required(),
        });
        return schema.validate(product);
    }
}





module.exports = ProductoDto;
