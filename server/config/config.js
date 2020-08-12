/*Configuración puerto */
process.env.PORT = process.env.PORT || 3000
/* */

/* Entorno */
process.env.NODE_ENV = process.env.NODE_ENV || "dev"
//se obtiene el entorno

let urlDB

if (process.env.NODE_ENV == "dev"){
    urlDB = "mongodb://localhost:27017/cafe"
}
else{
    urlDB = "mongodb+srv://mongo_atlas:cLAB7Bcc5DM8QSsO@cluster0.a4qst.gcp.mongodb.net/cafe?retryWrites=true&w=majority"
}

process.env.URLDB= urlDB; 