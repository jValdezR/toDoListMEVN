<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Iniciar sesion</h5>
            <form @submit.prevent="login" class="form-signin">
              <div class="form-label-group">
                <input v-model="userLogin.mail" type="email" id="inputEmail" class="form-control" placeholder="correo@example.com" required autofocus>
                
              </div>

              <div class="form-label-group">
                <input v-model="userLogin.pass" type="password" id="inputPassword" class="form-control" placeholder="Contraseña" required>
                
              </div>

              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">Recordar contraseña</label>
              </div>
              <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Entrar</button>
              <br>

              <a href="">No tienes cuenta?</a>
              <br>
              <a href="">Olvidaste tu contraseña?</a>
              <hr class="my-4">

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
        userLogin: {
          mail: '',
          pass: ''
        }
      }
      
    },
    methods: {
       login() {
         fetch('/login', {
           method: 'POST',
           body: JSON.stringify(this.userLogin),
           headers: {
                   'Accept': 'application/json',
                   'Content-type': 'application/json'
                   }
         })
         .then(res => res.json())
         .then(data => console.log(data))
       }
    }
}
</script>