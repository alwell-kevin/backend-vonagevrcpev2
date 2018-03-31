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
    console.log("WEB FORM SUBMITTED: ", req);
    console.log("REQ BODY: ", req.body);
    user = req.body
    db.storeUser(user);
    
    res.sendStatus(200);
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