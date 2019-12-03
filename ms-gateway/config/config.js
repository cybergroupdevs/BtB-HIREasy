require('dotenv').config();
class Config {
    constructor(){
        this.microservice_config={
            email_microService_URL: process.env.EMAIL_URL,
            email_microService_PORT: process.env.EMAIL_PORT
        }
    }
}

module.exports=new Config();