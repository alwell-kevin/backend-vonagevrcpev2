'use strict';
var Nexmo = require('nexmo');

var nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET
});

const triggerSms = (toNum) => {
    let msg = process.env.SMS_MESSAGE;
        nexmo.message.sendSms(process.env.NEXMO_NUM, toNum, msg, function (err, httpResp, body) {
            if (err) {
                console.log("sendMessagesThroughNexmo couldn't send request. error: " + err);
                reject(err);
            } else {
                console.log("MESSAGE SENT Resp: ", httpResp);
            }
        })
}

module.exports.triggerSms = triggerSms;