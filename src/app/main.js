import Vue from 'vue';
import router from './router.js'
import login from './views/resetPass.vue'


 var vm = new Vue({
    router,
    render: h => h(login)
}).$mount('#app');//Irá montado en un div con ese id