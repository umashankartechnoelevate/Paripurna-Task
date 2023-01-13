const mongoose = require("mongoose")
const userData = require('../../model/user/userModel')


const saveUser = async (req, res, next) => {
    let { firstName, lastName, emailId, dob, age, phoneNo, address } = req.body
    console.log(req.body)
    try {
        await userData.insertMany([{ firstName, lastName, emailId, dob, age, phoneNo, address }])

        res.status(200).json({
            error: false,
            message: "new user saved successfully",
            data: null
        })

    } catch (err) {
        console.log(err)
    }
}

let getUserdetails = async (req, res, next) => {
    try {
        let user = await userData.find().lean();
        res.json({
            error: false,
            message: "All  Deatils",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};


let deleteUser = async (req, res, next) => {
    let { _id } = req.params
    console.log("deleting id", _id,req.params)

    try {
        await userData.deleteOne({ _id: req.params._id })
        res.json({
            error: false,
            message: "deleted successfully",
            data: null,
        });
    } catch (err) {
        console.log("deleting error", err)
        next(err)
    }
}

let editUser = async (req, res, next) => {
    console.log("edit id",req.params._id)
    let { _id, firstName, lastName, emailId, dob, age, phoneNo, address } = req.body
    try {
        await userData.updateOne({ _id: _id },
            {
                $set: { firstName, lastName, emailId, dob, age, phoneNo, address }
            }
        )
        res.json({
            error: false,
            message: "Products edited successfully",
            data: { firstName, lastName, emailId, dob, age, phoneNo, address }
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    saveUser,
    getUserdetails,
    deleteUser,
    editUser

}