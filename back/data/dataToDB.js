const mongoose = require('mongoose');
const fs = require('fs');

const Campaign = require('../models/Campaign');

const FILE_DIR = './data/campaignData.json';
// const FILE_DIR = './commentData.json';

const insertDataToDB = () => {
    
    fs.readFile(FILE_DIR, 'utf-8', (error, jsonString) => {
        if (error) {
            console.log("File read failed", error);
            return ;
        }
    
        const data = JSON.parse(jsonString);
        Campaign.insertMany(data)
            .then(() => {
                console.log("Data Inserted")
            })
            .catch((error) => {
                console.log(error);
            });
    });
}

module.exports = insertDataToDB;