const Schema = require("mongoose").Schema;
const ContenedorMongo = require("../Container/ContainerMongo");
const { ProductDao } = require("../index");



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
    //buscar la quantity de cada item
    let total = 0;
    this.items.forEach((item) => {
        total += item.quantity;
    }
    );
    return total;
});

CartSchema.set("toJSON", { virtuals: true });

class CarritosDaoMongo extends ContenedorMongo {
    constructor() {
        super("carts", CartSchema);
    }


    async getCart(idUser) {
        try {
            const respuesta = await this.colección.findOne({ owner: idUser }).populate("items.item");

            if (respuesta) {
                let items = respuesta.items;
                let itemsToDelete = [];

                for (let i = 0; i < items.length; i++) {
                    const productoExiste = await ProductDao.getProductById(items[i].item._id);
                    console
                    if (!productoExiste) {
                        itemsToDelete.push(items[i]._id);
                        respuesta.total -= items[i].priceAmount;
                    }
                }

                if (itemsToDelete.length > 0) {
                    respuesta.total = total;
                    await this.colección.updateOne({ owner: idUser }, { $pull: { items: { _id: { $in: itemsToDelete } } } });
                    respuesta.items = respuesta.items.filter((item) => !itemsToDelete.includes(item._id));
                }

                return respuesta;
            } else {
                // Crear carrito
                return await this.colección.create({ owner: idUser, total: 0, itemsAmount: 0, items: [] });
            }
        } catch (error) {
            throw new Error(`Error al leer el ID de archivo: ${error}`);
        }
    }


    async addItemToCart(idUser, idProduct, quantity, price) {
        try {
            // Buscar el carrito
            let respuesta = await this.colección.findOne({ owner: idUser }).populate("items.item");

            if (!respuesta) {
                // Si no existe, crearlo
                respuesta = await this.colección.create({ owner: idUser });
            }

            // Verificar si el producto ya existe en el carrito
            let item = respuesta.items.find((item) => item.item._id.toString() === idProduct.toString());

            if (item) {
                // Si existe, actualizar la cantidad y el precio
                item.quantity += quantity;
                item.priceAmount = item.quantity * item.item.price;
                respuesta.total += item.priceAmount;

                await this.colección.updateOne(
                    { owner: idUser, "items.item": item.item._id },
                    { $set: { "items.$.quantity": item.quantity, "items.$.priceAmount": item.priceAmount, total: respuesta.total } }
                );
            } else {
                // Si no existe agregarlo
                const newItem = {
                    item: idProduct,
                    quantity: quantity,
                    priceAmount: price,
                };

                respuesta.items.push(newItem);
                respuesta.total += price;

                await this.colección.updateOne({ owner: idUser }, { $push: { items: newItem }, $set: { total: respuesta.total } });
            }
        } catch (error) {
            throw new Error(`Error al agregar el producto al carrito: ${error}`);
        }
    }


    async deleteItemCart(idUser, idProduct, priceAmount) {
        try {
            //? buscar el carrito
            const respuesta = await this.colección.findOne({ owner: idUser }).populate(
                "items.item"
            )
            if (respuesta) {
                //? si existe, actualizar el total y eliminar el producto
                respuesta.total -= priceAmount;
                await this.colección.updateOne(
                    { owner: idUser },
                    { $pull: { items: { item: idProduct } }, $set: { total: respuesta.total } }
                );
            }
        } catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`);
        }
    }

    async deleteCart(idUser) {
        try {
            //? buscar el carrito
            const respuesta = await this.colección.findOne({ owner: idUser }).populate(
                "items.item"
            )
            if (respuesta) {
                //? si existe, eliminarlo
                await this.colección.deleteOne({ owner: idUser });
            }
        } catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`);
        }
    }


}

module.exports = CarritosDaoMongo;