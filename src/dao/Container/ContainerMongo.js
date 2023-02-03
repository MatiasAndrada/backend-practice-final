const  mongoose = require( 'mongoose');
const moment = require("moment")
const  config  = require( '../../config.js');

class ContainerMongo {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async getAll(){
        await mongoose.connect(config.dbConfig.mongodb.cnxStr, config.dbConfig.mongodb.options)
        try{
            const respuesta = await this.coleccion.find({})
            mongoose.connection.close()
            return respuesta
        }catch(err){
            throw new Error(`Error leer el ID de archivo: ${err}`)
        }
    }

    async getByCode(code){
        await mongoose.connect(config.dbConfig.mongodb.cnxStr, config.dbConfig.mongodb.options)
        try{
            const respuesta = await this.coleccion.find({code:{$eq: `${code}`}})
            mongoose.connection.close()
            return respuesta
        }catch(err){
            throw new Error(`Error leer el ID de archivo: ${err}`)
        }
    }
    
        async save(newObj){
        await mongoose.connect(config.dbConfig.mongodb.cnxStr, config.dbConfig.mongodb.options)
        try{
            let preSave = await this.getAll()
            let newId
            if(preSave.length == 0){
                newId = 1
            }else{
                newId = parseInt(preSave[preSave.length-1].id) + 1
            }
            let created_at = moment().format("DD/MM/YYYY HH:mm:ss")
            await this.coleccion.insertMany({id:newId, created_at:created_at, ...newObj})
            mongoose.connection.close()
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    }
    
    async saveAll(newArray){
        try{
            let preSave = await this.getAll()
            let newId
            if(preSave.length == 0){
                newId = 1
            }else{
                newId = parseInt(preSave[preSave.length-1].id) + 1
            }
            for(let i=0; i<newArray.length; i++){
                let timestamp = moment().format("DD/MM/YYYY HH:mm:ss")
                await this.coleccion.insertMany({id:newId, timestamp:timestamp, ...newArray[i]})
                newId++
            }
            mongoose.connection.close()   
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    }

    async putById(id,newObj){
        await mongoose.connect(config.dbConfig.mongodb.cnxStr, config.dbConfig.mongodb.options)
        try{
            await this.coleccion.updateOne({id:{$eq: `${id}`}}, {$set: newObj})
            mongoose.connection.close()
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    }

    async deleteById(x){
        await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)
        try{
            await this.coleccion.deleteOne({id:{$eq: `${x}`}})
            mongoose.connection.close()
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    }

    async deleteAll(){
        await mongoose.connect(config.dbConfig.mongodb.cnxStr, config.dbConfig.mongodb.options)
        try{
            await this.coleccion.deleteMany({})
            mongoose.connection.close()
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        }
    }
}

module.exports = ContainerMongo;