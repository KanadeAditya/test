require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticator = (req,res,next)=>{
    const token = req.headers.authorization ;
    if(token){
        jwt.verify( token, process.env.secretkey , (err, decoded)=>{
           if(err){
                console.log(err.message);
                res.send({msg:"Authentication Unsuccessfull",status:false,error:err.message});
           }else{
                req.body.authorID = decoded.userID;
                next()
           }
        })
    }else{
        res.send({msg:"Authentication token not provided",status:false});
    }
}

module.exports = {authenticator};