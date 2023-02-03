//Crear un dto de productos con static

const { json } = require("express");


class ProductoDto {
id;
name;
description;
price;

constructor({id, name, description, price}) {
this.id = id;
this.name = name;
this.description = description;
this.price = price;
}
static fromJson(json){
    const datos = JSON.parse(json)
    return new ProductoDto(datos)
}

toJson(){
    return JSON.stringify(this)

}
}

module.exports = ProductoDto;
