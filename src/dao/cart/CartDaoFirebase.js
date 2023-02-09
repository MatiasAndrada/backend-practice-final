//class dao firebase carts

const db = require("../../firebaseConfig");

class CartDaoFirebase {
  constructor() {
    this.collection = db.collection("carts");
  }
  //Buscar carrito si no existe crearlo con sus item
  async getCart(idUser) {
    const cart = await this.collection.doc(idUser).get();
    if (cart.exists) {
      return cart.data();
    } else {
      await this.collection.doc(idUser).set({ total: 0 , items: [], itemsCount: 0  });
      return { items: [], total: 0, itemsCount: 0  };
    }
  }

  async addItemToCart(idUser, idProduct, quantity, price) {
    const cart = await this.getCart(idUser);
    const item = cart.items.find((item) => item.idProduct == idProduct);
    if (item) {
      item.quantity += quantity;
      await this.collection.doc(idUser).update(cart);
    } else {
      //buscar el producto en la collecion de porductos
      const product = await db.collection("products").doc(idProduct).get();
      if (product.exists) {
        cart.items.push({
          item: {
            _id: product.id,
            name: product.data().name,
            description: product.data().description,
            thumbnail: product.data().thumbnail,
            price: product.data().price,
          },
          quantity: quantity,
          priceAmount: price * quantity,
        });
        cart.itemsCount += Number(quantity)

        cart.total += price * quantity;
        await this.collection.doc(idUser).update(cart);
      }

    }
  }

  async deleteCart(idUser) {
    await this.collection.doc(idUser).delete();
  }

  async deleteItemCart(idUser, idProduct, priceAmount) {
    const cart = await this.getCart(idUser);
    const item = cart.items.find((item) => item.item._id == idProduct);
    if (item) {
      cart.items = cart.items.filter((item) => item.item._id != idProduct);
      cart.total -= priceAmount;
      await this.collection.doc(idUser).update(cart);
    }
  }
}

module.exports = CartDaoFirebase;
