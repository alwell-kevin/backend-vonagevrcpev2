require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const sms = require('./sendSms');
const db = require('./dbInterface');
const port = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json({
    type: 'application/json'
}));

app.all('/user', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    user = JSON.parse(req.query)

    db.storeUser(user);

    res.jsonp(user);
});

app.all('/triggerSms', (req, res) => {
    var userNum = req.body.toNum;

    var userId = db.getUserByNumber(userNum);

    //Send SMS to dynamic number
    sms.triggerSms(userNum);

    res.sendStatus(200)
})


// Start server
app.listen(port, () => {
    console.log('Express server started on port ' + port);
})