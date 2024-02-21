var express = require('express');
var router = express.Router();
var Comment = require('../models/Comment');

// campaignId에 대한 모든 댓글
router.get('/:campaignId/comments', function(req, res, next) {
    const campaignId = req.params.campaignId;
  Comment.find({ Campaign: campaignId })
    .then(comments => {
      res.json(comments);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// commentId에 대한 댓글 하나
router.get('/:commentId/comment', (req,res,next) => {
    Comment.findById(req.params.commentId)
    .then(comment => {
        res.status(201).json(comment)
    })
    .catch(error => {
        console.log(error)
        res.status(400);
        next(error);
    });
});

router.post('/:campaignId/comment/:commentId', (req,res,next) => {
    Comment.create({
        
    })
})

router.post('/:campaignId/comment/', (req,res,next) => {
    Comment.create({

    })
})


module.exports = router;