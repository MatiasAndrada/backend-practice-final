const { varSwitch } = require("./switchDb.js");
let productosDao;
let carritosDao;

switch (varSwitch) {
  case "txt":
    const ProductosDaoFile = require("./products/ProductsDaoFile.js");
    const CarritosDaoFile = require("./carts/CartDaoFile.js");

    productosDao = new ProductosDaoFile();
    carritosDao = new CarritosDaoFile();
    break;
  case "firebase":
    const ProductosDaoFirebase = require("./products/ProductsDaoFirebase.js");
    const CarritosDaoFirebase = require("./carts/CartDaoFirebase.js");

    productosDao = new ProductosDaoFirebase();
    carritosDao = new CarritosDaoFirebase();
    break;
  case "mongo":
    const ProductosDaoMongo = require("./products/ProductsDaoMongo.js");
    const CarritosDaoMongo = require("./carts/CartDaoMongo.js");

    productosDao = new ProductosDaoMongo();
    carritosDao = new CarritosDaoMongo();
    break;
}

exports.productsApi = productosDao;
exports.cartApi = carritosDao;
