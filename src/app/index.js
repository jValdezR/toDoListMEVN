import Vue from 'vue';
import App from './components/App.vue';
import login from './components/login.vue'
import newUser from './components/newUser.vue'
new Vue({
    render: h => h(login)
}).$mount('#app');//Irá montado en un div con ese id