const express = require('express');
const router = express.Router();

let Campaign = require('../models/Campaign');

router.get('/', (req,res,next) => {
    Campaign.find()
    .then(campaigns => {
        res.status(201).json(campaigns)
    })
    .catch(error => {
        console.log(error)
        res.status(400);
        next(error);
    });
});

router.get('/:campaignId', (req,res,next) => {
    Campaign.findById(req.params.campaignId)
    .then(campaign => {
        res.status(201).json(campaign)
    })
    .catch(error => {
        console.log(error)
        res.status(400);
        next(error);
    });
});


module.exports = router;



