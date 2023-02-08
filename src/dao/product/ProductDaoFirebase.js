const ContenedorFirebase = require("../Container/ContainerFirebase")

class ProductosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('products')
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

module.exports = ProductosDaoFirebase;