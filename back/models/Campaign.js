const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    campaignId: Number,
    categoryName: String,
    title: String,
    totalBackedAmount: Number,
    photoUrl: String,
    nickname: String,
    coreMessage: String,
    whenOpen: Date,
    achivementRate: Number
  }, {timestamps: true});
  
const Campaign = mongoose.model('Campaign', campaignSchema);
module.exports = Campaign;