const { ProductDao } = require("../dao/index");
const ProductDto = require("../dto/productDto");


class ProductRepo {
    constructor() {
        this.productDao =  ProductDao;
    }

    async getAll() {
        try {
            const products = await this.productDao.getAll();
            const dto = products.map((product) => new ProductDto(product));
            return dto
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            const product = await this.productDao.getById(id);
            const dto = new ProductDto(product);
            return dto
        } catch (error) {
            throw error;
        }
    }

    async save(newObj){
        try{
            await this.productDao.save(newObj)
        }
        catch(error){
            throw error;
        }
    }

    async saveAll(newArray){
        try{
            await this.productDao.saveAll(newArray)
        }
        catch(error){
            throw error;
        }
    }

    async update(id, newObj){
        try{
            await this.productDao.update(id, newObj)
        }
        catch(error){
            throw error;
        }
    }

    async delete(id){
        try{
            await this.productDao.delete(id)
        }
        catch(error){
            throw error;
        }
    }

    async deleteAll(){
        try{
            await this.productDao.deleteAll()
        }
        catch(error){
            throw error;
        }
    }
    
}

exports.ProductRepo  = new ProductRepo();
