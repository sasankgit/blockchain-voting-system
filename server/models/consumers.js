const mongoose = require('mongoose')

const ConsumerSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const ConsumerModel = mongoose.model("consumers", ConsumerSchema)

module.exports = ConsumerModel