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
      //verificar en la colección de productos si todos los productos existen
      const items = await Promise.all(
        cart.data().items.map(async (item) => {
          const product = await db.collection("products").doc(item.item._id).get();
          if (product.exists) {
            return item;
          }
        })
      );
      //filtrar los productos que no existen actualizar precio y cantidad 
      const itemsExist = items.filter((item) => item != undefined);
      const total = itemsExist.reduce((acc, item) => acc + item.priceAmount, 0);
      const itemsCount = itemsExist.reduce((acc, item) => acc + item.quantity, 0);
      await this.collection.doc(idUser).update({ items: itemsExist, total: total, itemsCount: itemsCount });
      return { items: itemsExist, total: total, itemsCount: itemsCount };
      

    } else {
      await this.collection.doc(idUser).set({ total: 0, items: [], itemsCount: 0 });
      return { items: [], total: 0, itemsCount: 0 };
    }
  }

  async addItemToCart(idUser, idProduct, quantity, price) {
    const cart = await this.getCart(idUser);
    const item = cart.items.find((item) => item.idProduct == idProduct);
    if (item) {
      item.quantity += quantity;
      await this.collection.doc(idUser).update(cart);
    } else {
      //buscar el producto en la colección de productos
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

  async deleteItemCart(idUser, idProduct, priceAmount) {
    const cart = await this.getCart(idUser);
    const item = cart.items.find((item) => item.item._id == idProduct);
    if (item) {
      cart.items = cart.items.filter((item) => item.item._id != idProduct);
      cart.total -= priceAmount;
      await this.collection.doc(idUser).update(cart);
    }
  }
  async deleteCart(idUser) {
    await this.collection.doc(idUser).delete();
  }

}

module.exports = CartDaoFirebase;
