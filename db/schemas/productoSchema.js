//cargamos la libreria
let mongoose = require("mongoose");
//cargamos la clase de esquema
let Schema = mongoose.Schema;
//definir la configuracion del esquema
let schemaConfig = {
    Producto: String,
    precio: String, //    carpetafFotosServidor/foto_usuario_lk12klbh1skdjasd.jpg
    Proveedor: String,
    Tipo: String,
    Imagen: String,
};
// Object of schema
const productoSchema = new Schema(schemaConfig);
// Model creation
let ProductoModel = mongoose.model("producto", productoSchema);

async function createProducto(productoNew) {
    try {
        //definicion de modelo
        let newProducto = new UserModel();
        //llenado del modelo
        // newProducto.idProducto = productoNew.idProducto;
        newProducto.Producto = productoNew.Producto;
        newProducto.precio = productoNew.precio;
        newProducto.Proveedor = productoNew.Proveedor;
        newProducto.Tipo = productoNew.Tipo;
        newProducto.Imagen = productoNew.Imagen;
        //guardado del modelo
        let result = await newProducto.save();
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}
async function deleteProducto(id) {
    try {
        let result = await ProductoModel.findByIdAndRemove(id).exec();
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

async function findProductoById(id) {
    try {
        let cursor = ProductoModel.findById(id).cursor();
        let producto = await cursor.next();
        return producto;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

async function getAllProductos() {
    try {
        //definicion de modelo
        let filter = {};
        let cursor = ProductoModel.find(filter).cursor();
        let result = [];
        let currentProducto = await cursor.next();
        while (currentProducto != null) {
            result.push(currentProducto);
            currentProducto = await cursor.next();
        }
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

async function updateProducto(updateProducto) {
    try {
        let result = await ProductoModel.updateOne(
            { _id: updateProducto._id },
            {
                $set: {
                    Producto: updateProducto.Producto,
                    precio: updateProducto.precio,
                    Proveedor: updateProducto.Proveedor,
                    Tipo: updateProducto.Tipo,
                    Imagen: updateProducto.Imagen
                },
            }
        );
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

module.exports = {
    productoSchema,
    createProducto,
    deleteProducto,
    getAllProductos,
    findProductoById,
    updateProducto,
};