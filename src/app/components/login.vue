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
                <input type="checkbox" id="checkbox" v-model="checked">
                <label for="checkbox">{{ checked }}</label>
              </div>
              <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Entrar</button>
              <br>
              <router-link :to="{name: 'register'}">
                <button class="btn btn-secondary btn-block">Crear una cuenta</button>
              </router-link>
              
              <br>
              <router-link :to="{name: 'resetPass'}">
                <button class="btn btn-secondary btn-block">Recuperar constraseña</button>
              </router-link>
              
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
        },
        checked: 'Recordar pass'
      }
      
    },
    methods: {
       login() {
         fetch('/api/auth/login', {
           method: 'POST',
           body: JSON.stringify(this.userLogin),
           headers: {
                   'Accept': 'application/json',
                   'Content-type': 'application/json'
                   }
         })
         .then(res => res.json())
         .then(data => {

           if(data.status == 'ok'){
             if(this.checked){
               localStorage.setItem('user', JSON.stringify(this.userLogin));
             }
             sessionStorage.setItem('id', JSON.stringify(data.id));
             this.$router.push('App')
           }
           
         })
       }
    }
}
</script>