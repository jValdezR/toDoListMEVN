<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">Proyecto</a>
        </nav>

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
                                <button class="btn btn-primary btn-block">Guardar</button>
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
                            <tr v-for="task of tasks">
                                <td>
                                    {{task.title}}
                                </td>
                                <td>{{task.descripcion}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>



export default {
    data() {
        return {
            task: {
                title: '',
                descripcion: ''
            },
            tasks: []
        }
    },
    created() {
        this.getTask();
    },
    methods: {
        getTask(){
            fetch('/tasks')
            .then(res => res.json())
            .then( data  => {
                console.log(data);
                this.tasks = data;
            })
        },
        addTask() {
            fetch('/tasks',{
                method: 'POST',
                body: JSON.stringify(this.task),
                headers: {
                   'Accept': 'application/json',
                   'Content-type': 'application/json'
                   }
                })
                .then( res => res.json())
                .then( data => console.log(data))

                this.task.title = '';
                this.task.descripcion = '';
            },

            
        }
    }
</script>