const {vendorRegister , userRegister , vendorlogin , Userlogin , resetPasswordUser , resetPasswordVendor} = require("../controllers/signing.controller");
const router = require('express').Router();


router.post('/vendor/register' , vendorRegister);
router.post('/user/register' , userRegister);


router.post('/vendor/login' , vendorlogin);
router.post('/user/login' , Userlogin);

router.post('/Vendor/reset' , resetPasswordVendor);
router.post('/User/reset' , resetPasswordUser);


module.exports = router;