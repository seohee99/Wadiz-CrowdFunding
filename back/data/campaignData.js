const axios = require('axios');
const fs = require('fs').promises;
const {connectDB, closeDB} = require('./dbConnect')
const mongoose = require('mongoose');
const Campaign = require('../models/Campaign');


// data 수집
async function crawlData(url){
    try {
        const response = await axios.post(url, {
            
            startNum: 1, order: "support", limit: 50, categoryCode: "", endYn: ""
        });
        const data = response.data.data['list'];
        console.log('Data Collected');
        return data;
    } catch (error) {
        console.error(error);
    }
}

// json 파일 형태로 저장
async function dataToJSON(data){

    const FILE_DIR = "./data/campaignData.json"
    fs.writeFile("./data/campaignData.json", JSON.stringify(data, null, 2), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    return FILE_DIR
}

// json file을 읽고 db에 저장
async function insertDataToDB(FILE_DIR) {
    connectDB();

    try {
        const jsonString = await fs.readFile(FILE_DIR, 'utf-8');
        const data = JSON.parse(jsonString);
        const campaignId = 259397
        
        await Campaign.insertMany(data);
        console.log("Data Inserted");
    } catch (error) {
        console.log("An error occurred", error);
    }

    closeDB();
}

// start
async function CampaignDataCollect(){
    const url = "https://service.wadiz.kr/api/search/funding";
    try {
        const data = await crawlData(url);
        // console.log(data)
        const FILE_DIR = await dataToJSON(data);
        await insertDataToDB(FILE_DIR);
    } catch (error) {
        console.error(error);
    }
} 

CampaignDataCollect()



