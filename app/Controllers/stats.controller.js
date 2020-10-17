const Order = require('../Models/orders.model');
const Item = require('../Models/item.model');
const Site = require('../Models/sites.model');
const Supplier = require('../Models/supplier.model');
const User = require('../Models/user.model');

const moment = require('moment');
moment().format();

exports.counts = async (req, res) => {
    const itemCount = await Item.find().count();
    const siteCount = await Site.find().count();
    const supplierCount = await Supplier.find().count();
    const userCount = await User.find().count();
    const pendingOrders = await Order.find();
    const allPendingOrders = pendingOrders.filter(data => {
        if(data.current_state == "1" || data.current_state == "2" || data.current_state == "3" || data.current_state == "4"){
            return data;
        }
    }).length;

    console.log(allPendingOrders);

    const allCompletedOrders = pendingOrders.filter(data => {
        if(data.current_state == "0" || data.current_state == "5"){
            return data;
        }
    }).length;

    console.log(allCompletedOrders);

    const data = {
        item_count: itemCount,
        site_count: siteCount,
        supplier_count: supplierCount,
        user_count: userCount,
        pending_orders: allPendingOrders,
        completed_orders: allCompletedOrders,
    }

    return res.status(200).send({
        data: data,
        success: true,
        message: "Successfully returned."
    });
}

exports.latest_orders = async (req, res) => {
    const allOrders = await Order.find();
    let data = allOrders.filter(data => {
        //console.log(Date(Date.now()));
        console.log(moment());
        console.log(moment(data.created_on));
        let dateTimeNow = moment();
        let objDateTime = moment(data.created_on);

        let dif = dateTimeNow.diff(objDateTime, 'days');

        console.log(dif);

        if(dif < 14) return data;
    });

    //data = data.reverse();

    return res.status(200).send({
        data: data,
        success: true,
        message: "Successfully returned."
    });
    //res.status(200).send(allOrders);
}

exports.by_month = async (req, res) => {
    const num = await Order.aggregate([
        {$group: {
            _id: {$substr: ['$created_on', 5, 2]},
            numberoforders: {$sum: 1}
        }}
    ])

    console.log(num);

    let month = num.map(i => {
        return {
            month: i._id,
            numberoforders: i.numberoforders
        }
    })

    console.log(month);

    return res.status(200).send({
        data: month,
        success: true,
        message: "Successfully returned."
    });
}

exports.sup_by_month = async (req, res) => {
    const num = await Supplier.aggregate([
        {$group: {
            _id: {$substr: ['$created_on', 5, 2]},
            numberofsuppliers: {$sum: 1}
        }}
    ])

    console.log(num);

    let month = num.map(i => {
        return {
            month: i._id,
            numberofsuppliers: i.numberofsuppliers
        }
    })

    console.log(month);

    return res.status(200).send({
        data: month,
        success: true,
        message: "Successfully returned."
    });
}

exports.recent_orders = async (req, res) => {

    var today = new Date(moment( new Date() ).format("YYYY-MM-DD") ); 
    var prev =  new Date(today - 12096e5 );
    let dataset = []

    Order.aggregate([
        {
            $project: {
                  count : { $sum : 1 },
                  current_date : { $dateToString: { format: "%Y-%m-%d", date: "$created_on" } } 
            }
        },
        {
            $group : { _id : "$current_date"  , total  : { $sum :  '$count'}  }
        },
        {
            $sort: { current_state: -1 }
        }
    ]).exec(function(err, result) {
        if (err) { return next(err)}
        
        let data = result.map(i => {
            return {
                date: i._id,
                numberoforders: i.total
            }
        })
        //console.log(data);

        data.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));

        //console.log(data);

        return res.status(200).send({
            data: data,
            success: true,
            message: "Successfully returned."
        });
    });

}