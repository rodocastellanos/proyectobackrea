console.log("Cargando configuracion...");
//Importar las dependencias
const express = require("express");
var bodyParser = require("body-parser");
let cosr = require("cors");

//Cargar configuracion app WEB
//const PORT = process.env.PORT || 3500;
const appConfig = require("./config");

console.log("Inicializar la Aplicacion WEB...");
//Inicializar una APLICACION WEB
require("./db/dbInitializer");
const app = express();

// 1) Metodo HTTP (verbos HTTP)
// 2) RUTA (VIrtual)
// 3) EL ALGORITMO QUE YO PROGRAMO PARA RESPONDER ESA PETICION

console.log("Configurando Routers...");
// const userDummyRouter = require("./router/routerDummyUser");
const userRouter = require("./router/routerUser");
const productoRouter = require("./router/routerProducto");

//Configurar Routers en la APP
app.use(bodyParser.json());
app.use(cosr());

// app.use("/api/usuariosDummy", userDummyRouter);
app.use("/api/usuarios", userRouter);
app.use("/api/productos", productoRouter)

app.get(
    "/",

    function (req, res) {
        res.send("Home Page!");
    }
);

app.use("/app", express.static("front"));
app.use("/static", express.static("front/static"));

console.log("Iniciando Servidor");

let server = app.listen(
    appConfig.PORT,

    function () {
        console.log(
            `La aplicacion WEB esta escuchando en el PUERTO: ` + appConfig.PORT
        );
    }
);

//AXIOS -> permite hacer peticiones HTTP
