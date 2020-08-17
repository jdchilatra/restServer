const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("./config/config");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(require("./routes/index"));




mongoose.connect(process.env.URLDB,
                    {useCreateIndex:true, useCreateIndex:true}
                    , (err,res) => {
    if (err) throw err;

    console.log("conectado");
})

app.listen(process.env.PORT,() => {
    console.log("escuchando p 3000")
})