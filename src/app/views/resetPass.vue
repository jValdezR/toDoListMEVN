<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Recupera tu contraseña</h5>
            <form @submit.prevent="reset" class="form-signin">
              <div class="form-label-group">
                <input
                  v-model="user.mail"
                  type="email"
                  class="form-control"
                  placeholder="correo@example.com"
                  required
                  autofocus
                />
              </div>
              <br />
              <button class="btn btn-lg btn-primary btn-block" type="submit">
                Recuperar
              </button>
              <br />
              <hr class="my-4" />
            </form>
            <router-link :to="{ name: 'login' }">
              <button class="btn btn-danger">Regresar</button>
            </router-link>
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
      user: {
        mail: "",
      },
    };
  },
  methods: {
    resetPass() {
      // Use sweetalert2
      this.$swal({
        title: "Listo",
        text:
          "Se ha enviado un enlace a tu correo para reestablecer tu contraseña",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
    },
    reset() {
      fetch("/api/auth/recovery/", {
        method: "POST",
        body: JSON.stringify(this.user),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      }).then(res =>res.json())
      .then(data =>console.log(data));
      this.resetPass();
    },
  },
};
</script>
