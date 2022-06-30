const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
        full_name: {
            type: String,
            min: 2,
            max: 20,
            default: "",
        },
        email: {
            type: String,
            max: 20,
            length: 20,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            max: 15,
            length: 15,
            default: ""
        },
        password: {
            type: String,
            min: 5,
            max: 15,
            length: 15,
        },
        address: {
            type: String,
            default: ""
        },
        gender: {
            type: String,
            max: 10,
            length: 10,
            default: ""
        },
        remember_token: {
            type: String
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);