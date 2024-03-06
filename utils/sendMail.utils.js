const nodemailer = require('nodemailer');
const dotenv = require("dotenv");


dotenv.config();

const transporter = nodemailer.createTransport({
    port: 587,
    host: "smtp-relay.brevo.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
    secure: true,
});

const sendMail = async ({ fullName, email, subject, token }
) => {
    console.log(fullName, email, subject, token);
    const mail = {
        from: "Voice Nest community",
        to: email,
        subject: subject,
        test: `Dear ${fullName}`,
        html:
            subject === "Verify Your Email Address for Voice Nest"
                ? `<b>Welcome to Voice Nest!</b><br>We're excited to have you join our community.<br><p>To get started, Please verify your email address by clicking the link below:<br><a href='http://localhost:3000/api/v1/users/varifyEmail/${token}'>Click here to verify</a></p>`
                : `<b>Welcome to Voice Nest!</b><br>To change you password for your Voice Nest account click the link below.<br><p>Please click this link to change your password:<br><a href='http://localhost:3000/api/v1/users/resetPassword/${token}'>Click here to reset</a></p>`,
    };
    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.log("Something went wrong while sending email!")
        console.error(error)
    }
};

module.exports = sendMail;
