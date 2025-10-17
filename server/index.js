const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')

const ConsumerModel = require('./models/Consumers.js')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/for-me");

app.post('/signup',(req,res) => {
    ConsumerModel.create(req.body)
    .then(Consumers => res.json(Consumer))
    .catch(err => res.json(err))

})

app.listen(3001 , () =>{
    console.log("server is running")
})