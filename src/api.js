const express = require("express");
const serverless = require("serverless-http");

const nodemailer = require("nodemailer");

const app = express()
const router = express.Router();

class Email{
    mailTo = [
        "areset0000@gmail.com",
        "mb.repairss@gmail.com"
    ];
    emailer = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "areset0000@gmail.com",
            pass: "meloneyblair1"
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    send(data){
        console.log(data)
        try{
            const mailOptions = {
                from: data.from,
                to: this.mailTo,
                subject: data.subject,
                text: data.body
            };
            this.emailer.sendMail(mailOptions,(error, info)=>{
                console.log(error, info)
                if (error) return {state:false, message: error.Error};
                else return {state:true, message: info};
            });
        }catch{
            return true;
        }
    }
}

router.get("/",(req, res)=>{
    const myEmail = {
        from: "mb.repairss@gmail.com",
        subject: "this is a test",
        body: "testing boddy message"
    }
    const emailer = new Email();
    emailer.send(myEmail);
    res.json({
        hello: "this is a test five"
    })
});

app.use("/.netlify/functions/api",router);

module.exports.handler = serverless(app);