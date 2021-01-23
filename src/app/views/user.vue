<template>
  <div>
    <div class="container">
      <my-nav></my-nav>

      <div id="mi-info">
        <div class="container m-t-70">
          <div class="card">
            <div class="row justify-content-start m-b-30">
              <div class="col-4">
                <i class="fas fa-user-circle fa-5x m-l-110"></i>
              </div>
            </div>

            <div class="row justify-content-start">
              <div class="col-2"></div>
              <div class="col-8">
                <label class="m-l-200 txtInfoTitulo">Nombre:</label>
                <label class="m-l-30 txtInfoDesc">{{ user.name }}</label>
              </div>
              <div class="col-2"></div>
            </div>

            <div class="row justify-content-start">
              <div class="col-2"></div>
              <div class="col-8">
                <label class="m-l-200 txtInfoTitulo">Correo:</label>
                <label class="m-l-38 txtInfoDesc">{{ user.mail }}</label>
              </div>
              <div class="col-2"></div>
            </div>

            <div class="row justify-content-start">
              <div class="col-2"></div>
              <div class="col-8">
                <label class="m-l-200 txtInfoTitulo">Telefono:</label>
                <label class="m-l-20 txtInfoDesc">{{ user.phone }}</label>
              </div>
              <div>
                <button @click="changePass()" type="button" class="btn btn-success btn-lg">
                  Cambiar contraseña
                </button>
                <template v-if="editpass === true">
                    <div>
                        <label for="">Introduce tu contraseña actual</label>
                        <input type="password" name="" id="">
                    </div>
                    <div>
                        <label for="">Introduce tu nueva contraseña</label>
                        <input type="password" name="" id="">
                    </div>

                    <div>
                        <button class="btn btn-danger">Cambiar contraseña</button>
                    </div>
                </template>
                <template v-else></template>
              </div>
              <div class="col-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import nav from "../components/navbar.vue";

export default {
  components: {
    "my-nav": nav,
  },
  data() {
    return {
      user: {
        name: "",
        mail: "",
        phone: "",
        pass: "",
      },
      editpass: false,
    };
  },
  created() {
    this.getUserinfo();
  },
  methods: {
    changePass() {
        this.editpass = true;
    },
    getUserinfo() {
      const ide = sessionStorage.getItem("id");

      fetch("/api/auth/" + ide)
        .then((res) => res.json())
        .then((data) => {
          this.user.name = data[0]["name"];
          this.user.mail = data[0]["mail"];
          this.user.phone = data[0]["phone"];
        });
    },
  },
};
</script>