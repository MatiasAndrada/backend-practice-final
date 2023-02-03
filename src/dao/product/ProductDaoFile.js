const productsDaoFile = require("../Container/ContainerFs");

class ProductsDaoFile extends productsDaoFile {
  constructor() {
    super("productos.json");
  }
}

module.exports = ProductsDaoFile;
