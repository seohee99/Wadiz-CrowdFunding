const express = require('express');
const router = express.Router();

let Campaign = require('../models/Campaign');
let Comment = require('../models/Comment');

router.get('/:campaignId', (req,res,next) => {
    Campaign.findById(req.params.campaignId)
    .then(campaign => {

        Comment.find({Campaign : campaign._id})
        .then(comments => {

            res.status(201).json(comments)
        })
    })
    .catch(error => {
        console.log(error)
        res.status(400);
        next(error);
    });
});

module.exports = router;
