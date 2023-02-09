const productsDaoFile = require("../Container/ContainerFs");

class ProductsDaoFile extends productsDaoFile {
  constructor() {
    super("productos.json");
  }
  
    async getProducts(){
        return await this.getAll()
    }

    async getProductById(id){
        return await this.getById(id)
    }

    async saveProduct(product){
        return await this.save(product)
    }
    
    async deleteProductById(id){
        return await this.deleteById(id)
    }
    
    async deleteAllProducts(){
        return await this.deleteAll()
    }
}

module.exports = ProductsDaoFile;
