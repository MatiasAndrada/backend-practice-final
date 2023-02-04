const { ProductDao } = require("../dao/index");
const ProductDto = require("../dto/productDto");


class ProductRepo {
    constructor() {
        this.productDao = ProductDao;
    }

    async getAll() {
        try {
            const products = await this.productDao.getAll();
            const dto = products.map((product) => new ProductDto(product));
            return dto;
        } catch (error) {
            throw error;
        }
    }
    
    async getById(id) {
        try {
            const product = await this.productDao.getById(id);
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
            const newId = await this.productDao.save(newObj)
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

    async delete(id) {
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
