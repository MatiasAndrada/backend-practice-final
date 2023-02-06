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

    async addItem(idUser, idProduct, quantity, price) {
        //Buscar el producto, agragarlo al carrito y si no existe crear uno
        try {
            //? buscar el carrito
            let respuesta = await this.coleccion.findOne({ owner: idUser }).populate(
                "items.item"
            )
            if (!respuesta) {
                //? si no existe, crearlo
                respuesta = await this.coleccion.insertOne({
                    owner: idUser,
                    total: 0,
                    items: [],
                });
            }

            //? verificar si el producto ya existe en el carrito
            let item =
                respuesta.items.length > 0
                    ? respuesta.items.find((item) => item.item._id == idProduct)
                    : null;
            if (item) {
                //? si existe, actualizar la cantidad y el precio
                item.quantity += quantity;
                item.priceAmount = item.quantity * item.item.price;
                respuesta.total += item.priceAmount;
                await this.coleccion.updateOne(
                    { owner: idUser, "items.item": idProduct },
                    { $set: { "items.$.quantity": item.quantity, "items.$.priceAmount": item.priceAmount, total: respuesta.total } }
                );
                
            } else {
                //? si no existe, agregarlo al carrito
                item = {
                    item: idProduct,
                    quantity: quantity,
                    price: price,
                    priceAmount: price * quantity,
                };
                respuesta.items.push(item);
                respuesta.total += item.priceAmount;
                await this.coleccion.updateOne(
                    { owner: idUser },
                    { $push: { items: item }, $set: { total: respuesta.total } }
                );
            }
        } catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`);
        }
    }
}
    
module.exports = CarritosDaoMongo;