/*Configuración puerto */
process.env.PORT = process.env.PORT || 3000
/* */

/* Entorno */
process.env.NODE_ENV = process.env.NODE_ENV || "dev"
//se obtiene el entorno


//-------Base de datos------//
let urlDB

if (process.env.NODE_ENV == "dev"){
    urlDB = "mongodb://localhost:27017/cafe"
}
else{
    urlDB = "mongodb+srv://mongo_atlas:cLAB7Bcc5DM8QSsO@cluster0.a4qst.gcp.mongodb.net/cafe?retryWrites=true&w=majority"
}

process.env.URLDB= urlDB; 
//-----------Fin base de datos-------------//

//----Vencimiento del token-------//
//60sg*60min*24h*30d
process.env.CADUCIDAD_TOKEN=60*60*24*30;
//----//


//--SEMILLA---//
process.env.SEED = process.env.SEED || "este-es-el-seed-desarrollo"

//---fin semilla