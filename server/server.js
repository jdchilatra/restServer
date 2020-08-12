const express = require("express");
const mongoose = require("mongoose");

require("./config/config");

const app = require("./routes/usuario");





mongoose.connect(process.env.URLDB,
                    {useCreateIndex:true, useCreateIndex:true}
                    , (err,res) => {
    if (err) throw err;

    console.log("conectado");
})

app.listen(process.env.PORT,() => {
    console.log("escuchando p 3000")
})