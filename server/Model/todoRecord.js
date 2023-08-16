const mongoose = require("mongoose")
const todoFields = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    confirmpassword: {
        type: String
    },
});
const todoDetails = new mongoose.model("todoFields", todoFields);
module.exports = todoDetails