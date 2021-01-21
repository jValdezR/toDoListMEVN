<template>
    <div>
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">

                    <a class="navbar-brand" href="#">Jesus Daniel Valdez Rodriguez</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <router-link tag="li" to="/" exact>
                            <a>login</a>
                        </router-link>
                        <router-link tag="li" to="/register">
                            <a>Registro</a>
                        </router-link>
                        <router-link tag="li" to="/resetPass">
                            <a>Olvidé mi contraseña</a>
                        </router-link>                       
                    </ul>
                </div>
            </div>
        </nav>

        <router-view></router-view>

        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <hr>

                    <footer>
                        <p>© 2020 Pila completa 1 - Ing. Juan Carlos Ulloa</p>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
    body {
        padding-top: 50px;
    }
</style>