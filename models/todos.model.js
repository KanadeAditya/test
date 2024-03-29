const express = require("express");
const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:Boolean,required:true},
    authorID:{type:String,required:true}
})

const TodoModel = mongoose.model("todo",todoSchema);

module.exports = {TodoModel}