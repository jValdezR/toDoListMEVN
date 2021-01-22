const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const EMAIL_SECRET = process.env.EMAIL_SECRET;
const EMAIL_SECRET_PASS = process.env.EMAIL_SECRET_PASS;
const EMAIL_NODE = process.env.EMAIL_NODE;
const EMAIL_PASS_NODE = process.env.EMAIL_PASS_NODE;


function sendWelcomeEmail(User) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_NODE,
            pass: EMAIL_PASS_NODE
        },
    });

    jwt.sign(
        {

            user: (User.id_user),
        },
        EMAIL_SECRET,
        {
            expiresIn: '1d',
        },
        (err, emailToken) => {
            const url = `http://127.0.0.1:3000/api/auth/confirmation/${emailToken}`;

            transporter.sendMail({
                to: User.email,
                subject: 'Confirm Email',
                html: `<h3>Por favor da click en el enlace para finalizar tu registro:<br><br>
        <a href="${url}">${url}</a><br><br></h3> 
        <h4>El enlace vence en 24 horas</h4><br><br>
        <img src='cid:logo'/><br>`,
                attachments: [{
                    filename: 'logo.png',
                    path: __dirname + '/../assets/logo.png',
                    cid: 'logo'
                }]
            });
        },
    );
}

function sendEmailRec(userId, mail, nPass) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_NODE,
            pass: EMAIL_PASS_NODE
        },
    });

    jwt.sign(
        {

            user: (userId),
            pass: (nPass),
        },
        EMAIL_SECRET_PASS,
        {
            expiresIn: '1d',
        },
        (err, emailToken) => {
            const url = `http://127.0.0.1:3000/api/auth/defaultPassword/${emailToken}`;

            transporter.sendMail({
                to: mail,
                subject: 'Password Recovery',
                html: `<h3>Ha solicitado recuperación de su contraseña.<br><br>
            
            Nueva contraseña: ${nPass} <br><br>
            
            El enlace vence en 24 horas, puede activar su nueva contraseña temporal dando click en el siguiente link:<br><br>

            <a href="${url}">${url}</a><br><br>


            Si usted no ha solicitado dicho cambio, solo ignore este mensaje.<br><br></h3>`,
                attachments: [{
                    filename: 'logo.png',
                    path: __dirname + '/../app/assets/logo.png',
                    cid: 'logo'
                }]
            });
        },
    );
}

module.exports = {
    sendWelcomeEmail,
    sendEmailRec
};