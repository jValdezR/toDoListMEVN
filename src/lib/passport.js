const bcrypt = require('bcrypt');

const helpers = {};

const User = require('../models/user');

const { sendWelcomeEmail, sendEmailRec } = require('./email');

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
    var a;
    try {
        const b = await bcrypt.compare(password, savedPassword).then(function(result){
            a = result;
        });
        return a;
    } catch (err) {
        console.log(err);
    }

};

helpers.singIn = async (data) => {

    const user = await User.find({ mail: data.mail });
    const okPass = await helpers.matchPassword(data.pass,user[0]['pass']);
    if(user.length > 0){
        if(okPass)
            if(user[0]['active'])
                return 'ok';
            else
                return 'not-confirmed'
    else
        return 'wrong pass';
    }
    else
        return 'Unkown mail'
};

helpers.signUp = async(newUser) => {
    const user = await User.find({ mail: newUser.mail });

    if(user.length == 0){
        const encPass = await helpers.encryptPassword(newUser.pass);
        const usernew = new User ({
            name: newUser.name,
            mail: newUser.mail,
            phone: newUser.phone,
            pass: encPass,
            active: newUser.active
        });
        await usernew.save();
        sendWelcomeEmail(usernew);
        return true;
    }
    else
        return false;
};

function makePass(size) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < size; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

helpers.mailRe = async(data) => {
    /* console.log('Entrando a jelper'); */
    const user = await User.find({ mail: data });
    if (user.length > 0) {
        let size = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
        const nPass = makePass(size);
        let id = user[0]['_id'];
        return sendEmailRec(id, data, nPass);
    } else
        return 'Invalid Email!';
};

module.exports = helpers;