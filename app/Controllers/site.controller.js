const Site = require('../Models/sites.model');

exports.create = async (req,res) => {
    const {site_manager, address, phoneNo} = req.body;

    const newSite = new Site({
        site_manager,
        address,
        phoneNo,
    });

    newSite.save().then(data => {
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
    Site.find({}).then(data => {
        return res.status(200).send({
            data: data,
            success: true,
            message: 'Successfully Returned!'
        });
    }).catch(err => {
        return res.status(500).send({
            data: null,
            success: false,
            message: err.message || "Some error occurred while returning data."
        });
    })
}

exports.get_one = async (req, res) => {
    const {id} = req.body;

    Site.findOne({_id: id}).then(data => {
        if(data == null) {
            return res.status(404).send({
                data: null,
                success: false,
                message: 'Not found!'
            });
        }

        return res.status(200).send({
            data: data,
            success: true,
            message: 'Successfully Returned!'
        });
    }).catch(err => {
        return res.status(500).send({
            data: null,
            success: false,
            message: err.message || "Some error occurred while returning data."
        });
    })
}

exports.update = async (req, res) => {
    const {site_manager, address, phoneNo, id} = req.body;

    let site = await Site.findOne({_id: id});

    if(site == null) {
        return res.status(404).send({
            data: null,
            success: false,
            message: "Not found!"
        })
    }

    if(site_manager) site.site_manager = site_manager

    if(address) site.address = address

    if(phoneNo) site.phoneNo = phoneNo

    site.save().then(data => {
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
}