
const {CartDao} = require('../dao/index');
const CartDto = require("../dto/CartDto")

class CartRepo {
    constructor() {
        this.CartDao = CartDao
    }

    async getCart(idUser) {
        const cart = await this.CartDao.getCart(idUser)
        console.log(cart)
        return new CartDto(cart)
    }
}



exports.CartRepo = new CartRepo();