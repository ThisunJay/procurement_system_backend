const Site = require('../Models/sites.model');
const User = require('../Models/user.model');

exports.create = async (req, res) => {
    const { site_manager, address, site_code } = req.body.data;

    const newSite = new Site({
        site_manager,
        address,
        site_code,
    });

    const update = await User.findOneAndUpdate({ _id: site_manager }, {
        site_location: address,
        site_code: site_code
    }, { new: true })

    newSite.save().then(data => {
        return res.status(200).send({
            data: data,
            success: true,
            message: 'Successfully Added!'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            data: null,
            success: false,
            message: err.message || "Some error occurred while creating the site."
        });
    })
}

exports.get_all = async (req, res) => {








    Site.aggregate([
        {
            $lookup: {
                from: "users", // collection name in db
                localField: "site_manager",
                foreignField: "_id",
                as: "site_manager"
            }
        },
        {
            $project: {
                site_manager: { $arrayElemAt: ["$site_manager", 0], },
                address : 1,
                site_code : 1,
            }
        }
    ]).exec(function (err, result) {
        if (err) { return next(err) }

        res.status(200).send({
            data : result
        })

    });

















    // Site.find({}).then(data => {
    //     return res.status(200).send({
    //         data: data,
    //         success: true,
    //         message: 'Successfully Returned!'
    //     });
    // }).catch(err => {
    //     return res.status(500).send({
    //         data: null,
    //         success: false,
    //         message: err.message || "Some error occurred while returning data."
    //     });
    // })
}

exports.get_one = async (req, res) => {
    const { id } = req.body;

    Site.findOne({ _id: id }).then(data => {
        if (data == null) {
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
    const { site_manager, address, phoneNo, id } = req.body;

    let site = await Site.findOne({ _id: id });

    if (site == null) {
        return res.status(404).send({
            data: null,
            success: false,
            message: "Not found!"
        })
    }

    if (site_manager) site.site_manager = site_manager

    if (address) site.address = address

    if (phoneNo) site.phoneNo = phoneNo

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
