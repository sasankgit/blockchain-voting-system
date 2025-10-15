const express = require("express")
const mongoose = requires('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/for-me");

app.listen(3001 , () =>{
    console.log("server is running")
})