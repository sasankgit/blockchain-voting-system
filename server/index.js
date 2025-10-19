require('dotenv').config();

const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')

const ConsumerModel = require('./models/consumers.js')

const app = express()
app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL || "*", // fallback for testing
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

mongoose.connect(process.env.MONGO_STRING);

app.post('/login' , (req,res) =>{
    const {username,password} = req.body
    ConsumerModel.findOne({username : username})
    .then(user =>{
        if(user){
            if(user.password === password){
                res.json("success")
            }
            else{
                res.json("did not match password")
            }
        }
        else{
            res.json("user not found at all ehe")
        }
    })
    .catch(err => res.status(500).json(err))
})

app.post('/signup',(req,res) => {
    ConsumerModel.create(req.body)
    .then(Consumers => res.json(Consumer))
    .catch(err => res.json(err))

})

app.listen(3001 , () =>{
    console.log("server is running")
})