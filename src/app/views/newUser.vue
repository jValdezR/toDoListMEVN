<template>
  <div class="container">
    <my-nav></my-nav>
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Iniciar sesion</h5>
            <form @submit.prevent="register" class="form-signin">
              <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Nombre</label>
              <input
                  v-model="user.name"
                  type="text"
                  
                  class="form-control"
                  placeholder="Nombre(s)"
                  required
                  autofocus
                />
              </div>

            

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">E-mail</label>
                <input
                  v-model="user.mail"
                  type="email"
                  id="inputEmail"
                  class="form-control"
                  placeholder="correo@example.com"
                  required
                />
              </div>

              <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Telefono</label>
              <input
                  v-model="user.phone"
                  type="phone"
                  class="form-control"
                  placeholder="Numero a 10 digitos"
                  required
                  
                />
              </div>

            

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Constraseña</label>
                <input
                  v-model="user.pass"
                  type="password"
                  id="inputPassword"
                  class="form-control"
                  placeholder="Contraseña"
                  required
                />
              </div>

              <input
                  v-model="user.active"
                  type="password"
                  id="inputPassword"
                  class="form-control"
                  hidden
                  value="false"
                />

                
              <br>
              <button
                class="btn btn-outline-success"
                type="submit"
              >
                Registrar
              </button>
              <br>
              <hr class="my-4" />
            </form>
            <router-link :to="{name: 'login'}">
              <button class="btn btn-outline-danger">Regresar</button>
            </router-link>
            
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
      user: {
        name: "",
        mail: "",
        phone: "",
        pass: "",
        active: false
      },
    }
  },
  methods: {
    registered() {
      // Use sweetalert2
      this.$swal({
        title: "Listo!",
        text: "Registrado con exito",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
    },
    alreadyRegistered() {
      // Use sweetalert2
      this.$swal({
        title: "Error!",
        text: "Ya se encuentra registrado.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    },
    register() {
      console.log(this.user);
      fetch('/api/auth/newUser', {
        method: 'POST',
        body: JSON.stringify(this.user),
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.status == 'Email already registered!'){
            this.alreadyRegistered();
          }
          else
          this.registered();
        });
    },
  },
};
</script>
