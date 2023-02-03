
const {CartApi} = require('../dao/index');
const CartDto = require("../dto/CartDto")

class CartRepo {
    constructor() {
        this.cartApi = new CartApi();
    }

    async getCart(id) {
        const cart = await this.cartApi.getCart(id);
        return new CartDto(cart);
    }

    async addProduct(id, product) {
        const cart = await this.cartApi.addProduct(id, product);
        return new CartDto(cart);
    }

    async deleteProduct(id, product) {
        const cart = await this.cartApi.deleteProduct(id, product);
        return new CartDto(cart);
    }

    async deleteCart(id) {
        const cart = await this.cartApi.deleteCart(id);
        return new CartDto(cart);
    }
}
