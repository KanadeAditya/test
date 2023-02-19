const {TodoModel} = require("../models/todos.model.js");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const {authenticator} = require("../middlewares/authenticate.js");
const todosRouter = express.Router();
todosRouter.use(cors());
todosRouter.use(express.json());
todosRouter.use(authenticator);

todosRouter.get("/",async (req,res)=>{
    let todo = await TodoModel.find()
    res.send(todo)
})

todosRouter.get("/mytodos",async (req,res)=>{
    try {
        let ID = req.body.authorID;
        let todo = await TodoModel.find({authorID:ID})
        res.send(todo);
    } catch (error) {
        res.send({"msg":"Something went wrong",error:error});
    }
})

todosRouter.post("/create",async (req,res)=>{
    try {
        const payload = req.body;
        const newtodo = new TodoModel(payload);
        newtodo.save();
        res.send({"msg":"New Todo Was completed"});
    } catch (error) {
        res.send({"msg":"Something went wrong",error:error});
    }
})

todosRouter.patch("/update/:id",async (req,res)=>{
    try {
        const ID = req.params.id;
        const payload = req.body;
        await TodoModel.findByIdAndUpdate({_id:ID},payload);
        res.send({"msg":"Todo was Updated"});
    } catch (error) {
        res.send({"msg":"Something went wrong",error:error});
    }
})

todosRouter.delete("/delete/:id",async (req,res)=>{
    try {
        const ID = req.params.id;
        await TodoModel.findByIdAndDelete({_id:ID});
        res.send({"msg":"Todo was Deleted"});
    } catch (error) {
        res.send({"msg":"Something went wrong",error:error});
    }
})


module.exports = {todosRouter};