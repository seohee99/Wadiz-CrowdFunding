const express = require('express');
const router = express.Router();

let Campaign = require('../models/Campaign');

router.get('/campaigns', (req,res,next) => {
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


router.get('/:campaignId', async function(req, res, next) {
    try {
      const campaignId = req.params.campaignId;
      const campaign = await Campaign.findById(campaignId);
      const comments = await Comment.find({ Campaign: campaignId });
  
      res.json({
        campaign: campaign,
        comments: comments
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });


module.exports = router;



