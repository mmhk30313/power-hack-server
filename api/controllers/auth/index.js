const jwt = require('jsonwebtoken');
const User = require('../../models/User/User');
require('../../../configs/env.config');
const accessTokenSecret = "secrete-power-hack";

// User Login for getting token
const authenticateJWT = async(req, res, next) => {
    const authHeader = req?.headers?.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const user_res = await User.findOne({remember_token: token}).select('-password');
        // console.log("====",{user_res});
        if(!user_res){
            res.json({
                status: false,
                message: "User is unauthorized!!!"
            });
        }else{
            const {remember_token} = user_res;
            
            jwt.verify(token, accessTokenSecret, (err, user) => {
                if (err) {
                    return res.json({
                        status: false,
                        message: "User is unauthorized!!!"
                    });
                }
                req.user = user;
                req.user_details = user_res;
                req.auth = true;
                req.token = token;
                req.remember_token = remember_token;
                console.log({user: user});
                console.log("====Token====", token);
            });

        }
    } else {
        req.auth = false;
        req.user = null;
        req.user_details = null;
        req.token = null;
        req.remember_token = null;
    }
};

exports.authenticateJWT = authenticateJWT;