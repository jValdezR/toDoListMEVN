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
                                     <input type="text" placeholder="Agrega una tarea" class="form-control">
                                </div>
                            
                                <div class="form-group">
                                    <textarea class="form-control" placeholder="Agrega una descripcion" cols="30" rows="10"></textarea>
                                </div>            
                           
                                <button class="btn btn-primary btn-block">Guardar</button>
                            </form>
                        </div>
                    </div>
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
            }
        }
    },
    methods: {
        addTask() {
            console.log(this.task);
        }
    }
}
</script>