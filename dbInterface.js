'use strict'

let AWS = require("aws-sdk");

AWS.config.update({
    region: process.env.region,
    endpoint: process.env.endpoint,
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
});

const getUserByNumber = (userNum) => {
    return {
        id: userNum
    }
}

const storeUser = (userInfo) => {
    var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: "vrcpe-leads",
        Item: userInfo
    };

    console.log("Adding a new user...", userInfo);
    return new Promise((resolve, reject) => {
        docClient.put(params, function (err, data) {
            if (err) {
                return err;
                console.error("Unable to add item. Error JSON:", userInfo);
            } else {
                console.log("Added item:", userInfo);
                return data;
            }
        });
    })
}

module.exports.getUserByNumber = getUserByNumber;
module.exports.storeUser = storeUser;