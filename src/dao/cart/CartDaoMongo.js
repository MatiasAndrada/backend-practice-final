const Schema = require("mongoose").Schema;
const ProductDao = require("../product/ProductDaoMongo")
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
        //Buscar el producto, agragarlo al carrito y si no existe crear uno
        console.log("🦇  idUser", idUser)
        console.log("🦇  idProduct", idProduct)
        console.log("🦇  quantity", quantity)
        try {
            //? buscar el carrito
            let respuesta = await this.coleccion.findOne({ owner: idUser });
            if (!respuesta) {
                //? si no existe, crearlo
                respuesta = await this.coleccion.insertOne({ owner: idUser });
            }
            //? buscar el producto en collecion de productos
            const producto = await ProductDao.getById(idProduct);
            console.log("🦇  producto", producto)

            if (!producto) {
                throw new Error(`El producto no existe`);
            }

            //? verificar si el producto ya existe en el carrito
            let item = respuesta.items.find((item) => item.item._id == idProduct);
            if (item) {
                //? si existe, actualizar la cantidad y el precio
                item.quantity += quantity;
                item.priceAmount = item.quantity * item.item.price;
                respuesta.total += item.priceAmount;
            } else {
                //? si no existe, agregarlo al carrito
                item = {
                    item: idProduct,
                    quantity: quantity,
                    priceAmount: item.quantity * item.item.price,
                };
                };
                respuesta.items.push(item);
                respuesta.total += item.priceAmount;
            
            //? actualizar el carrito
            const respuestaActualizada = await this.coleccion.updateOne({ owner: idUser }, { $set: respuesta });
            console.log("🦇  respuestaActualizada", respuestaActualizada)
            //? devolver el carrito actualizado
            return respuesta
        }
     catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`);
        }
    }
}
    
module.exports = CarritosDaoMongo;