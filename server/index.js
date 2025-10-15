const express = require("express")
const mongoose = requires('mongoose')
const cors = require('cors')

const ConsumerModel = require('./models/Consumer')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/for-me");

app.post('/',(req,res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(Consumer))
    .catch(err => res.json(err))

})

app.listen(3001 , () =>{
    console.log("server is running")
})