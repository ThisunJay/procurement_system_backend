const Deliveries = require('../Models/deliveries.model');

exports.create = async (req, res) => {
    const{items, supplier, order, date, state, approved, notes} = req.body;

    //make sure to send items like this
    // [
    //     {
    //         item: {itemObject},
    //         quantity: quantity
    //     },
    //     {
    //         item: {itemObject},
    //         quantity: quantity
    //     }
    // ]

    //make sure to send state like this
    // [
    //     {
    //         state: state,
    //         comment: comment
    //     },
    //     {
    //         state: state,
    //         comment: comment
    //     }
    // ]

    const newDeliveries = new Deliveries({
        items, 
        supplier, 
        order, 
        date, 
        state, 
        approved, 
        notes
    })

    newDeliveries.save().then(data => {
        return res.status(200).send({
            data: data,
            success: true,
            message: 'Successfully Added!'
        });
    }).catch(err => {
        return res.status(500).send({
            data: null,
            success: false,
            message: err.message || "Some error occurred while creating the order."
        });
    })
}

exports.delete = async (req, res) => {
    const {id} = req.body;

    Deliveries.findOne({_id: id}, (err, deliveries) => {
        if(err) {
            return res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while creating the deliveries."
            });
        }

        if(deliveries == null) {
            return res.status(404).send({
                data: null,
                success: false,
                message: "Not found."
            });
        }

        deliveries.remove().then(data => {
            return res.status(200).send({
                data: data,
                success: true,
                message: "Successfully deleted."
            });
        }).catch(err => {
            return res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while deleting the deliveries."
            });
        })
    })
}

exports.approve = async (req, res) => {
    const{id, approved} = req.body;

    Deliveries.findOne({_id: id}, (err, deliveries) => {
        if(err) {
            return res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while getting the deliveries."
            });
        }

        if(deliveries == null) {
            return res.status(404).send({
                data: null,
                success: false,
                message: "Not found."
            });
        }

        if(approved) deliveries.approved = approved

        deliveries.save().then(data => {
            return res.status(200).send({
                data: data,
                success: true,
                message: "Successfully Updated"
            })
        }).catch(err => {
            return res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while updating."
            })
        })
    })
}

exports.update_state = async (req, res) => {
    const{id, state} = req.body;

    Deliveries.findOne({_id: id}, (err, deliveries) => {
        if(err) {
            return res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while getting the deliveries."
            });
        }

        if(deliveries == null) {
            return res.status(404).send({
                data: null,
                success: false,
                message: "Not found."
            });
        }

        if(state) deliveries.state = state

        deliveries.save().then(data => {
            return res.status(200).send({
                data: data,
                success: true,
                message: "Successfully Updated"
            })
        }).catch(err => {
            return res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while updating."
            })
        })
    })
}

exports.update_items = async (req, res) => {
    const{id, items} = req.body;

    Deliveries.findOne({_id: id}, (err, deliveries) => {
        if(err) {
            return res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while getting the deliveries."
            });
        }

        if(deliveries == null) {
            return res.status(404).send({
                data: null,
                success: false,
                message: "Not found."
            });
        }

        //if(items) deliveries.items = [...deliveries.items, items];
        if(items) deliveries.items = items;

        deliveries.save().then(data => {
            return res.status(200).send({
                data: data,
                success: true,
                message: "Successfully Updated"
            })
        }).catch(err => {
            return res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while updating."
            })
        })
    })
}