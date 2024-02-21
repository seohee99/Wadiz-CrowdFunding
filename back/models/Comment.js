const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    body : String,
    Campaign : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Campaign'
    },
    campaignId: Number,
    commentType : String,
    userNickname : String, 
    whenCreated : String,
    
    parentCommentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }, 

    depth : Number,

  }, {timestamps: true});
  
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;