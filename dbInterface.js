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
    var user;

    var docClient = new AWS.DynamoDB.DocumentClient({
        region: 'us-east-1'
    });

    if (userInfo) {
        for (var key in userInfo) {
            if (userInfo.hasOwnProperty(key) && typeof userInfo[key] === 'string') {
                if (userInfo[key].length < 1) {
                    userInfo[key] = "No-Response";
                } else if (userInfo[key].length > 1) {
                    user[key] = userInfo[key]
                }
            }
        }
    }


    var params = {
        TableName: "vrcpeLeads",
        Item: user
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