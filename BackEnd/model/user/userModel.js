const mongoose = require("mongoose")
const Schema = mongoose.Schema
const model = mongoose.model


const userSchema = new Schema({
    firstName: {
        type: "String",

    },
    lastName: {
        type: "String",

    },
    emailId: {
        type: "String"
    },
    dob: {
        type: "String"
    },
    age: {
        type: "Number"
    },
    phoneNo: {
        type: "Number"
    },
    address: {
        type: "String"
    }
})

module.exports = model("user", userSchema)