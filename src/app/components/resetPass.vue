<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Recupera tu contraseña</h5>
            <form @submit.prevent="register" class="form-signin">

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

              <button
                class="btn btn-lg btn-primary btn-block text-uppercase"
                type="submit"
              >
                Recuperar
              </button>
              <br />
              <hr class="my-4" />
            </form>
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
        mail: ""
      },
    };
  },
  methods: {
    register() {
      fetch("/newUser", {
        method: "POST",
        body: JSON.stringify(this.user),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    },
  },
};
</script>
