const axios = require('axios');
const fs = require('fs');
const {connectDB, closeDB} = require('./dbConnect')
const mongoose = require('mongoose');

const Campaign = require('../models/Campaign');
const Comment = require('../models/Comment');


// 1. data 수집
async function crawlCommentData(url){
    try {
        const response = await axios.get(url, {
            page: 0,size: 20,  rewardCommentType: ""
        });
        const data = response.data.data.content;
        return data;
    } catch (error) {
        console.error(error);
    }
}


// 2. json 파일 형태로 저장
async function dataToJSON(data, campaignId){

    const FILE_DIR = `./data/comment/${campaignId}_commentData.json`;
    
    fs.writeFile(FILE_DIR, JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    return FILE_DIR
}

    // 3. 댓글 저장하는 함수 정의(재귀)
    async function saveComment(data, campaign, parentCommentId){
        let comment = new Comment({
            body : data.body,
            Campaign : campaign._id,
            campaignId : campaign.campaignId,
            commentType : data.commentType,
            userNickname: data.nickName,
            whenCreated: data.whenCreated,
            parentCommentId: parentCommentId,
            depth: data.depth,
        });
        console.log(comment)
        await comment.save();

        if (data.hasReply){
            for(let replyData of data.commentReplys){
                await saveComment(replyData, campaign, comment._id);
            }
        }
    }

// 3-1. 캠페인 id를 찾아 db에 저장
async function insertDataToDB(FILE_DIR,campaignId){
    // campaignId를 통해 해당 campaign의 objectId 찾기
    let campaign = await Campaign.findOne({campaignId : campaignId});    
    if (!campaign) {
        throw new Error(`Campaign with id ${campaignId} not found`);
    };

    
    // json 파일로부터 commentData 읽기
    // let data = fs.readFileSync(FILE_DIR, 'utf-8');
    // console.log("data:: ", data)

    // 읽은 데이터를 JSON으로 파싱
    // let commentData = JSON.parse(data);
    console.log("file ::: ",FILE_DIR)
    const commentData = JSON.parse(fs.readFileSync(FILE_DIR, 'utf-8'));


    for (let comment of commentData){
        await saveComment(comment, campaign, null);
    }

}


async function CommentDataCollet(){
    const campaignData = JSON.parse(fs.readFileSync('./data/campaignData.json', 'utf-8'));


    for (let campaign of campaignData){
        const url = `https://www.wadiz.kr/web/reward/api/comments/campaigns/${campaign.campaignId}?page=0&size=20&commentGroupType=CAMPAIGN&rewardCommentType=`;
        try {
            const data = await crawlCommentData(url);
            if (data) {
                const FILE_DIR = await dataToJSON(data, campaign.campaignId);
                console.log(campaign.campaignId);
                await insertDataToDB(FILE_DIR, campaign.campaignId);
            }
            
        } catch (error) {
            console.error(error);
        }
    }
    console.log('1. Data Collected');


}
connectDB()
CommentDataCollet()