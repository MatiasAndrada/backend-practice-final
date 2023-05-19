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

                items.forEach((item) => {
                    if (!item.item) {
                        itemsToDelete.push(item._id);
                    }
                });
                if (itemsToDelete.length > 0) {
                    try {
                        respuesta.items = respuesta.items.filter((item) => !itemsToDelete.includes(item._id));
                        respuesta.total = respuesta.items.reduce((total, item) => total + item.priceAmount, 0);
                        respuesta.itemsCount = respuesta.items.length;
                        await this.colección.updateOne({ owner: idUser }, { $set: { items: respuesta.items, total: respuesta.total, itemsCount: respuesta.itemsCount } });
                        
                    }
                    catch (error) {
                        throw new Error(`Error al eliminar el producto no existente: ${error}`);
                    }
                }
            }
            return respuesta;
        } catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`);
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
        const item = respuesta.items.find((item) => item.item._id == idProduct);
        if (item) {
            item.quantity += quantity;
            item.priceAmount = item.quantity * price;
            respuesta.total += quantity * price;

            await this.colección.updateOne({ owner: idUser }, { $set: { items: respuesta.items, total: respuesta.total } });

        } else {
            // Si no existe agregarlo
            const newItem = {
                item: idProduct,
                quantity: quantity,
                priceAmount: quantity * price,
            };

            respuesta.items.push(newItem);
            respuesta.total += newItem.priceAmount;

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
            //? si existe, vaciarlo
            respuesta.items = [];
            respuesta.total = 0;
            respuesta.itemsCount = 0;
            await this.colección.updateOne(
                { owner: idUser },
                { $set: { items: respuesta.items, total: respuesta.total, itemsCount: respuesta.itemsCount } }
            );

        }
    } catch (error) {
        throw new Error(`Error leer el ID de archivo: ${error}`);
    }
}


}

module.exports = CarritosDaoMongo;