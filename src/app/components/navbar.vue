<template>
    <!-- Image and text -->
<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <i class="fas fa-user"></i>
      {{user.name}}
    </a>
  </div>
</nav>
</template>

<script>
export default {
    data() {
        return {
            user: {
                name: '',
                mail: '',
                phone: '',
                pass: ''
            }
        }
    },
    created() {
        this.getUserinfo();
    },
    methods: {
        getUserinfo() {
            const ide = sessionStorage.getItem('id');
            
            fetch('/api/auth/' + ide)
            .then(res => res.json())
            .then(data => {
                this.user.name = data[0]['name'];
                this.user.mail = data[0]['mail'];
                this.user.phone = data[0]['phone'];
            })
        }
    }
}
</script>