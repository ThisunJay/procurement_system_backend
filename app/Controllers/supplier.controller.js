const Supplier = require('../Models/supplier.model');
const User = require('../Models/user.model');
const bcrypt = require('bcrypt');
const userRoles = require('../Util/userRoles.json');
const UtilObj = require('../Util/util');

// create supplier
exports.create = async (req, res) => {
    const { name, address, phoneNo, email } = req.body;
    let supplier = new Supplier({
      name: name,
      address: address,
      phoneNo: phoneNo,
      email: email,
    });

    let password = '';
    let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < 7; i++) {
        password += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    let hashedPwd = await bcrypt.hash(password, 10);

    supplier.save().then(data => {

        const newUser = new User({
            username: name,
            email: email,
            password: hashedPwd,
            role: userRoles.supplier
        })
        newUser.save().then(user => {
            UtilObj.sendPasswordForSupplier(user.email, password).then(data => {
                console.log("email sent")
            }).catch(err => {
                console.log(err);
            })
            return res.status(200).send({
                data: {data, user},
                success: true,
                message: 'Successfully Added!'
            });
        }).catch(err => {
            res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while creating the user."
            });
        })

    }).catch(err => {
        res.status(500).send({
            data: null,
            success: false,
            message: err.message || "Some error occurred while creating the user."
        });
    });
}

//get All suppliers
exports.get = async (req, res) => {
    Supplier.find({}, (err, data) => {
        if(err) {
            return res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while returning data."
            });
        }

        return res.status(200).send({
            data: data,
            success: true,
            message: 'Successfully Returned!'
        });
    })
}
// get specific supplier
exports.get_one = async (req, res) => {
    const id = req.params.id;
    Supplier.find({_id: id}, (err, data) => {
        if(err) {
            return res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while returning data."
            });
        }

        if(data == null){
            return res.status(404).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while returning data."
            });
        }

        return res.status(200).send({
            data: data,
            success: true,
            message: 'Successfully Returned!'
        });
    })
}