const Schema = require("mongoose").Schema;

const ContenedorMongo = require("../Container/ContainerMongo");

var CartSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "users" },
    total: { type: Number, default: 0 },
    items: [
        {
            item: { type: Schema.Types.ObjectId, ref: "products" },
            quantity: { type: Number, default: 1 },
            priceAmount: { type: Number, default: 0 },
        },
    ],
    timestamp: { type: Date, default: Date.now }
});


//virtual items length
CartSchema.virtual("itemsCount").get(function () {
    return this.items.length;
});

//CartSchema.set("toJSON", { virtuals: true });

class CarritosDaoMongo extends ContenedorMongo {
    constructor() {
        super("carts", CartSchema);
    }

    async getCart(idUser) {
        try {
            const respuesta = await this.coleccion.findOne({ owner: idUser }).populate("items.item");
        //?verificar si alguno de los productos de la lista no existe
            if (respuesta) {
                let items = respuesta.items;
                let itemsToDelete = [];
                for (let i = 0; i < items.length; i++) {
                    if (!items[i].item) {
                        itemsToDelete.push(items[i]._id);
                        respuesta.total -= items[i].priceAmount;

                    }
                }
                if (itemsToDelete.length > 0) {
                    respuesta.total = total;
                    //actualizar el total
                    await this.coleccion.updateOne({ owner: idUser }, { $pull: { items: { _id: { $in: itemsToDelete } } } });
                    respuesta.items = respuesta.items.filter((item) => !itemsToDelete.includes(item._id));
                }
                return respuesta
            }
        } catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`);
        }
    }

    async addItem(idUser, idProduct, quantity) {
        try{
            const cart = await this.coleccion.findOne({ owner: idUser }).populate("items.item");
            if (!cart) {
                const newCart = await this.coleccion.create({ owner: idUser, items: [{ item: idProduct, quantity: quantity }] });
                return newCart;
            } else {
                const item = cart.items.find((item) => item.item._id == idProduct);
                if (item) {
                    item.quantity += quantity;
                    item.priceAmount = item.quantity * item.item.price;
                    cart.total += quantity * item.item.price;
                } else {
                    cart.items.push({ item: idProduct, quantity: quantity, priceAmount: quantity * item.item.price });
                    cart.total += quantity * item.item.price;
                }
                await this.coleccion.updateOne({ owner: idUser }, { $set: { items: cart.items, total: cart.total } });
                return cart;
            }
        } catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`);
        }
    }
}

module.exports = CarritosDaoMongo;