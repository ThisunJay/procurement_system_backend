const User = require('../Models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.create = async (req, res) => {
    console.log(req.body.data);
    const saltRounds = 10;
    let pwd = '';
    pwd = await bcrypt.hash(req.body.data.password, saltRounds);


    if (req.body.data.role == 1) {
        const new_user = new User({
            username: req.body.data.username,
            email: req.body.data.email,
            password: pwd,
            role: req.body.data.role,
            site_location: req.body.data.site_location,
            site_code: req.body.data.site_code,
            contact_number: req.body.data.contact_number
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
    } else {
        const new_user = new User({
            username: req.body.data.username,
            email: req.body.data.email,
            password: pwd,
            role: req.body.data.role,
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

 
}

exports.signin = async (req, res) => {
    console.log(req.body);
    const user_details = await User.findOne({ email: req.body.username });
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
    const { email, oldPassword, newPassword } = req.body;

    let getUser = await User.findOne({ email: email });

    if (getUser == null) {
        return res.status(404).send({
            data: null,
            success: false,
            message: err.message || "User not found!"
        });
    }

    if (bcrypt.compare(oldPassword, getUser.password)) {

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
    else {
        res.status(401).send({
            data: null,
            success: false,
            message: "old password and new password does not match"
        });
    }
}

exports.get_all_site_managers = async(req, res)=>{

        const result = await User.find({role:1})

        if(!result){
            return res.status(402).send({
                data: null,
                success: false,
                message: 'No data found'
            });
        }else{
            return res.status(200).send({
                data: result,
                success: true,
                message: 'Found data'
            });
        }
        
        
}