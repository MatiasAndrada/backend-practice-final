const mongoose = require('mongoose');

class ContainerMongo {
    constructor(nombreColeccion, schema) {
        this.coleccion = mongoose.model(nombreColeccion, schema);
    }

    async getAll() {

        try {
            const respuesta = await this.coleccion.find({})

            return respuesta
        } catch (err) {
            throw new Error(`Error leer el ID de archivo: ${err}`)
        }
    }

    async getById(_id) {
        
        try {
            const respuesta = await this.coleccion.findOne({ _id: { $eq: `${_id}` } })
            
            return respuesta
        } catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    }
    async save(newObj) {
        try {
            const respuesta = await this.coleccion.create(newObj)
            return respuesta
        } catch (error) {
            throw new Error(`Error al guardar el archivo: ${error}`)
        }
    }
    async updateById(_id, newObj) {
        try {
            const respuesta = await this.coleccion.updateOne({ _id: { $eq: `${_id}` } }, newObj)
            return respuesta
        } catch (error) {
            throw new Error(`Error al actualizar el archivo: ${error}`)
        }
    }
    async deleteById(_id) {
        try {
            const respuesta = await this.coleccion.deleteOne({ _id: { $eq: `${_id}` } })
            return respuesta
        } catch (error) {
            throw new Error(`Error al borrar el archivo: ${error}`)
        }
    }
    async deleteAll() {
        try {
            const respuesta = await this.coleccion.deleteMany({})
            return respuesta
        } catch (error) {
            throw new Error(`Error al borrar el archivo: ${error}`)
        }
    }
}

module.exports = ContainerMongo
