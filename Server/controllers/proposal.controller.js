const Proposals = require('../models/proposal.model');
const cloudinary = require('../middlewares/cloudinary');
const User = require('../models/user.model')
const Vendor = require('../models/vendor.model')
//TO GET ALL PROPOSALS
const getAllProposals = async (req, res) => {
    try {
        let proposals = await Proposals.find().populate("vendorId");
        res.status(200).json({ status: "Success", data: proposals });
    } catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }
}

//TO CREATE A PROPOSAL
const createProposal = async (req, res) => {
    try {
        let arr = [];
        console.log(req.files);
        arr = await req.files.map(file => file.path);
        for (let i = 0; i < arr.length; i++) {
            let imgUrl = await cloudinary.uploader.upload(arr[i]);
            arr[i] = imgUrl.secure_url;
        }
        let proposal = new Proposals({
            ...req.body,
            images : arr
        });
        await proposal.save();
        res.status(200).json({
            status: "Success",
            data: proposal
        })
    } catch (err) {
        res.status(500).send(err.message)
    }
}

//EDIT THE PROPOSAL
const editProposal = async (req, res) => {
    try {
        let proposals = await Proposals.findById(req.params.id);
        if (!proposals) return res.status(404).json({ status: "Failed", message: "Invalid Id" });
        if (req.files && req.files.length > 0) {
            const arr = req.files.map(file => file.path);
            for (let i = 0; i < arr.length; i++) {
                let imgUrl = await cloudinary.uploader.upload(arr[i]);
                arr[i] = imgUrl.secure_url;
            }
            proposals = await Proposals.findByIdAndUpdate(req.params.id, { ...req.body, images: [...arr] }, { new: true });
        } else {
            proposals = await Proposals.findByIdAndUpdate(req.params.id, req.body, { new: true });
        }
        res.status(200).json({ status: "Success", proposals });
    } catch (err) {
        res.status(500).json({ status: "Failed", message: err.message });
    }
}

//DELETE THE PROPOSAL
const deleteProposal = async (req, res) => {
    try {
        const id = req.params.id;
        let post = await Proposals.findById(id);
        if (!post) return res.status(400).json({
            status: "Failed",
            message: "Id is invalid"
        })
        else {
            // console.log(post)
            // for (let i = 0; i < post.images.length; i++) {
            //     await cloudinary.uploader.destroy(post.images[i]);
            // }
            await Proposals.findByIdAndDelete(id)
        }
        res.status(200).json({
            status: "Success"
        })
    } catch (err) {
        res.status(500).send({
            status: "Failed",
            message: err.message
        })
    }
}

//GET PROPOSALS SELECTED BY THE USER
const getUserSelectedProposals = async (req, res) => {
    try {
        let id = req.params.id;
        let user = await User.findById(id);
        let proposals = [];
        for (let i = 0; i < user.selected_items.length; i++) {
            let proposal = await Proposals.findById(user.selected_items[i]).populate("vendorId");
            if (proposal) proposals.push(proposal);
        }
        res.status(200).json({
            status: "Success",
            data: proposals
        })
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: err.message
        })
    }
}

//GET VENDOR SPECIFIC PROPOSALS
const vendorProposals = async (req, res) => {
    try {
        let proposals = await Proposals.find({ vendorId: req.params.id });
        res.status(200).json({
            status: "Success",
            data: proposals
        })
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: err.message
        })
    }
}

//GET SINGLE PROPOSALS BY ID
const getSingleProposal = async (req, res) => {
    try {
        let id = req.params.id;
        let proposal = await Proposals.findById(id).populate("vendorId");
        res.status(200).json({
            status: "Success",
            data: proposal
        })
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: err.message
        })
    }
}

module.exports = { getAllProposals, createProposal, editProposal, deleteProposal, getUserSelectedProposals, vendorProposals, getSingleProposal }