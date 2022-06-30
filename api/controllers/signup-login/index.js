require('../../../configs/env.config');
const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
const fs = require('fs');
const jwt = require('jsonwebtoken');
const User = require("../../models/User/User");
const { authenticateJWT } = require("../auth");
// This token_key is same to auth file token_key
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

// User login for getting token
exports.login_user = async (req, res) => {
    const {email, password} = req?.body;
    console.log({email, password});
    if(!email || !password) {
        return res.status(406).json({
            status: false,
            message: "Email or password are missing",
        })
    }
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({status: false, message: "User not found"});
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            return res.status(400).json({status: false, message: "Incorrect password"});
        }
        // console.log({user});

        
        const tokenObject = {email: user?.email, full_name: user?.full_name, phone: user?.phone};
        const accessToken = jwt.sign(tokenObject, accessTokenSecret);
        // console.log({user: user?._doc});
        const result = user?._doc;
        const dataObj = {
            remember_token: accessToken,
        };
        await User.updateOne({email}, dataObj);
        delete result.password;
        // delete result.role_id;
        delete result.remember_token;
        return res.status(200).json({status: true, data: result, accessToken})
        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error?.message || "Server error"
        })
    }

};

// User registration
exports.sign_up_user = async (req, res) => {
    const {body, files} = req;
    // console.log("====Body====", {body});
    const {password, confirm_password, email} = body;
    delete body.remember_token;
    
    if( password !== confirm_password ){
        return res.status(406).json({
            status: false,
            message: password.length < 5 ? "Password length should be greater than 4 !!!" : "Your password and confirm password are matched",
        })
    }else{
        
        try {
            const already_exist_user = await User.findOne({email});
            if(already_exist_user){
                return res.status(409).json({
                    status: false,
                    message: "Email already exists",
                });
            } else{
                // console.log({files});
                const user_body = body;
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                user_body.password = hashedPassword;
                const newUser = new User(user_body);
                const res_signup = await newUser.save();
                const result = res_signup?._doc;
                console.log({result});
                if(result){
                    return res.status(200).json({
                        status: true,
                        message: "The user is successfully signed up",
                        // data: result,
                    });
                }
                return res.status(403).json({
                    status: false,
                    message: "Server error",
                })
            }

        } catch (error) {
            res.status(500).json({
                status: false,
                message: error?.message || "Something wrong",
            })
        }
    }
};

// User logout for removing token from db
exports.logout_user = async(req, res, next) => {
    await authenticateJWT(req, res);
    if(req?.auth){
        const {token, user, remember_token} = req;
        try {
            // const filter_tokens = await remember_token?.filter(t => t != token);
            await User.updateOne({email: user?.email}, {remember_token: "", is_active: false});
            return res.status(200).json({
                status: true,
                message: "User is logged out successfully!!!",
            })
            
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error?.message || "Server error",
            })
        }
    }else{
        const err = new Error("User is not logged in");
        err.status = 401;
        return next(err);
    }
};
