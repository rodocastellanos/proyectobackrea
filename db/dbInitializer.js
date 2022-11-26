//cargar libreria
let mongoose = require("mongoose");

// cargar configuracion
let appConfig = require("../config");

let connectionPrommise = mongoose.connect(appConfig.fullUrl);

connectionPrommise
    .then(function (result) {
        console.log("DB Conneccition successfully");
        console.log(result);
    })
    .catch(function (err) {
        console.log("Error connecction DB");
        console.log(err);
    });
