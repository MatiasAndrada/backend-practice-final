
const {CartDao} = require('../dao/index');
const CartDto = require("../dto/CartDto");

class CartRepo {
    constructor() {
        this.CartDao = CartDao;
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
        await this.CartDao.addItemToCart(idUser, idProduct, quantity, price)
    }

    async deleteAll(idUser) {
        await this.CartDao.deleteCart(idUser)
    }
    async deleteById(idUser, idProduct, priceAmount) {
        await this.CartDao.deleteItemCart(idUser, idProduct, priceAmount)
    }


}


exports.CartRepo = new CartRepo();