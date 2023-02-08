const ContenedorFirebase = require("../Container/ContainerFirebase");
const db = require("../../firebaseConfig");

class CarritosDaoFirebase {
    constructor() {
        this.coleccion = db.collection("carritos");

    }
    async getCart(idUser) {
        try {
            let carrito = await this.coleccion.doc(idUser).get();
            console.log("🦇 ~ file: CartDaoFirebase.js:13 ~ CarritosDaoFirebase ~ getCart ~ carrito", carrito)
            if (!carrito.exists) {
                await this.coleccion.doc(idUser).set({
                    timestamp: Date.now(),
                    productos: [],
                    total: 0,
                    itemsCount: 0,
                })
                carrito = await this.coleccion.doc(idUser).get();
            }
            return { _id: carrito.id, ...carrito.data() };
        }
        catch (error) {
            console.log(error)
        }
    }
}


module.exports = CarritosDaoFirebase;