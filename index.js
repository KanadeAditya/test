const express = require("express");
require("dotenv").config();
const {connection} = require("./db.js")
const {userRouter} = require('./controller/users.routes.js')
const {todosRouter}= require("./controller/todos.routes.js");
const app = express();
app.use(express.json());

app.use("/users",userRouter);
app.use("/todos",todosRouter);

app.get("/",(req,res)=>{
    res.send("HOME PAGE");
})

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("server is running and connected to Mongo DB Atlas")
    } catch (error) {
        console.log(error);
    }
})
