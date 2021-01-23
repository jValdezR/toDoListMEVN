const taskCtrl = {};

//Modelo de la informacion desde la bd
const Task = require('../models/task');

taskCtrl.getTask = async(req,res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
};

//Obtiene las tareas de la bd
taskCtrl.getTasks = async(req, res) =>{
    const tasks = await Task.find({id_usuario: req.body.id});
    res.json(tasks);
};

//Inserta una nueva tarea en la bd
taskCtrl.addTask = async (req, res) =>{
    const task = new Task(req.body);

    await task.save();
    res.json({
        status: 'Tarea guardada'
    });
};

taskCtrl.updateTask = async (req, res) =>{
    await Task.findByIdAndUpdate(req.params.id, req.body);

    res.json({
        status: "recibido"
    });
};

taskCtrl.deleteTask = async(req,res) =>{
    await Task.findByIdAndRemove(req.params.id);

    res.json({
        status: "Tarea eliminada"
    })

};



module.exports = taskCtrl;