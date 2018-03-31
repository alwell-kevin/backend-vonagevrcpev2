require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const sms = require('./sendSms');
const port = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json({
    type: 'application/json'
}));

app.all('/user', (req, res) => {
    console.log("WEB FORM SUBMITTED: ", req);
    res.sendStatus(200);
});

app.all('/triggerSms', (req, res) => {
    //Send SMS to dynamic number
    sms.triggerSms(req.body.toNum);
    
    res.sendStatus(200)
})


// Start server
app.listen(port, () => {
    console.log('Express server started on port ' + port);
})