//started a server
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())
app.listen(4000, () => {
    console.log("server started on port no 4000")
})

//connecting database to our application after creating schema
const todoDetails = require("./Model/todoRecord")
const todoInformation = require("./Model/todoData")
const mongoose = require("mongoose")
const DB_URL = "mongodb+srv://todoapp:todoapp@cluster0.hh7iwhc.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(DB_URL).then((db, err) => {
    if(err) throw err
    else{
        console.log("todoDB connected successfully")
    }
})
const middleware = require("./middleware")
const jwt = require("jsonwebtoken")
// const { AddTodo } = require("../client/src/Components/AddTodo")
// const AddTodo = require("/backend/new-trainer-practise/todoapp-mernproject/client/src/Components/AddTodo")
//performing CRUD operations at backend

//GET
app.get("/", async (req, res) => {
    const details = await todoInformation.find({})
    res.send(details)
})

app.post("/add", async (req, res) => {
    try{
        await todoInformation.create(req.body)
        res.send("Data posted to todb successfully📥")
    }catch(e){
        console.log(e)
    }
})

//PATCH

app.patch("/update/:id", async (req, res) => {
    try{
        await todoInformation.findByIdAndUpdate(req.params.id, req.body)
        res.send("Data updated successfully🤩")
    }catch(e){
        console.log(e)
    }
})

//DELETE

app.delete("/:id", async (req, res) => {
    try{
        await todoInformation.findByIdAndDelete(req.params.id)
        res.send("Data deleted from db successfully📤")
    }catch(e){
        console.log(e)
    }
})

//CRUD operations completed 

//Generating jsonwebtoken to our data
//posting data to db to register
app.post("/register", async (req, res) => {
    try{
        const { email, password, confirmpassword } = req.body
        let emailExist = await todoDetails.findOne({email})
        if(emailExist){
            console.log("heloo in email")
            return res.status(400).send("User already exist")
        }
        if(password !== confirmpassword){
            return res.status(400).send("Password and confirm password should be same")
        }else{
            await todoDetails.create(req.body)
            return res.status(200).send("Registration successful")
        }
    }catch(e){
        console.log(e)
    }
})

//allowing user to db [login] only after the middleware conditions are satisfied

app.post("/login", async (req, res) => {
    try{
        let { email, password } = req.body
        let exist = await todoDetails.findOne({email})
        if(!exist){
            return res.status(400).send("user doesn't exist")
        }
        if(exist.password !== password){
            return res.status(400).send("Password incorrect")
        }
        let payload = {
            user: {
                id: exist.id,
                email: exist.email
            }
        }
        jwt.sign(payload, "jwtSecret", {expiresIn: "1m"}, (err, token) => {
            if(err) throw err
            return res.json({token})
        })
    }catch(e){
        console.log(e)
    }
})

app.get("/addtodo", middleware, async (req, res) => {
    try{
        let exist = await todoDetails.findById(req.user.id)
        if(!exist){
            return res.status(404).send("Token not matched")
        }
        res.json({exist})
    }catch(e){
        console.log(e)
    }
})

//for updating from frontend we need some backend route

app.get('/update/:id', async (req, res) => {
    let edittodo
    try{
        edittodo = await todoInformation.findById(req.params.id, req.body)
        res.send(edittodo)
    }catch(e){
        console.log(e)
    }if(!edittodo){
        res.status(400).json({message:"Data not found"})
    }
})