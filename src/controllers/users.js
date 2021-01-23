const userCtrl = {};
const User = require('../models/user');
const helpers = require('../lib/passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const EMAIL_SECRET = process.env.EMAIL_SECRET;
const EMAIL_SECRET_PASS = process.env.EMAIL_SECRET_PASS;



userCtrl.getUsers = async (req, res) => {//Obtener todos los usuarios
    const user = await User.findById(req.params.id);
    res.json(user);
}

userCtrl.getUser = async (req, res) => {//Obtener todos los usuarios
    const user = await User.find();
    res.json(user);
}

userCtrl.login = async (req, res) => {//Loguear un usuario
    const data = req.body;
    const  user = await User.find({mail:req.body.mail});

    if(user.length > 0){
        try {
            const verification = await helpers.singIn(data);
            if (verification == 'ok')
                res.json({ 
                    status: 'ok', 
                    id: user[0]['_id']
                });
            else if(verification == 'wrong pass')
                res.json({ status: 'failed' });
            else (verification == 'not-confirmed')
                res.json({status: 'not-confirmed'})
        } catch (error) {
    
        }
    }
    else
        res.json({status: 'Unkown mail'})
    
}

userCtrl.newUser = async (req, res) => {//Registrar nuevo usuario
    const user = req.body;
    try {
        const Verification = await helpers.signUp(user);
        if (Verification) {
            res.json({ status: 'Registered!' });
        } else
            res.json({ status: 'Email already registered!' });

    } catch (e) {
        
    }
};

userCtrl.getRecovery = async(req, res) => {
    const mail = req.body;
    try {
        const Verification = await helpers.mailRe(mail['mail']);
        res.json({ status: Verification });
    } catch (e) {

    }
};



userCtrl.registerConfirm = async(req, res) => {//Confirmar al usuario activo
    try {
        
        const id = jwt.verify(req.params.token, EMAIL_SECRET);

        await User.update({mail: id['user']}, {$set: {active: true}});

    } catch (e) {
        
    }

    return res.redirect('http://127.0.0.1:3000');

};


userCtrl.defaultPassword = async(req, res) => {
    
    try {
        const id = jwt.verify(req.params.token, EMAIL_SECRET_PASS);
        
        const user = await User.find({_id: id['user']});

        const encPass = await helpers.encryptPassword(id['pass']);

        await User.update({mail: user[0]['mail']}, {$set: {pass: encPass}});

    } catch (e) {
        res.send('error');
    }

    return res.redirect('http://127.0.0.1:3000');
};


module.exports = userCtrl;