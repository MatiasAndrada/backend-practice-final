
const {CartDao} = require('../dao/index');
const CartDto = require("../dto/cartDto");

class CartRepo {
    constructor() {
        this.CartDao = CartDao
    }

    async getCart(idUser) {
        const cart = await this.CartDao.getCart(idUser)
        console.log("🦇  cart", cart)
        if (!cart) {
            return null
        }
        const dto = new CartDto(cart)
        console.log("🦇  dto", dto)
        return dto
        
    }

    async addToCart(idUser, idProduct, quantity, price) {
        await this.CartDao.addItem(idUser, idProduct, quantity, price)

    }
}


exports.CartRepo = new CartRepo();