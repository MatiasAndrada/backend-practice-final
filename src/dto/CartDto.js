//DTO DE CARRITO
class CartDto {
    constructor(cart) {
        this.total = cart.total
        this.items = cart.items
    }

    static validate(cart) {
        const schema = Joi.object({
            total: Joi.number().integer().min(1).required(),
            items: Joi.array().items(Joi.object({
                item: Joi.number().integer().min(1).required(),
                quantity: Joi.number().integer().min(1).required(),
                priceAmount: Joi.number().integer().min(1).required(),
            })).required(),
        });
        return schema.validate(cart);
    }
}


exports.CartDto = CartDto;
