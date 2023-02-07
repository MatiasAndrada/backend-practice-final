
const {CartDao} = require('../dao/index');
const CartDto = require("../dto/cartDto");

class CartRepo {
    constructor() {
        this.CartDao = CartDao
    }

    async getAll(idUser) {
        const cart = await this.CartDao.getCart(idUser)
        if (!cart) {
            return null
        }
        const dto = new CartDto(cart)
        return dto
        
    }

    async save(idUser, idProduct, quantity, price) {
        await this.CartDao.addItem(idUser, idProduct, quantity, price)
    }

    async deleteAll(idUser) {
        await this.CartDao.deleteCart(idUser)
    }
    async deleteById(idUser, idProduct, priceAmount) {
        await this.CartDao.deleteItem(idUser, idProduct, priceAmount)
    }


}


exports.CartRepo = new CartRepo();