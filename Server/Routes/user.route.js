const {addSelectedList , delSelectedList,updateUserDp,deleteUserDp,updateVendorDp,deleteVendorDp} = require('../controllers/user.controller')
const router = require('express').Router();
const multer = require('../middlewares/multer')


router.post('/selected/:id' , addSelectedList);
router.delete('/selected/:id' ,delSelectedList );
router.put('/User/profilepic/:id' ,multer.single("profilePic") ,updateUserDp);
router.delete('/User/profilepic/:id' , deleteUserDp)
router.put('/Vendor/profilepic/:id',multer.single("profilePic") , updateVendorDp);
router.delete('/Vendor/profilepic/:id' , deleteVendorDp)
module.exports = router;