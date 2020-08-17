
const jwt = require("jsonwebtoken");

//Verificar token

let verificaToken= (req,res,next)=>{
    let token = req.get("token"); 
    let SEED = process.env.SEED;
    jwt.verify(token,SEED,(err, decoded) => {
        if (err){
            return res.status(402).json({
                ok:false,
                err
            });
        }
        req.usuario = decoded.usuario
        next();
    })
    

}

let verificaAdminRole = (req,res,next) => {
    let {role} = req.usuario;
    if (role != "ADMIN_ROLE"){
        return res.status(401).json({
            ok:false,
            message:"role no valido"
        })
    }
    next();
}
module.exports = {
    verificaToken,
    verificaAdminRole
}