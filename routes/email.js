const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async function(req, res, next) {
    const staffProfile = req.body
    
    let eventType = staffProfile.eventType;

    let subject, body;

    if (eventType === 'created') {
        subject = `Profile Notification #Created`;
        body = `Greeting ${staffProfile.name}, we are glad to inform you that your staff profile has been created.`;
      } else if (eventType === 'updated') {
        subject = `Profile Notification #Edited`;
        body = `Greeting ${staffProfile.name}, we are glad to inform you that your staff profile has been updated`;
      } else if (eventType === 'deleted') {
        subject = `Profile Notification #Deleted`;
        body = `Greeting ${staffProfile.name}, we are sad to inform you that your staff profile has been deleted`;
      }

      // Set up the SMTP transporter object
  const transporter = nodemailer.createTransport({
    host: 'mail.smtpbucket.com',
    port: 8025
  });

  // Send the email
  transporter.sendMail({
    from: 'noreply@zamara.com',
    to: staffProfile.email,
    subject: subject,
    text: body
  }, (error, info) => {
    if (error) {
      return res.status(500).send({message: "Email not sent"});
    } else {
        return res.status(200).send({message: "success"});
    }
  });
})

module.exports = router;