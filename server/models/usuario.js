const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
    values:["ADMIN_ROLE","USER_ROLE"],
    message:"{VALUE} no es un role valido"
}
let usuarios = new Schema({
    nombre:{
        type:String,
        required:[true,"El nombre es necesario"]
    },
    email:{
        type:String, 
        unique:true,
        required:[true,"El correo es necesario"]
    },
    password:{
        type:String,
        required:[true,"Contraseña obligatoria"]
    },
    img:{
        type:String,
        required:false
    },
    role:{
        type:String,
        default:"USER_ROLE",
        enum: rolesValidos
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});

usuarios.methods.toJSON = function() {
    let user = this;
    let useObject = user.toObject();
    delete useObject.password;

    return useObject;
}

usuarios.plugin(uniqueValidator,{message:"El correo ya existe"});

module.exports = mongoose.model("Usuario",usuarios);
