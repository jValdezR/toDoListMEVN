const {Router} = require('express');
const router = Router();

const userCtrl = require('../controllers/users');
const taskCtrl = require('../controllers/tasks')

//-------------------------------USUARIOS------------------------------------------------------//

router.get('/',userCtrl.getUsers);//Obtener usuarios

router.get('/:id', userCtrl.getUser);//Obtener un usuario

router.post('/login', userCtrl.login);//Loguear usuario

router.post('/newUser', userCtrl.newUser);//Registrar nuevo usuario

router.post('/recovery', userCtrl.getRecovery);//Recuperar contraseña

router.get('/defaultPassword/:token', userCtrl.defaultPassword);//Contraseña nueva

router.get('/confirmation/:token', userCtrl.registerConfirm);//Confirmacion de email

//-----------------------------TAREAS----------------------------------------------------------//

router.post('/app/', taskCtrl.getTasks);//Obtener todas las tareas

router.get('/app/:id', taskCtrl.getTask);//Obtener una de las tareas

router.post('/app/addTask',taskCtrl.addTask);//Agregar nueva tarea)

router.put('/app/updateTask/:id',taskCtrl.updateTask);//Editar tarea

router.delete('/app/deleteTask/:id', taskCtrl.deleteTask);//Eliminar tarea

module.exports = router;