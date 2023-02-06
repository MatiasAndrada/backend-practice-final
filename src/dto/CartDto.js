const Joi = require("joi");
class CartDto {
    constructor(cart) {
        this.total = cart.total;
        this.items = cart.items;
        this.itemsCount = cart.itemsCount;
    }

    static validate(cart) {
        const schema = Joi.object({
            total: Joi.number().required(),
            itemsCount: Joi.number.require(),
            items: Joi.array()
                .items(
                    Joi.object({
                        item: Joi.object({
                            _id: Joi.string().required(),
                            name: Joi.string().required(),
                            description: Joi.string().required(),
                            thumbnail: Joi.string().required(),
                            price: Joi.number().required(),
                            category: Joi.string().required(),
                        }).required(),
                        quantity: Joi.number().required(),
                        price: Joi.number().required(),
                        priceAmount: Joi.number().required(),
                    })
                )
                .required(),
        });
        return schema.validate(cart);
    }
}

module.exports = CartDto;
