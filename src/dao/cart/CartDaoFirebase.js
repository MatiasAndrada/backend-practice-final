//class dao firebase carts

const db =require("../../firebaseConfig")

class CartDaoFirebase {
    
        constructor() {
            this.collection = db.collection("carts")
        }
    //Buscar carrito si no existe crearlo, y devolverlo
        async getCart(idUser) {
            console.log(idUser)
            const cart = await this.collection.doc(idUser).get()
            if (!cart.exists) {
                console.log("no existe")
                const newCart = {
                    items: [],
                    itemsCount: 0,
                    total: 0
                }
                console.log("creando")
                await this.collection.doc(idUser).create(newCart)
                return newCart
            }
            return cart.data()
        }
    
        async addItemToCart(idUser, idProduct, quantity, price) {
            const cart = await this.getCart(idUser)
            const item = cart.items.find(item => item.idProduct == idProduct)
            if (item) {
                item.quantity += quantity
                item.price = price
                item.priceAmount = item.quantity * item.price
            } else {
                cart.items.push({
                    idProduct,
                    quantity,
                    price
                })
            }
            cart.itemsCount += quantity
            cart.total += price * quantity
            await this.collection.doc(idUser).update(cart)
        }
    
        async deleteCart(idUser) {
            await this.collection.doc(idUser).delete()
        }
    
        async deleteItemCart(idUser, idProduct, priceAmount) {
            const cart = await this.getCart(idUser)
            const item = cart.items.find(item => item.idProduct == idProduct)
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1
                    await this.collection.doc(idUser).update(cart)
                } else {
                    cart.items = cart.items.filter(item => item.idProduct != idProduct)
                    await this.collection.doc(idUser).update(cart)
                }
            }
        }
    
    }


module.exports = CartDaoFirebase







