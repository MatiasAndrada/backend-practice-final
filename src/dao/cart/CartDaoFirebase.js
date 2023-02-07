const  ContenedorFirebase = require( "../Container/ContainerFirebase")

class CarritosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('carritos')
    }

    async getCart(idUser) {
        try {
            const respuesta = await this.coleccion.where('owner', '==', idUser).get()
            if (respuesta.empty) {
                return null
            }
            let cart = null
            respuesta.forEach(doc => {
                cart = doc.data()
                cart.id = doc.id
            })
            return cart
        } catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    }

    async addProduct(idUser, idProduct,  quantity,  price) {
        try {
            //? buscar el carrito
            const respuesta = await this.coleccion.where('owner', '==', idUser).get()
            if (respuesta.empty) {
                //? si no existe, crearlo
                await this.coleccion.add({
                    owner: idUser,
                    items: [
                        {
                            item: idProduct,
                            quantity: quantity,
                            price: price,
                            priceAmount: price * quantity,
                        },
                    ],
                    total: price * quantity,
                })
            } else {
                let item = null
                respuesta.forEach(doc => {
                    item = doc.data().items.find((item) => item.item === idProduct)
                })
                if (item) {
                    //? si existe, actualizar la cantidad y el precio
                    item.quantity += quantity
                    item.priceAmount = item.quantity * item.price
                    await this.coleccion.doc(respuesta.docs[0].id).update({
                        items: respuesta.docs[0].data().items,
                        total: respuesta.docs[0].data().total + item.priceAmount,
                    })
                } else {
                    //? si no existe, agregarlo al carrito
                    item = {
                        item: idProduct,
                        quantity: quantity,
                        price: price,
                        priceAmount: price * quantity,
                    }
                    respuesta.docs[0].data().items.push(item)
                    await this.coleccion.doc(respuesta.docs[0].id).update({
                        items: respuesta.docs[0].data().items,
                        total: respuesta.docs[0].data().total + item.priceAmount,
                    })
                }
            }
        } catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    }
}

module.exports = CarritosDaoFirebase;