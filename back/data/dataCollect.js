const axios = require('axios');
const fs = require('fs');

async function crawlCampaignData(url){
    try {
        const response = await axios.post(url, {
            
            startNum: 1, order: "support", limit: 50, categoryCode: "", endYn: ""
        });
        const data = response.data.data['list'];
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}


async function campaignData(data){
    if (!Array.isArray(data)) {
        console.log('data is not an array');
        return;
    }

    const refinedData = data.map(item => {
        return {
            campaignId: item.campaignId,
            categoryName: item.categoryName,
            title: item.title,
            totalBackedAmount: item.totalBackedAmount,
            photoUrl: item.photoUrl,
            nickname: item.nickName,
            coreMessage: item.coreMessage,
            whenOpen: item.whenOpen,
            achivementRate: item.achievementRate
        };
    });

    fs.writeFile("./data/campaignData.json", JSON.stringify(refinedData, null, 2), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    return refinedData;
}


async function CampaignDataCollet(){
    const url = "https://service.wadiz.kr/api/search/funding";
    try {
        const data = await crawlCampaignData(url);
        console.log(data)
        if (data) {
            await campaignData(data);
        }
    } catch (error) {
        console.error(error);
    }
}

async function crawlCommentData(url){
    try {
        const response = await axios.get(url, {
            page: 0,size: 10,  rewardCommentType: ""
        });
        const data = response.data.data.content;
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function CommentDataCollet(){
    const url = "https://www.wadiz.kr/web/reward/api/comments/campaigns/265027?page=0&size=10&commentGroupType=CAMPAIGN&rewardCommentType=";
    try {
        const data = await crawlCommentData(url);
        // console.log(data)
        // if (data) {
        //     await commentData(data);
        // }
    } catch (error) {
        console.error(error);
    }
}

// CampaignDataCollet()
CommentDataCollet()



