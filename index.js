var fs = require('fs');

const path = require('path')
const nodemailer = require('nodemailer');

// import express
const express = require('express');


// import cors
const cors = require('cors');


// assign server port
//const port=3000;

// set app to express
const app = express();

// convert to json object
app.use(express.json());


// apply corsoption 
// var corsOptions = {
//     origin: 'http://4200', //angular port  
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }


// use cors() function
app.use(cors());

let smtpTransport = nodemailer.createTransport({
  host: 'mail.fibas.in',
  secureConnection: true,
  port: 465,
  auth: {
    user: "manish@fibas.in",
    pass: "Nandalal@!"
  }
});

// in postman, using "POST"->Body-> raw, place following json(Application/json) data

// {
//   "email_from":"manish@fibas.in",
//   "email_to":"delivermanish@gmail.com",
//   "subject":"Mail from node.js",
//   "text":"This is a test mail using node.js - nodemailer"
//   }


// route for send mail
app.post('/sendmail', (req, res) => {

  //const body = req.body;
  const body = req.body;
  //console.log(body.email_from)

  let message = {
    from: body.email_from,
    to: body.email_to,
    subject: body.subject,
    text: body.text
  }


  if (message) // if message
  {

    //console.log(message)
    //res.end('sent, ok')
    smtpTransport.sendMail(message, function (error, response) {
      if (error) {
        console.log(error);
        res.end("error");
      } else {
        console.log("Message sent to : " + message.to);
        res.end("Message sent to : " + message.to);
      }
    });


  }

  else {
    throw new Error("No Message");
  }

})



app.get('/', (req, res) => {
  res.send("App is running");
})




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});
