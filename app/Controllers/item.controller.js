const Item = require('../Models/item.model');

exports.create = async (req, res) => {
    const {name, supplier, price, description} = req.body;

    const newItem = new Item({
        name,
        supplier,
        price,
        description
    })

    newItem.save().then(data => {
        return res.status(200).send({
            data: data,
            success: true,
            message: 'Successfully Added!'
        });
    }).catch(err => {
        res.status(500).send({
            data: null,
            success: false,
            message: err.message || "Some error occurred while creating the site."
        });
    })
}

exports.get_all = async (req, res) => {
    Item.find({}, (err, data) => {
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

exports.get_one = async (req, res) => {
    const {id} = req.body;

    Item.findOne({_id: id}, (err, data) => {
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

exports.delete = async (req, res) => {
    const {id} = req.body;

    Item.findOne({_id : id}, (err, data) => {
        if(err) {
            return res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while returning data."
            });
        }

        data.remove().then(data => {
            return res.status(200).send({
                data: data,
                success: true,
                message: 'Successfully Deleted!'
            });
        }).catch(err => {
            return res.status(500).send({
                data: data,
                success: false,
                message: err.message || "Some error occurred while returning data."
            });
        })
    })
}

exports.update = async (req, res) => {
    const {name, id, price, description} = req.body;

    Item.findOne({_id: id}, (err, item) => {
        if(err) {
            return res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while returning data."
            });
        }

        if(item == null) {
            return res.status(404).send({
                data: null,
                success: false,
                message: "Not found."
            });
        }

        if(name) item.name = name

        if(price) item.price = price

        if(description) item.description = description

        item.save().then(data => {
            return res.status(200).send({
                data: data,
                success: true,
                message: "Updated Successfully."
            });
        }).catch(err => {
            return res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while returning data."
            });
        })
    })
}