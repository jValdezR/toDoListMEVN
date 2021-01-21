import Vue from 'vue';
import router from './router.js'
import login from './views/login.vue'
import newUser from './views/newUser.vue'
import resetPass from './views/resetPass.vue'


 var vm = new Vue({
    router,
    render: h => h(login)
}).$mount('#app');//Irá montado en un div con ese id