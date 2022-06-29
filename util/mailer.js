var nodemailer = require('nodemailer');
const { USER, PASS } = require('../config.json');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: USER,
    pass: PASS
  }
});

module.exports = transporter;