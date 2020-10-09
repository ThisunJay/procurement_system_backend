const User = require('../Models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.create = async (req, res) => {

    const saltRounds = 10;
    let pwd = '';
    pwd = await bcrypt.hash(req.body.password, saltRounds);
    
    const new_user = new User({
        username: req.body.username,
        email: req.body.email,
        password: pwd,
        role: req.body.role,
    });

    new_user.save().then(data => {
        return res.status(200).send({
            data: data,
            success: true,
            message: 'Successfully Added!'
        });
    }).catch(err => {
        res.status(500).send({
            data: null,
            success: false,
            message: err.message || "Some error occurred while creating the user."
        });
    });
}

exports.signin = async (req, res) => {
    console.log(req.body);
    const user_details = await User.findOne({ email: req.body.username});
    console.log(user_details);
    if (user_details === null) {
        return res.status(406).send({
            data: null,
            success: false,
            message: 'No user found',
        });
    } else {
        const isEqual = await bcrypt.compare(req.body.password, user_details.password)
        if (!isEqual) {
            return res.status(406).send({
                data: null,
                success: false,
                message: 'Password is incorrect',
            });
        } else {
            const token = jwt.sign({ username: user_details.username, email: user_details.email, role: user_details.role }, "abcdefghijklmnopqrstuvwxyz", { expiresIn: '240h' });
            return res.status(200).send({
                data: { "token": token, "role": user_details.role, "email": user_details.email },
                success: true,
                message: 'Successfully login',
            });
        }
    }
}

exports.resetPwd = async (req, res) => {
    const {email, oldPassword, newPassword} = req.body;

    let getUser = await User.findOne({email: email});

    if(getUser == null) {
        return res.status(404).send({
            data: null,
            success: false,
            message: err.message || "User not found!"
        });
    }
    
    if(bcrypt.compare(oldPassword, getUser.password)){
        
        let enPwd = await bcrypt.hash(newPassword, 10);

        getUser.password = enPwd;

        getUser.save().then(data => {
            return res.status(200).send({
                data: data,
                success: true,
                message: 'Successfully Updated the Password!'
            });
        }).catch(err => {
            res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while updating the password."
            });
        })
    }
    else{
        res.status(401).send({
            data: null,
            success: false,
            message: "old password and new password does not match"
        });
    }
}