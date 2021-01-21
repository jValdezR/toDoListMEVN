<template>
    <div>
        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="addTask">
                                <div class="form-group">
                                     <input type="text" v-model="task.title"
                                     placeholder="Agrega una tarea" 
                                     class="form-control">
                                </div>
                                <div class="form-group">
                                    <textarea class="form-control" v-model="task.descripcion"
                                    placeholder="Agrega una descripcion" 
                                    cols="30" rows="10"></textarea>
                                </div>           
                                <template v-if="edit ===false">
                                    <button class="btn btn-primary btn-block">Guardar</button>
                                </template> 
                                <template v-else>
                                    <button class="btn btn-primary btn-block">Editar</button>
                                </template> 
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Tarea</th>
                                <th>Descripcion</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task of tasks" v-bind:key="task.id">
                                <td>
                                    {{task.title}}
                                </td>
                                <td>{{task.descripcion}}</td>
                                <td>
                                    <button @click="updateTask(task._id)" class="btn btn-secondary">Editar</button>
                                </td>
                                <td>
                                    <button @click="deleteTask(task._id)" class="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* class Task {
    constructor(title,descripcion) {
        this.title = title;
        this.descripcion = descripcion;
    }
} */


export default {
    data() {
        return {
            task: {
                id_usuario: '',
                title: '',
                descripcion: ''
            },
            /* id_user: JSON.parse(localStorage.getItem(key:)) */
            tasks: [],
            edit: false
        }
    },
    created() {
        this.getTask();
    },
    methods: {
        getTask(){
            const ide = sessionStorage.getItem('id')
            fetch('/api/auth/app/',{
                method: 'POST',
                body: JSON.stringify({id: ide}),
                headers: {
                   'Accept': 'application/json',
                   'Content-type': 'application/json'
                   }
            })
            .then(res => res.json())
            .then( data  => {
                console.log(data);
                this.tasks = data;
            })
        },
        addTask() {
            
            if(this.edit == false){
                const ide = sessionStorage.getItem('id')
                this.task.id_usuario = ide;
                fetch('/api/auth/app/addTask/',{
                method: 'POST',
                body: JSON.stringify(this.task),
                headers: {
                   'Accept': 'application/json',
                   'Content-type': 'application/json'
                   }
                })
                .then( this.getTask())
            }
            else{
                console.log(this.id_task);
                this.edit = false;
                fetch('/api/auth/app/updateTask/'+ this.id_task,{
                method: 'PUT',
                body: JSON.stringify(this.task),
                headers: {
                   'Accept': 'application/json',
                   'Content-type': 'application/json'
                   }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
                .then( this.getTask())
            }
        
                this.task.title = '';
                this.task.descripcion = '';
            },

        deleteTask(id) {
            console.log(id);
            fetch('/api/auth/app/deleteTask/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data =>console.log(data))
            .then(this.getTask());
        },

        updateTask(id) {
            console.log(id);
            fetch('/api/auth/app/' + id)
            .then(res => res.json())
            .then(data => {
                this.task.title = data.title;
                this.task.descripcion = data.descripcion;
            });
            this.edit = true;
            this.id_task = id;
        }
            
        }
    }
</script>