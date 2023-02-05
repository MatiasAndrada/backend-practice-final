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

    async getById(x) {

        try {
            const respuesta = await this.coleccion.findOne({ id: { $eq: `${x}` } })

            return respuesta
        } catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    }
    async save(newObj) {
        try {
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
        } catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    }

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

        } catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    }

    async putById(id, newObj) {

        try {
            await this.coleccion.updateOne({ id: { $eq: `${id}` } }, { $set: newObj })

        } catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    }

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

        } catch (error) {
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    }
}

module.exports = ContainerMongo
