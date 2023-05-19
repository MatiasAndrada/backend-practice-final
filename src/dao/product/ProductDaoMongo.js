const ContainerMongo = require("../Container/ContainerMongo");

class ProductosDaoMongo extends ContainerMongo {
  constructor() {
    super("products", {
      name: { type: String, require: true, max: 100 },
      description: { type: String, require: true, max: 100 },
      thumbnail: { type: String, require: true, max: 150 },
      price: { type: String, require: true, max: 100 },
      category: { type: String, require: true, max: 100 },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    });
  }
  
  async getProducts(){
    console.log("get all products ")
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

module.exports = ProductosDaoMongo;
