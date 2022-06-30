const express = require("express");
const { get_billing_list, create_billing_method, update_billing_method, delete_billing_method } = require("../../controllers/payment");
const router = express.Router();

// Get all billing methods
router.post("/billing-list", get_billing_list);

// Create a new billing method
router.post('/add-billing', create_billing_method);

// Update a billing method
router.post('/update-billing/:id', update_billing_method);

// Delete a billing method
router.delete('/delete-billing/:id', delete_billing_method);

module.exports = router;