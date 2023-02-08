const db = require("../../firebaseConfig")
class ContainerFirebase {
  constructor(collection) {
    this.coleccion = db.collection(collection);
  }

  async getAll() {
    try {
      const respuesta = await this.coleccion.get();
      if (respuesta.empty) {
        return [];
      }
      return respuesta.docs.map((documento) => ({
        _id: documento.id,
        ...documento.data(),
      }));
    } catch (error) {
      throw new Error(`Error al leer los archivos: ${error}`);
    }
  }

  async getById(id) {
    try {
      const respuesta = await this.coleccion.doc(id).get();
      if (!respuesta.exists) {
        return null;
      }
      return { _id: respuesta.id, ...respuesta.data() };
    } catch (error) {
      throw new Error(`Error al leer el ID de archivo: ${error}`);
    }
  }

  async save(object) {
    try {
      const respuesta = await this.coleccion.add(object);
      return respuesta.id;
    } catch (error) {
      throw new Error(`Error al guardar el archivo: ${error}`);
    }
  }
  async updateById(id, object) {
    try {
      await this.coleccion.doc(id).update(object);
    } catch (error) {
      throw new Error(`Error al actualizar el archivo: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      await this.coleccion.doc(id).delete();
    } catch (error) {
      throw new Error(`Error al borrar el archivo: ${error}`);
    }
  }
  async deleteAll() {
    try {
      const respuesta = await this.coleccion.get();
      respuesta.docs.forEach((documento) => {
        this.coleccion.doc(documento._id).delete();
      });
    } catch (error) {
      throw new Error(`Error al borrar los archivos: ${error}`);
    }
  }
}

module.exports = ContainerFirebase;




