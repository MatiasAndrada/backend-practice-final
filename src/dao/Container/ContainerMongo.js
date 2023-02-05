const mongoose = require('mongoose');
const moment = require("moment")
const config = require('../../config.js');

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

<<<<<<< HEAD
    async getById(x) {

        try {
            const respuesta = await this.coleccion.findOne({ id: { $eq: `${x}` } })

=======
    async getById(_id) {
        
        try {
            const respuesta = await this.coleccion.find({ _id: { $eq: `${_id}` } })
            
>>>>>>> a8d5acea9ba38f5472cbd9920c26c583d7e05ad8
            return respuesta
        } catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    }
    async save(newObj) {
        try {
<<<<<<< HEAD
            let preSave = await this.getAll()
            let newId
            if (preSave.length == 0) {
                newId = 1
            } else {
                newId = parseInt(preSave[preSave.length - 1].id) + 1
            }
            let timestamp = moment().format("DD/MM/YYYY HH:mm:ss")

            await this.coleccion.insertMany({ id: newId, timestamp: timestamp, ...newObj })

            return newId
=======
            const respuesta = await this.coleccion.create(newObj)
            return respuesta
>>>>>>> a8d5acea9ba38f5472cbd9920c26c583d7e05ad8
        } catch (error) {
            throw new Error(`Error al guardar el archivo: ${error}`)
        }
    }
<<<<<<< HEAD

    async saveAll(newArray) {

        try {
            let preSave = await this.getAll()
            let newId
            if (preSave.length == 0) {
                newId = 1
            } else {
                newId = parseInt(preSave[preSave.length - 1].id) + 1
            }
            for (let i = 0; i < newArray.length; i++) {
                let timestamp = moment().format("DD/MM/YYYY HH:mm:ss")
                await this.coleccion.insertMany({ id: newId, timestamp: timestamp, ...newArray[i] })
                newId++
            }

=======
    async updateById(_id, newObj) {
        try {
            const respuesta = await this.coleccion.updateOne({ _id: { $eq: `${_id}` } }, newObj)
            return respuesta
>>>>>>> a8d5acea9ba38f5472cbd9920c26c583d7e05ad8
        } catch (error) {
            throw new Error(`Error al actualizar el archivo: ${error}`)
        }
    }
<<<<<<< HEAD

    async putById(id, newObj) {

        try {
            await this.coleccion.updateOne({ id: { $eq: `${id}` } }, { $set: newObj })

=======
    async deleteById(_id) {
        try {
            const respuesta = await this.coleccion.deleteOne({ _id: { $eq: `${_id}` } })
            return respuesta
>>>>>>> a8d5acea9ba38f5472cbd9920c26c583d7e05ad8
        } catch (error) {
            throw new Error(`Error al borrar el archivo: ${error}`)
        }
    }
<<<<<<< HEAD

    async deleteById(id) {

        try {
            let rta = await this.coleccion.deleteOne({ id: { $eq: `${id}` } })

            console.log("🦇  ~ rta", rta)
        } catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    }


    async deleteAll() {

        try {
            await this.coleccion.deleteMany({})

=======
    async deleteAll() {
        try {
            const respuesta = await this.coleccion.deleteMany({})
            return respuesta
>>>>>>> a8d5acea9ba38f5472cbd9920c26c583d7e05ad8
        } catch (error) {
            throw new Error(`Error al borrar el archivo: ${error}`)
        }
    }
}

module.exports = ContainerMongo
