const userCtrl = {};
const User = require('../models/user');
const helpers = require('../lib/passport');

userCtrl.getUsers = async (req, res) => {//Obtener todos los usuarios
    const user = await User.find();
    res.json(user);
}

userCtrl.login = async (req, res) => {//Loguear un usuario
    const user = req.body;
    console.log(user);
    try {
        const verification = await helpers.singIn(user);
        if (verification)
            res.json({ status: 'ok' });
        else
            res.json({ status: 'failed' });
    } catch (error) {

    }
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
        /* console.log(e); */
    }
}

userCtrl.resetPass = async(req,res) => {
    console.log("Entrando a reset");
    const user = await User.find({mail:req.body.mail});
    if(user.length > 0)
        res.json(user);
    else
        res.json({status: 'not-found'});
}

module.exports = userCtrl;