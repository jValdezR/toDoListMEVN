const userCtrl = {};
const User = require('../models/user');
const helpers = require('../lib/passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

userCtrl.getUsers = async (req, res) => {//Obtener todos los usuarios
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
        /* console.log(e); */
    }
}



userCtrl.newPass = async(req, res) => {
    let id_user = req.body.id_user;
    let pass = req.body.pass;
    let newPass = req.body.newPass;
    try {
        const text = 'SELECT * FROM usuario WHERE id_usuario = $1';
        const values = [id_user];
        const { rows } = await pool.query(text, values);
        if (rows.length > 0) {
            const OkPass = await helpers.matchPassword(pass, rows[0].pass);
            if (OkPass) {
                const encPass = await helpers.encryptPassword(newPass);
                let text2 = 'UPDATE usuario SET pass=$1 WHERE id_usuario=$2';
                let values2 = [encPass, id_user];
                await pool.query(text2, values2);
                res.json('Password Changed!');
            } else {
                res.json('Wrong Password!');
            }
        }
    } catch (e) {
        /* console.log(e); */
    }
};

userCtrl.registerConfirm = async(req, res) => {
    try {
        const id = jwt.verify(req.params.token, EMAIL_SECRET);
        let text2 = 'SELECT * FROM vistaEstadoUsuario WHERE id_usuario = $1';
        let values = [id.user];
        const { rows } = await pool.query(text2, values);

        if (rows[0].activo == false) {
            let text = 'SELECT estadoUsuario($1)';
            await pool.query(text, values);
        } else if (rows[0].activo == null) {
            let activo = true;
            let text2 = 'UPDATE usuario SET activo=$1 WHERE id_usuario=$2';
            let values2 = [activo, id.user];
            await pool.query(text2, values2);
        }
    } catch (e) {
        res.send('error: ' + e);
    }

    return res.redirect('http://35.206.82.124/');
};

userCtrl.getRecovery = async(req, res) => {
    const mail = req.body.email;
    try {
        const Verification = await helpers.mailRe(mail);
        res.json({ status: Verification });
    } catch (e) { /* console.log(e); */ }
};

userCtrl.defaultPassword = async(req, res) => {
    try {
        const id = jwt.verify(req.params.token, EMAIL_SECRET_PASS);
        let text = 'SELECT cambiarPass($1,$2)';
        const encPass = await helpers.encryptPassword(id.pass);
        let values = [id.user[0], encPass];
        await pool.query(text, values);
    } catch (e) {
        res.send('error');
    }

    return res.redirect('http://35.206.82.124/');
};

userCtrl.defaultPassword = async(req, res) => {
    try {
        const id = jwt.verify(req.params.token, EMAIL_SECRET_PASS);
        let text = 'SELECT cambiarPass($1,$2)';
        const encPass = await helpers.encryptPassword(id.pass);
        let values = [id.user[0], encPass];
        await pool.query(text, values);
    } catch (e) {
        res.send('error');
    }

    return res.redirect('http://35.206.82.124/');
};

module.exports = userCtrl;