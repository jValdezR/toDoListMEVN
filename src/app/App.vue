<template>
  <div>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              <i class="fas fa-user"></i>
              Jesus Daniel Valdez Rodriguez
            </a>
          </div>
        </nav>
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
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.fondo {
  background: #111;
  color: #fff;
  width: 100%;
  text-align: center;
  padding: 1em;
  align-self: flex-end;
}
</style>