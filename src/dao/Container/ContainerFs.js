const  fs = require( 'fs')
const moment = require("moment")
const  config =  require( '../../config')


class ContenedorFile{
    constructor(fileData){
        this.fileData = `${config.dbConfig.fileSystem.path}/${fileData}`;
    }


    
    async getAll(){
        try{
            const todos = await fs.promises.readFile(this.fileData,'utf-8')
            return JSON.parse(todos)
        }catch(err){
            return []
        } 
    }
    
    async getById(x){
        try{
            const idProductos = await this.getAll()           
            return idProductos.find(producto => producto._id == x);            
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        } 
    }
    
    async save(newObj){
        const informacion = await this.getAll()
        let newId
        if(informacion.length == 0){
            newId = 1
        }else{
            newId = parseInt(informacion[informacion.length-1]._id) + 1
        }
        let timestamp = moment().format('DD/MM/YYYY HH:mm');
        informacion.push({...newObj, _id: newId, timestamp: timestamp})
        try{
            await fs.promises.writeFile(this.fileData,JSON.stringify(informacion, null,2))
            return newId    
        }catch(error){
            throw new Error(`Error al guardar: ${error}`)
        }
    }
    async saveAll(newArray){
        try{

            await fs.promises.writeFile(this.fileData,JSON.stringify(newArray, null,2))    
        }catch(error){
            throw new Error(`Error al guardar el archivo: ${error}`)
        } 
    }

    async deleteAll(){
        console.log("no inicia")
        try{
            await fs.promises.writeFile(this.fileData,'[]')    
        }catch(error){
            throw new Error(`Error al eliminar el archivo: ${error}`)
        }            
    }

    async deleteById(x){
        console.log(0)
        try{
            const idProductos = await this.getAll()            
            const filterId = idProductos.filter((item) => item._id !== x)
            await fs.promises.writeFile(this.fileData,JSON.stringify(filterId, null,2)) 
        }catch(error){
            throw new Error(`Error al eliminar el objeto del archivo: ${error}`)
        }
    }
    async putById(x,newObj){
        try{
            const allProductos = await this.getAll()             
            const index = allProductos.map(producto => producto._id).indexOf(x)
            allProductos[index] = {...newObj, _id: x}
            await fs.promises.writeFile(this.fileData,JSON.stringify(allProductos, null,2))
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        } 
    }
    async update(newObj){
        try{
            const allProductos = await this.getAll()             
            const index = allProductos.map(producto => producto._id).indexOf(newObj._id)
            allProductos[index] = {...newObj}
            await fs.promises.writeFile(this.fileData,JSON.stringify(allProductos, null,2))
        }catch(error){
            throw new Error(`Error leer el ID de archivo: ${error}`)
        } 
    }

}

module.exports = ContenedorFile