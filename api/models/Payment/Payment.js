const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
    {
        bill_id: {
            type: String,
            required: true,
            unique: true,
        },
        full_name: {
            type: String,
            min: 2,
            max: 20,
            required: true,
        },
        email: {
            type: String,
            max: 20,
            length: 20,
            required: true,
        },
        phone: {
            type: String,
            max: 15,
            length: 15,
            default: "",

        },
        paid_amount: {
            type: Number,
            default: 0,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);