<template>
    <!-- Image and text -->
<nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand">Jesus Daniel Valdez Rodriguez - 17130850</a>
        <form class="d-flex">
          <router-link :to="{ name: 'register' }">
            <button class="btn btn-outline-success" type="submit">
              Crear cuenta
            </button>
          </router-link>

          <router-link class="" :to="{ name: 'resetPass' }">
            <button class="btn btn-outline-success ms-3" type="submit">
              Recuperar cuenta
            </button>
          </router-link>
        </form>
      </div>
    </nav>
</template>

<script>
export default {
    
}
</script>