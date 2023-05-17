const ContainerFile = require("../Container/ContainerFs");

const fs = require("fs");

class CarritosDaoFile extends ContainerFile {
    constructor() {
        super("carrito.json");
    }
    //Buscar carrito por el id de usuario y si no existe crear uno , si tiene productos bucarlos y devolverlos
    async getCart(idUser) {
        try {
            let respuesta = await this.getAll();
            let carrito = respuesta.find((carrito) => carrito.owner == idUser);
            if (!carrito) {
                carrito = await this.save({ owner: idUser, items: [], total: 0, itemsCount: 0 });
            } else {
                if (carrito.items.length > 0) {
                    let productos = JSON.parse(
                        fs.readFileSync("./src/storage/fileSystem/productos.json", "utf-8")
                    );
                    let productosCarrito = [];
                    carrito.items.forEach((item) => {
                        let producto = productos.find(
                            (producto) => producto._id == item._id
                        );
                        let priceAmount = producto.price * item.quantity;
                        producto.priceAmount = priceAmount;
                        productosCarrito.push({
                            item: producto,
                            quantity: item.quantity,
                            priceAmount: priceAmount,
                        });
                    });
                    carrito.items = productosCarrito;
                    carrito.itemsCount = carrito.items.length;
                    carrito.total = carrito.items.reduce(
                        (total, item) => total + item.priceAmount,
                        0
                    );
                }

            }
            return carrito;
        } catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`);
        }
    }

    async addItemToCart(idUser, idProduct, quantity, price) {
        try {
            let respuesta = await this.getAll(); // gets all the carts
            let carrito = respuesta.find((carrito) => carrito.owner == idUser); // looks for the cart of the user
            let producto = carrito.items.find((item) => item._id == idProduct); // looks for the product in the cart
            if (producto) {
                producto.quantity += quantity;
                producto.priceAmount = producto.quantity * price;
            } else {
                producto = {
                    _id: idProduct,
                    quantity: quantity,
                    priceAmount: price * quantity,
                };
                carrito.items.push(producto);
            }
            carrito.total += producto.priceAmount;
            await this.saveAll(respuesta);
        } catch (error) {
            throw new Error(`Error al agregar el producto: ${error}`);
        }
    }
    async deleteCart(idUser) {
        try {
            //pedir carrito del usuario y vaciarlo
            let respuesta = await this.getAll();
            let carrito = respuesta.find((carrito) => carrito.owner == idUser);
            carrito.items = [];
            carrito.total = 0;
            carrito.itemsCount = 0;
            await this.saveAll(respuesta);
            return carrito;
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${error}`);
        }
    }

    async deleteItemCart(idUser, idProduct, priceAmount) {
        try {
            let respuesta = await this.getAll();
            let carrito = respuesta.find((carrito) => carrito.owner == idUser);
            let producto = carrito.items.find((item) => item._id == idProduct);
            if (producto) {
                carrito.items = carrito.items.filter((item) => item._id != idProduct);
                carrito.total -= priceAmount;
            } else {
                throw new Error(`El producto ${idProduct} no se encuentra en el carrito ${carrito._id}`);
            }
            await this.saveAll(respuesta);
            return carrito;
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${error}`);
        }
    }
}

module.exports = CarritosDaoFile;
