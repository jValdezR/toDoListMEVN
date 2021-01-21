<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Iniciar sesion</h5>
            <form @submit.prevent="register" class="form-signin">
                <div class="form-label-group">
                <input
                  v-model="user.name"
                  type="text"
                  class="form-control"
                  placeholder="Nombre(s)"
                  required
                  autofocus

                />
              </div>

              <div class="form-label-group">
                <input
                  v-model="user.mail"
                  type="email"
                  class="form-control"
                  placeholder="correo@example.com"
                  required
                />
              </div>

                <div class="form-label-group">
                <input
                  v-model="user.phone"
                  type="phone"
                  class="form-control"
                  placeholder="Numero a 10 digitos"
                  required
                />
              </div>
              <div class="form-label-group">
                <input
                  v-model="user.pass"
                  type="password"
                  class="form-control"
                  placeholder="Contraseña"
                  required
                />
              </div>
              <button
                class="btn btn-lg btn-primary btn-block text-uppercase"
                type="submit"
              >
                Registrar
              </button>
              <br>
              <hr class="my-4" />
            </form>
            <router-link :to="{name: 'login'}">
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
        name: "",
        mail: "",
        phone: "",
        pass: "",
      },
    }
  },
  methods: {
    register() {
      fetch('/api/auth/newUser', {
        method: 'POST',
        body: JSON.stringify(this.user),
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    },
  },
};
</script>
