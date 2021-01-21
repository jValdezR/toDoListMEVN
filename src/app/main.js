import Vue from 'vue';
import router from './router'
import login from './views/login.vue'


new Vue({
    router,
    render: h => h(login)
}).$mount('#app');//Irá montado en un div con ese id