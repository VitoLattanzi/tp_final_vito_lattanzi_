import nodemailer from 'nodemailer'
import ENVIRONMENT from './environment.config.js'

const mailTransporter = nodemailer.createTransport({
    service: 'gmail', //provedor deonde mandemos los mails 
    auth: {
        user: ENVIRONMENT.GMAIL_USER,       //metodos de 
        pass: ENVIRONMENT.GMAIL_PASSWORD    //verificacion
    },
    tls: {
        rejectUnauthorized: false //Ignoramos validaciones de certificado TLS
    }
})  

export default mailTransporter