const express = require("express");
const { 
    user_update_by_user, 
    find_all_users, 
    find_user_by_email, 
    delete_user,
    find_user_details, 
} = require("../../controllers/user");
const router = express.Router();

// User update only for user
router.post('/user/update', user_update_by_user);

// Get all users
router.get('/user/all', find_all_users);

// Find a user by the user email
router.get('/user/find-one/:email', find_user_by_email);

// User delete only for admin
router.delete('/user/delete', delete_user);

// Find user details by token
router.get('/user', find_user_details);


module.exports = router;
