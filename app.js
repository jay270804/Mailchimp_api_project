const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app.use(bodyParser.urlencoded({ "extended": true }));
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {

    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data)
    const url = "https://us22.api.mailchimp.com/3.0/lists/4d0d4150ab"
    const options = {
        method: "POST",
        auth: "JayPatel:18c0450360018cd2d185b46e59f876332-us22"
    }

    const request = https.request(url, options, (response) => {

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

app.post("/failure",(req,res)=>{
    res.redirect("/");
})

app.listen(process.env.PORT||3000, () => {
    console.log("server running on port 3000.")
})

// api key
// 8c0450360018cd2d185b46e59f876332-us22

// 4d0d4150ab