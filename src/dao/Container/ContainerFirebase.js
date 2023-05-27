const db = require("../../firebaseConfig");
class ContainerFirebase {
  constructor(collection) {
    this.colección = db.collection(collection);
  }

  async getAll() {
    try {
      const respuesta = await this.colección.get();
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
      const respuesta = await this.colección.doc(id).get();
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
      const respuesta = await this.colección.add(object);
      return respuesta.id;
    } catch (error) {
      throw new Error(`Error al guardar el archivo: ${error}`);
    }
  }
  async saveAll(array) {
    try {
      array.forEach(async (element) => {
        await this.colección.add(element);
      });
    } catch (error) {
      throw new Error(`Error al guardar el archivo: ${error}`);
    }
  }

  async updateById(id, object) {
    try {
      await this.colección.doc(id).update(object);
    } catch (error) {
      throw new Error(`Error al actualizar el archivo: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      await this.colección.doc(id).delete();
    } catch (error) {
      throw new Error(`Error al borrar el archivo: ${error}`);
    }
  }
  async deleteAll() {
    try {
    const respuesta = await this.colección.get();
    if (respuesta.empty) {
      return [];
    }
    respuesta.docs.forEach(async (documento) => {
      await this.colección.doc(documento.id).delete();
    });

    } catch (error) {
      throw new Error(`Error al borrar los archivos: ${error}`);
    }
  }
}

module.exports = ContainerFirebase;
