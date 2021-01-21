const userCtrl = {};
const User = require('../models/user');

userCtrl.getUsers = async (req, res) => {//Obtener todos los usuarios
    const user = await User.find();
    res.json(user);
}

userCtrl.login = async (req, res) => {//Loguear un usuario
    const user = await User.find({ "mail": req.body.mail });
    
    if (user.length > 0)
        res.json(user);
    else
        res.json('Not found');
}

userCtrl.newUser = async (req, res) => {//Registrar nuevo usuario
    const user = await User.find({ "mail": req.body.mail });
    if (user.length > 0)
        res.json('Ya existe el usuario en la aplicacion');
    else {
        const user2 = new User(req.body);
        await user2.save();
        res.json('Ok');
    }
}
module.exports = userCtrl;