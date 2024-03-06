const SibApiV3Sdk = require('@getbrevo/brevo');
const dotenv = require("dotenv");
const fs = require('fs');


dotenv.config();

class Emailer {
  constructor() {
    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    this.api = this.apiInstance.authentications['apiKey'];
    this.api.apiKey = process.env.BREVO_API;
    this.sendSMTPEmail = new SibApiV3Sdk.SendSmtpEmail();
  }

  sendMail = async ({ body, data }) => {
    try {
      const sendSMTPEmail = {
        sender: {
          name: "Aayush Rathore",
          email: "aayu.r.2003@gmail.com",
        },
        to: [
          {
            email: data.email
          }
        ],
        subject: data.subject === "verificationMail" ? `Welcome ${data.fullName}, Verify your email address, Please!` : "Opps you forget your password!",
        htmlContent: body,
      }
      const response = await this.apiInstance.sendTransacEmail(sendSMTPEmail);
      return { status: true, response };
    } catch (error) {
      console.log(error);
    }
  }

  renderEmailTemplate = async (values, subject) => {
    try {

      let html = await fs.readFileSync(`${__dirname}/../public/${subject}.html`, 'utf8');
      const keys = Object.keys(values);
      keys.forEach((key) => {
        const reg = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(reg, values[key]);
      });
      return html;
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Emailer;