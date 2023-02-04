const Schema = require("mongoose").Schema;

const ContenedorMongo = require("../Container/ContainerMongo");

var CartSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    total: { type: Number, default: 0 },
    items: [
        {
            item: { type: Schema.Types.ObjectId, ref: "" },
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
            return respuesta;
        } catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`);
        }
    }

}
module.exports = CarritosDaoMongo;