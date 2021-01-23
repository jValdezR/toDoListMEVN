<template>
  <!-- Image and text -->
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <div>
        <router-link :to="{ name: 'user' }">
          <i class="fas fa-user"></i>
          <a class="navbar-brand ms-3">
            {{ user.name }}
          </a>
        </router-link>
      </div>
      <form class="d-flex">
        <router-link :to="{ name: 'login' }"
          ><button class="btn btn-outline-danger float-right">
            Cerrar sesión
          </button></router-link
        >
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
      },
    };
  },
  created() {
    this.getUserinfo();
  },
  methods: {
    getUserinfo() {
      const ide = sessionStorage.getItem("id");

      fetch("/api/auth/" + ide)
        .then((res) => res.json())
        .then((data) => {
          this.user.name = data[0]["name"];
        });
    },
  },
};
</script>