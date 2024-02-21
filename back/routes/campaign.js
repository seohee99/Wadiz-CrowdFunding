const express = require("express");
const router = express.Router();

var Campaign = require("../models/Campaign");
var Comment = require("../models/Comment");

// - [/api/campaign GET]요청이 오면 Campaign에 대한 리스트를 조회할 것
router.get("/campaigns", (req, res, next) => {
  Campaign.find()
    .then((campaigns) => {
      res.status(201).json(campaigns);
    })
    .catch((error) => {
      console.log(error);
      res.status(400);
      next(error);
    });
});

// - [/api/:campaignId GET]요청이 오면 Campaign 한 개에 대한 데이터와 댓글 전부를 함께 조회할 것
router.get("/:campaignId", async function (req, res, next) {
  try {
    const campaignId = req.params.campaignId;
    const campaign = await Campaign.findById(campaignId);
    const comments = await Comment.find({ Campaign: campaignId });

    res.json({
      campaign: campaign,
      comments: comments,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// - [/api/:campaignId/comment POST]요청이 오면 해당 Campaign에 대한 댓글을 임의로 달 수 있도록 할 것
// (댓글본문과 유저닉네임, 대댓글 깊이는 필수로 입력되도록 할 것)
// body : body, userNickname, depth,
// parentCommentId, Campaign(campaignId), campaignId, commentType

// 댓글
// - [/api/:campaignId/comment/:commentId POST]요청이 오면 해당 캠페인과 Comment에 대한 대댓글을 달 수 있도록 할 것 (댓글본문과 유저닉네임, 대댓글 id와 대댓글 깊이는 필수로 입력되도록 할 것)
router.post("/:campaignId/comment/", async (req, res, next) => {
  try {
    const { body, campaignId, userNickname, depth, commentType } = req.body;
    const  Campaign  = req.params.campaignId;

    const comment = new Comment({
      body: body,
      Campaign: Campaign,
      campaignId: campaignId,
      commentType: commentType || undefined,
      userNickname: userNickname,
      depth: depth,
    });

    const saveComment = await comment.save();

    res.json(saveComment);
  } catch (error) {
    res.status(500).send(error);
  }
});

//  대댓글
router.post("/:campaignId/comment/:commentId", async (req, res, next) => {
  try {
    const { body, campaignId, userNickname, depth, commentType } = req.body;
    const Campaign = req.params.campaignId;
    const parentCommentId  = req.params.parentCommentId;

    const comment = new Comment({
      body: body,
      Campaign: Campaign,
      campaignId: campaignId,
      commentType: commentType || undefined,
      userNickname: userNickname,
      parentCommentId: parentCommentId,
      depth: depth,
    });

    const saveComment = await comment.save();

    res.json(saveComment);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
