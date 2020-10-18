const Order = require('../Models/orders.model');
const Supplier = require('../Models/supplier.model');
// create order
exports.create = async (req, res) => {
    const {items, supplier, employee, date, site, state, current_state} = req.body;

    const newOrder = new Order({
        items,
        supplier,
        employee,
        date,
        site,
        state
    })

    newOrder.save().then(data => {
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
// delete order
exports.delete = async (req, res) => {
    const {id} = req.body;

    Order.findOne({_id: id}, (err, order) => {
        if(err) {
            return res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while creating the order."
            });
        }

        if(order == null) {
            return res.status(404).send({
                data: null,
                success: false,
                message: "Not found."
            });
        }

        order.remove().then(data => {
            return res.status(200).send({
                data: data,
                success: true,
                message: "Successfully deleted."
            });
        }).catch(err => {
            return res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while deleting the order."
            });
        })
    })
}
// update order
exports.update_state = async (req, res) => {
    const {state, id} = req.body;

    Order.findOne({_id: id}, (err, order) => {
        if(err) {
            return res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while creating the order."
            });
        }

        if(order == null) {
            return res.status(404).send({
                data: null,
                success: false,
                message: "Not found."
            });
        }

        if(state) {
            order.state = [...order.state, state];
            order.current_state = state.state;
        }

        order.save().then(data => {
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
// update order
exports.update_order = async (req, res) => {
    const {items, id, total} = req.body;

    Order.findOne({_id: id}, (err, order) => {
        if(err) {
            return res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while creating the order."
            });
        }

        if(order == null) {
            return res.status(404).send({
                data: null,
                success: false,
                message: "Not found."
            });
        }

        if(items) order.items = items
        if(total) order.total = total

        order.save().then(data => {
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
// get all orders
exports.get_all = async (req, res) => {
    Order.find({}, (err, data) => {
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
// get specific order
exports.get_one = async (req, res) => {
    //const id = req.body.id;
    const id = req.params.id;

    Order.findOne({_id: id}, async (err, order) => {
        if(err) {
            return res.status(500).send({
                data: null,
                success: false,
                message: err.message || "Some error occurred while returning data."
            });
        }

        if(order == null) {
            return res.status(404).send({
                data: null,
                success: false,
                message: "Not found."
            });
        }

        let supp = await Supplier.findOne({_id: order.supplier});

        return res.status(200).send({
            data: {
                order: order,
                supplier: supp
            },
            success: true,
            message: "Successfully returned."
        });
    })
}
// get orders by specific supllier
exports.get_by_supplier = async (req, res) => {
    const id = req.params.id;
    Order.find({supplier: id}, (err, data) => {
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
// get orders by site
exports.get_by_site = async (req, res) => {
    const id = req.params.id;
    Order.find({site: id}, (err, data) => {
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