const { Worker } = require("bullmq");
const sendMail = require("../utils/sendMail.utils");
const Emailer = require("../utils/Emailer");
const dotenv = require('dotenv');

dotenv.config();

const emailer = new Emailer();

const emailWorker = new Worker("emial-queue", async (job) => {
    const data = job.data;
    const { fullName, token } = data;
    const values = { fullName, token };
    const body = await emailer.renderEmailTemplate(values, data.subject);
    await emailer.sendMail({ body, data });
}, {
    connection: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
    },
    limiter: {
        max: 50,
        duration: 10
    }
})

module.exports = emailWorker;