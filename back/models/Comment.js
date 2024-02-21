const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    body :  {
        type : String,
        required : true,
    },
    Campaign : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Campaign'
    },
    campaignId :  {
        type : Number,
        required : true,
    },
    commentType : {
        type : String,
        required : false,
        default : "REVIEW"
    },
    userNickname :  {
        type : String,
        required : true,
    },
    whenCreated :  {
        type : String,
        required : false,
    },
    parentCommentId : {
        type : mongoose.Schema.Types.ObjectId,
        required : false,
        ref : 'Comment'
    }, 
    depth :  {
        type : Number,
        required : true,
    },

  }, {timestamps: true});
  
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;