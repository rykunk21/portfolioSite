const express = require('express');
var request = require('request');
const app = express();

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendStatus(200);
})

app.post('/contact', (req, res) => {

    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        // please select captcha
        return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
      }
      var secretKey = "6Lczj6UgAAAAAEz1rcsSCSq8IesxhAXIf6xylPpH";
      // req.connection.remoteAddress will provide IP address of connected user.
      var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
      // Hitting GET request to the URL, Google will respond with success or error scenario.
      request(verificationUrl,function(error,response,body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if(body.success !== undefined && !body.success) {
            // decline form submission
          return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
          
        }
        // res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
      });

    const transporter = require('./util/mailer.js');
    const { USER } = require('./config.json');
    var mailOptions = {
        from: USER,
        to: USER,
        subject: `Inquiry from portfolio`,
        text: `Response email: ${req.body.email}\nRequested Service: ${req.body.service}\n\n${req.body.message}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
    res.redirect('/thank-you.html');
})



app.listen(process.env.PORT || '8080', () => {
    console.log(`App listening on port: ${process.env.PORT? process.env.PORT: '8080'}`);

});


