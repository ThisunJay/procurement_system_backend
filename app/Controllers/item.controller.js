const Item = require('../Models/item.model');

exports.create = async (req, res) => {
    const {item_id, item_name, description, price, supplierName} = req.body;

    const newItem = new Item({
        item_id,
        item_name,
        description,
        price,
        supplier
    })

    console.log("frontend item data", newItem);

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
        // if(err) {
        //     return res.status(500).send({
        //         data: null,
        //         success: false,
        //         message: err.message || "Some error occurred while returning data."
        //     });
        // }

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
    console.log("id eka" , id);

    Item.findOneAndDelete({ _id: req.params.id })
    .then( result => {

        if (!result) {
            throw new Error('No record found')
        }

        res.status(200).send({
            message: "Deleted successfully"
        });
    
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting the data."
        });
    }); 
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