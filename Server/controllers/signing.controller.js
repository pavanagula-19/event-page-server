require('dotenv').config()
const { parse } = require('dotenv');
const User = require('../models/user.model');
const Vendor = require('../models/vendor.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//USER REGISTER
const userRegister = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(403).json({
                status: 'Failed',
                message: "Email Id already exists"
            })
        } else {
            let hashedPassword = await bcrypt.hash(req.body.password, 10);
            let hashedAnswer = await bcrypt.hash(req.body.resetAnswer, 10);
            let newUser = new User({
                ...req.body,
                resetAnswer: hashedAnswer,
                password: hashedPassword
            });
            newUser = await newUser.save();
            res.status(200).json({
                status: 'Success',
                user: newUser
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        })
    }
}

//VENDOR REGISTER
const vendorRegister = async (req, res) => {
    try {
        let vendor = await Vendor.findOne({ email: req.body.email });
        if (vendor) {
            return res.status(400).json({
                status: 'Failed',
                message: "Email Id already exists"
            })
        } else {
            let hashedPassword = await bcrypt.hash(req.body.password, 10);
            let hashedAnswer = await bcrypt.hash(req.body.resetAnswer, 10);
            let newVendor = new Vendor({
                ...req.body,
                resetAnswer: hashedAnswer,
                password: hashedPassword
            });
            newVendor = await newVendor.save();
            res.status(200).json({
                status: 'Success',
                user: newVendor
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        })
    }
}


//USER LOGIN
const Userlogin = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            const {name , email , password , contact , resetAnswer,isUser,proposals,profile_pic} = user
            if (await bcrypt.compare(req.body.password, user.password)) {
                let token = await jwt.sign({name , email , password , contact , resetAnswer,isUser,proposals,}, process.env.SECRET);
                res.status(400).json({
                    status: "Success",
                    token: token,
                    user: user
                })
            } else {
                res.status(401).json({
                    status: "Failed",
                    message: "Wrong Password"
                })
            }
        } else {
            res.status(400).json({
                status: "Failed",
                message: "User Not Found"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: err.message
        })
    }
}

//VENDOR LOGIN
const vendorlogin = async (req, res) => {
    try {
        let vendor = await Vendor.findOne({ email: req.body.email });
        if (vendor) {
            const {name , email , password , contact , resetAnswer,isVendor,proposals,profile_pic} = vendor
            if (await bcrypt.compare(req.body.password, password)) {
                let token = await jwt.sign({name , email  , contact ,isVendor,proposals}, process.env.SECRET);
                res.status(200).json({
                    status: "Success",
                    token: token,
                    user: vendor
                })
            } else {
                res.status(401).json({
                    status: "Failed",
                    message: "Wrong Password"
                })
            }
        } else {
            res.status(400).json({
                status: "Failed",
                message: "vendor Not Found"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: err.message
        })
    } 
}

//USER PASSWORD RESET 
const resetPasswordUser = async(req , res) =>{
    try{
        let user = await User.findOne({ email: req.body.email });
        if(user){
            if(await bcrypt.compare(req.body.resetAnswer , user.resetAnswer)){
                let hashedNewPassword = await bcrypt.hash(req.body.password , 10)
                let update = await User.findOneAndUpdate({email : req.body.email} , {password : hashedNewPassword});
                if(update){
                    res.status(200).json({
                        status : "Success"
                    })
                }else{
                    res.status(400).json({
                        status : "Failed",
                        message : "Answer is wrong"
                    })
                }
            }else{
                res.status(400).json({
                    status : "Failed",
                    message : "User Not found"
                })
            }
        }
    }catch(err){
        res.status(500).json({
            status : "Failed",
            message : err.message
        })
    }
}

//VENDOR PASSWORD RESET
const resetPasswordVendor = async(req , res) =>{
    try{
        let vendor = await Vendor.findOne({ email: req.body.email });
        if(vendor){
            if(await bcrypt.compare(req.body.resetAnswer , vendor.resetAnswer)){
                let hashedNewPassword = await bcrypt.hash(req.body.password , 10)
                if(await Vendor.findOneAndUpdate({email : req.body.email} , {password : hashedNewPassword})){
                    res.status(200).json({
                        status : "Success"
                    })
                }else{
                    res.status(400).json({
                        status : "Failed",
                        message : "Answer is wrong"
                    })
                }
            }else{
                res.status(400).json({
                    status : "Failed",
                    message : "User Not Found"
                })
            }
        }
    }catch(err){
        res.status(500).json({
            status : "Failed",
            message : err.message
        })
    }
}
module.exports = { userRegister, vendorRegister, vendorlogin, Userlogin  ,resetPasswordUser , resetPasswordVendor }
