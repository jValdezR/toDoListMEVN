<template>
  <div class="container">
    <my-nav></my-nav>
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Iniciar sesion</h5>
            <form @submit.prevent="login" class="form-signin">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >E-mail</label
                >
                <input
                  v-model="userLogin.mail"
                  type="email"
                  id="inputEmail"
                  class="form-control"
                  placeholder="correo@example.com"
                  required
                  autofocus
                />
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Contraseña</label
                >
                <input
                  v-model="userLogin.pass"
                  type="password"
                  id="inputPassword"
                  class="form-control"
                  placeholder="Contraseña"
                  required
                />
              </div>

              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" id="checkbox" v-model="checked" />
                <label for="checkbox">{{ checked }}</label>
              </div>
              <div class="d-grid gap-2 col-6 mx-auto">
                <button class="btn btn-success btn-lg" type="submit">
                  Entrar
                </button>
                <hr class="my-4" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import nav from '../components/navbar-login.vue'
export default {
  components: {
        'my-nav': nav
    },
  data() {
    return {
      userLogin: {
        mail: "",
        pass: "",
      },
      checked: "Recordar pass",
    };
  },
  created() {
    this.loadStorage();
  },
  methods: {
    wrongPass() {
      // Use sweetalert2
      this.$swal({
        title: "Error!",
        text: "La contraseña no coincide.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    },
    unkownMail() {
      // Use sweetalert2
      this.$swal({
        title: "Error!",
        text: "No se encuentra registrado.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    },
    mailNotConfirmed() {
      // Use sweetalert2
      this.$swal({
        title: "Error!",
        text: "No ha confirmado su email",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    },
    loadStorage() {
      const password = JSON.parse(localStorage.getItem("user"));
      if (password) {
        this.userLogin.mail = password["mail"];
        this.userLogin.pass = password["pass"];
      }
    },
    login() {
      fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(this.userLogin),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "ok") {
            if (this.checked) {
              localStorage.setItem("user", JSON.stringify(this.userLogin));
            }
            sessionStorage.setItem("id", JSON.stringify(data.id));
            this.$router.push("App");
          } else if (data.status == "failed") {
            this.wrongPass();
          } else if (data.status == "not-confirmed") {
            this.mailNotConfirmed();
          } else {
            this.unkownMail();
          }
        });
    },
  },
};
</script>