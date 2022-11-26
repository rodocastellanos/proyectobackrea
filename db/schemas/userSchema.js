//Cargamos libreria
let mongoose = require("mongoose");
//cargamos la clase Schema
let Schema = mongoose.Schema;
//Definir la configuracion del Schema

let schemaConfig = {
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    tipoUsuario: String,
};

//creacion del objeto schema
const userSchema = new Schema(schemaConfig);

//creación del modelo
let UserModel = new mongoose.model("usuario", userSchema);

async function createUser(UsernewUser) {
    try {
        //definicion del modelo
        let newUser = new UserModel();
        //llenado del modelo
        newUser.firstName = UsernewUser.firstName;
        newUser.lastName = UsernewUser.lastName;
        newUser.email = UsernewUser.email;
        newUser.password = UsernewUser.password;
        newUser.username = UsernewUser.username;
        newUser.tipoUsuario = UsernewUser.tipoUsuario;
        //guardado del modelo
        let result = await newUser.save();
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

async function updateUser(updateUser) {
    try {
        let result = await UserModel.updateOne(
            { _id: updateUser._id },
            {
                $set: {
                    firstName: updateUser.firstName,
                    lastName: updateUser.lastName,
                    password: updateUser.password,
                    email: updateUser.email,
                    username: updateUser.username,
                    tipoUsuario: updateUser.tipoUsuario,
                },
            }
        );
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}
async function deleteUser(id) {
    try {
        let result = await UserModel.findByIdAndRemove(id).exec();
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}
async function getAllUser() {
    try {
        let filter = {};
        let cursor = UserModel.find(filter).cursor();
        let result = [];
        let currentUser = await cursor.next();
        while (currentUser != null) {
            result.push(currentUser);
            currentUser = await cursor.next();
        }
        return result;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}
async function findUserById(id) {
    try {
        let cursor = UserModel.findById(id).cursor();
        let user = await cursor.next();
        return user;
    } catch (ex) {
        console.log(ex);
        return {};
    }
}

module.exports = {
    userSchema,
    createUser,
    getAllUser,
    deleteUser,
    findUserById,
    updateUser,
};
