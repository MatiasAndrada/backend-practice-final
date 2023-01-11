const productsDaoFile = require("../../containers/ContainerFs.js");

class ProductsDaoFile extends productsDaoFile {
  constructor() {
    super("productos.json");
  }
}

module.exports = ProductsDaoFile;
