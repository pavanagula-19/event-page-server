const { boolean } = require('joi');
const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique : true,
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
    isUser :{
        type : Boolean,
        default : true,
        required : true
    },
    profile_pic : {
        type : String,
        default : null
    },
    selected_items : {
        type : [String],
        default : []
    }
} , {
    timestamps : true
})


module.exports = mongoose.model('User' , userModel);