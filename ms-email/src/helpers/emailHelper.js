require('dotenv').config();
const nodemailer=require('nodemailer');
const consts=require('./constants');

class EmailHelper {

    constructor()
    {
       const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                //ToDo
                //Use .env File to fetch  email and password
                user:consts.fromEmailAddress,
                pass:'Test@1234'
            }
        });
        
        mailOptions={
            from: consts.fromEmailAddress
        };
    }
    async sendEmails(selectedCandidates){
        mailOptions.to=selectedCandidates;
        transporter.sendMail(mailOptions,function(err,data) {
            if(err){
                console.log(err);
            } else { 
                console.log('Mail Sent');
            }
        });
    };    
}

module.exports={EmailHelper};

