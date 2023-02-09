const config = require('../config');
const logger = require('../utils/logger');

let ProductDao;
let CartDao;

let varSwitch = config.appConfig.db


switch (varSwitch) {
  case "txt":
    const ProductDaoFile = require("./product/ProductDaoFile.js");
    const CartDaoFile = require("./cart/CartDaoFile.js");
    ProductDao = new ProductDaoFile();
    CartDao = new CartDaoFile();
    logger.info("Se ha seleccionado la base de datos txt")
    break;
  case "firebase":
    const ProductDaoFirebase = require("./product/ProductDaoFirebase.js");
    const CartDaoFirebase = require("./cart/CartDaoFirebase.js");

    ProductDao = new ProductDaoFirebase();
    CartDao = new CartDaoFirebase();
    logger.info("Se ha seleccionado la base de datos firebase")
    break;
  case "mongo":
    const ProductDaoMongo = require("./product/ProductDaoMongo.js");
    const CartDaoMongo = require("./cart/CartDaoMongo.js");
    
    ProductDao = new ProductDaoMongo();
    CartDao = new CartDaoMongo();
    logger.info("Se ha seleccionado la base de datos mongo")
    break;

  default:
    logger.error("No se ha seleccionado un tipo de base de datos")
    break;
}

exports.ProductDao  = ProductDao;
exports.CartDao = CartDao;
