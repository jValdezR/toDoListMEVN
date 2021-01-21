const bcrypt = require('bcrypt');

const helpers = {};

const User = require('../models/user');

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (err) {
        console.log(err);
    }

};

helpers.singIn = async (data) => {

    const user = await User.find({ mail: data.mail });
    const okPass = await helpers.matchPassword(user.pass,data.pass);

    if(user.length > 0){
        if(okPass)
        return 'ok';
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
        /* await checkId().then(res => newUser._id = parseInt(res)); */
        const usernew = new User ({
            name: newUser.name,
            mail: newUser.mail,
            phone: newUser.phone,
            pass: encPass
        });
        await usernew.save();
        return true;
    }
    else
        return false;
};

module.exports = helpers;