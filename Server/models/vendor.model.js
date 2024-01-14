const { boolean } = require('joi');
const mongoose = require('mongoose');

const vendorModel = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    contact : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    resetAnswer : {
        type : String,
        required : true
    },
    isVendor : {
        type : Boolean,
        required : true,
        default : true
    },
    profile_pic : {
        type : String,
        default : null
    }
},{
    timestamps : true
}
);

module.exports = mongoose.model.Vendor || mongoose.model('Vendor' , vendorModel);