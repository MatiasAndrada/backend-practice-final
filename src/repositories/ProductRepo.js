const { ProductDao } = require("../dao/index");
const ProductDto = require("../dto/ProductDto");


class ProductRepo {
    constructor() {
        this.productDao = ProductDao;
    }

    async getAll() {
        try {
            const products = await this.productDao.getProducts();
            const dto = products.map((product) => new ProductDto(product));
            return dto;
        } catch (error) {
            throw error;
        }
    }
    
    async getById(id) {
        try {
            const product = await this.productDao.getProductById(id);
            if (!product) {
                return null;
            }
            const dto = new ProductDto(product);
            return dto
        } catch (error) {
            throw error;
        }
    }

    async save(newObj) {
        try {
            const newId = await this.productDao.saveProduct(newObj)
            return newId
        }
        catch (error) {
            throw error;
        }
    }

    async saveAll(newArray) {
        try {
            await this.productDao.saveAll(newArray)
        }
        catch (error) {
            throw error;
        }
    }

    async update(id, newObj) {
        try {
            await this.productDao.update(id, newObj)
        }
        catch (error) {
            throw error;
        }
    }

    async deleteById(id) {
        try {
            await this.productDao.deleteById(id)
        }
        catch (error) {
            throw error;
        }
    }

    async deleteAll() {
        try {
            await this.productDao.deleteAll()
        }
        catch (error) {
            throw error;
        }
    }

}

exports.ProductRepo = new ProductRepo();
