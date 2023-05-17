const mongoose = require('mongoose');

class ContainerMongo {
    constructor(nombreColección, schema) {
        this.colección = mongoose.model(nombreColección, schema);
    }

    async getAll() {

        try {
            const respuesta = await this.colección.find({})

            return respuesta
        } catch (err) {
            throw new Error(`Error leer el ID de archivo: ${err}`)
        }
    }

    async getById(_id) {
        
        try {
            const respuesta = await this.colección.findOne({ _id: { $eq: `${_id}` } })
            
            return respuesta
        } catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    }
    async save(newObj) {
        try {
            const respuesta = await this.colección.create(newObj)
            return respuesta
        } catch (error) {
            throw new Error(`Error al guardar el archivo: ${error}`)
        }
    }
    async saveAll(array) {
        try {
            const respuesta = await this.colección.insertMany(array)
            return respuesta
        } catch (error) {
            throw new Error(`Error al guardar el archivo: ${error}`)
        }
    }
    async updateById(_id, newObj) {
        try {
            const respuesta = await this.colección.updateOne({ _id: { $eq: `${_id}` } }, newObj)
            return respuesta
        } catch (error) {
            throw new Error(`Error al actualizar el archivo: ${error}`)
        }
    }
    async deleteById(_id) {
        try {
            const respuesta = await this.colección.deleteOne({ _id: { $eq: `${_id}` } })
            return respuesta
        } catch (error) {
            throw new Error(`Error al borrar el archivo: ${error}`)
        }
    }
    async deleteAll() {
        try {
            const respuesta = await this.colección.deleteMany({})
            return respuesta
        } catch (error) {
            throw new Error(`Error al borrar el archivo: ${error}`)
        }
    }
}

module.exports = ContainerMongo
