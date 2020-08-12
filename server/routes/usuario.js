const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const _ = require("underscore");

const Usuario = require("../models/usuario.js");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.get("/usuario", (req,res) => {
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;
    let estado ={estado:true}

    desde = Number(desde);
    limite = Number(limite)


    
    Usuario.find(estado,"nombre email estado google")
    .skip(desde)
    .limit(limite)
    .exec((err,usuarios) => {
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            })
        }
        Usuario.count(estado,(err,conteo) => {
            res.json({
                ok:true,
                usuarios,
                conteo
            })
        })
        
    })
})

app.post("/usuario", (req,res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre:body.nombre,
        email:body.email,
        password:bcrypt.hashSync(body.password,10),
        role:body.role
    });
    usuario.save((err,usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            usuario:usuarioDB
        })

    })
})

app.put("/usuario/:id", (req,res) => {
    let id=req.params.id;
    let body = _.pick(req.body,["nombre","email","img","role","estado"]) ;
    let options = {
        new:true,
        runValidators:true
    }

    Usuario.findByIdAndUpdate(id,body,options ,(err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            usuario:usuarioDB
        })
    })
    
})

app.delete("/usuario/:id", (req,res) => { //Cambia el estado de la bandera a false
    let id = req.params.id;
    let estado = {
        estado:false
    }
    let options = {
        new:true
    }
    Usuario.findByIdAndUpdate(id,estado,options,(err,usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            })
        }
        if (!usuarioBorrado){
            return res.status(400).json({
                ok:false,
                err:"Usiario no encontrado"
            })
        }

        res.json({
            ok:true,
            usuario:usuarioBorrado
        })
    })
})

// app.delete("/usuario/:id", (req,res) => { //Borra usuario de la DB
//     let id = req.params.id;

//     Usuario.findByIdAndRemove(id,(err,usuarioBorrado) => {
//         if (err) {
//             return res.status(400).json({
//                 ok:false,
//                 err
//             })
//         }
//         if (!usuarioBorrado){
//             return res.status(400).json({
//                 ok:false,
//                 err:"Usiario no encontrado"
//             })
//         }

//         res.json({
//             ok:true,
//             usuario:usuarioBorrado
//         })
//     })
// })

module.exports = app;