const User = require("../../models/User/User");
const { authenticateJWT } = require("../auth");

// User will find his/her details by accessToken
exports.find_user_details = async(req, res) => {
    await authenticateJWT(req, res);
    if(req?.auth){
        const user_details = req?.user_details;
        return res.status(200).json({
            status: true,
            message: "User is found",
            data: user_details,
        });
    }else{
        return res.status(404).json({
            status: false,
            message: "User is unauthorized to find user details!!!",
        });
    }
}

// User update only for user
exports.user_update_by_user = async (req, res) => {
    await authenticateJWT(req, res);
    if (req?.auth) {
        const { body: user_body, files } = req;
        let { email: user_email } = user_body;
        const { email: param_email } = req?.query;
        const email = user_email || param_email;
        const existing_user = await User.findOne({ email }).select("-remember_token -password");
        if (!existing_user) {
            return res.status(404).json({
                status: false,
                message: "User is not found to update!!!",
            })
        }
        try {
            const result = await User.updateOne({ email }, user_body);
            console.log({ result });
            if (result) {
                const updated_user = await User.findOne({ email }).select("-password -remember_token");
                // console.log({ updated_user });
                return res.status(200).json({
                    status: true,
                    message: "User is updated!!!",
                    data: updated_user,
                });

            }
            return res.status(404).json({
                status: false,
                message: "User isn't found to update!!!"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error?.message || "Something wrong to update this user"
            })

        }
    }else{
        return res.status(401).json({
            status: false,
            message: "User is unauthorized to update user!!!",
        });
    }
};

// Find all users
exports.find_all_users = async (req, res) => {
    await authenticateJWT(req, res);
    if (req?.auth) {
        try {
            const users = await User.find({})
                .select("-password -remember-token");

            console.log({ user_length: users?.length });
            if (users?.length) {
                return res.status(200).json({
                    status: true,
                    data: users,
                })
            }
            return res.status(200).json({
                status: false,
                message: "There is no user!!!",
                data: []
            })

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error?.message || "Server error!!!"
            })
        }
    }else{
        return res.status(401).json({
            status: false,
            message: "User is unauthorized to find users!!!",
        });
    }
}

// Find user by user email
exports.find_user_by_email = async (req, res) => {
    await authenticateJWT(req, res);
    if (req?.auth) {
        const { email: user_email } = req?.body;
        console.log({ user_email: req?.body });
        const  { email: query_email } = req?.query;
        const {email: param_email} = req?.params;
        const email = user_email || query_email || param_email;
        try {
            const findObj = {email};
            console.log({findObj});
            const user = await User.findOne(findObj)
                .select("-password -remember-token");

            console.log({ user_length: user });
            if (user) {
                return res.status(200).json({
                    status: true,
                    data: user,
                })
            }
            return res.status(404).json({
                status: false,
                message: "There is no user by this email!!!"
            })

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error?.message || "Server error!!!"
            })
        }
    }else{
        return res.status(401).json({
            status: false,
            message: "User is unauthorized to find user!!!",
        });
    }
}

// User delete
exports.delete_user = async (req, res) => {
    await authenticateJWT(req, res);
    if (req?.auth) {
        try {
            let {email} = req?.query;
            console.log(email);
            const exits_user_res = await User.findOne({ email });
            console.log({exits_user_res});
            if (exits_user_res) {
                const user_delete_res = await User.deleteOne({ email });
                if (user_delete_res) {
                    return res.status(200).json({
                        status: true,
                        message: "The user is successfully deleted!!!",
                    });
                }
                return res.status(404).json({
                    status: false,
                    message: "The user isn't deleted!!!"
                })
            }
            return res.status(404).json({
                status: false,
                message: "The user isn't exists to delete by this email"
            })

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error?.message || "Server error!!!"
            })
        }
    }else{
        return res.status(401).json({
            status: false,
            message: "User isn't authorized to delete user!!!"
        })
    }
}


