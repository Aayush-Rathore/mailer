const HTTP = require("http");

HTTP.createServer(() => { console.log("Server is started!") });
HTTP.get("/", (req, res) => {
    res.send("Your microservice is running!")
})

console.log("Server is running")
require('./queue/mainQueues');
