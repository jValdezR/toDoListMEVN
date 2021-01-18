const express = require('express');
const router = express.Router();

//Modelo de la informacion desde la bd
const Task = require('../models/task');

//Obtiene las tareas de la bd
router.get('/', async(req, res) =>{
    const tasks = await Task.find();
    res.json(tasks);
});
//Inserta una nueva tarea en la bd
router.post('/',async (req, res) =>{
    const task = new Task(req.body);
    console.log(task);

    await task.save();
    res.json({
        status: 'Tarea guardada'
    });
});

router.put('/:id', async (req, res) =>{
    await Task.findByIdAndUpdate(req.params.id, req.body);

    res.json({
        status: "recibido"
    });
});

router.delete('/:id', async(req,res) =>{
    await Task.findByIdAndRemove(req.params.id);

    res.json({
        status: "Tarea eliminada"
    })

});

router.get('/:id',async(req,res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

module.exports = router;