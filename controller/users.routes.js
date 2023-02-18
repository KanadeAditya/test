const {UserModel} = require("../models/users.model.js");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userRouter = express.Router();
userRouter.use(express.json())

userRouter.get("/",async (req,res)=>{
    const alluser = await UserModel.find();
    res.send(alluser);
})

userRouter.post("/signup",async (req,res)=>{
    const {email,password,name} = req.body;
    try {
        const exsistuser = await UserModel.find({email});
        if(exsistuser.length){
            res.send({"msg":"User already exists with this email"})
        }else{
            bcrypt.hash(password, 5, (err, hash)=>{
                // Store hash in your password DB.
                if(err){
                    console.log(err)
                    res.send({"msg":"Something went wrong",error:err});
                
                }else{
                    const newUser = new UserModel({name,email,password:hash});
                    newUser.save();
                    res.send({"msg":"User registered Successfully"});
                }
            });
        }
    } catch (error) {
        res.send({"msg":"Something went wrong",error:error});
    }
})

userRouter.post("/login",async (req,res)=>{
    try {
        const {email,password} = req.body;
        const exsistuser = await UserModel.find({email});
        if(exsistuser.length){
            bcrypt.compare(password, exsistuser[0].password, (err, result)=>{
                // result == true/false
                if(err){
                    console.log(err)
                    res.send({"msg":"Something went wrong",error:err});
                }else{
                    if(result){
                        const ID = exsistuser[0]._id;
                        let token = jwt.sign({userID:ID}, process.env.secretkey , { expiresIn: '2h' });
                        res.send({"msg":"User logged in Successfully",token:token});
                    }else{
                        res.send({"msg":"Wrong Credentials"});
                    }
                }
            });
        }else{
            res.send({"msg":"User email does not exists "});
        }
    } catch (error) {
        res.send({"msg":"Something went wrong",error:error});
    }
})



module.exports = {userRouter};