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
    var docClient = new AWS.DynamoDB.DocumentClient({
        region: 'us-east-1'
    });

    var params = {
        TableName: "vrcpe-leads",
        Item: {
            "email": userInfo.email,
            "name": userInfo.name,
            "company": userInfo.company,
            "currentP": userInfo.currentP,
            "chnlMgr": userInfo.chnlMgr,
            "typeP": userInfo.typeP,
            "companySize": userInfo.companySize,
            "vertical": userInfo.vertical
        }
    };
    
    console.log("Adding a new user...", params);

    docClient.put(params, function (err, data) {
        if (err) {
            return err;
            console.error("Unable to add item. Error JSON:", user);
        } else {
            console.log("Added item:", user);
            return data;
        }
    });
}

module.exports.getUserByNumber = getUserByNumber;
module.exports.storeUser = storeUser;