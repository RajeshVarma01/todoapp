const mongoose = require("mongoose")
const todoInfo = new mongoose.Schema({
todo: {
    type: String,
    trim: true,
},
})
const todoInformation = new mongoose.model("todoInfo", todoInfo);
module.exports = todoInformation