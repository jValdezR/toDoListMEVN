import Vue from 'vue';
import router from './router/router.js'
import App from './App.vue'
import app from './components/App.vue'
import login from './components/login.vue'
import newUser from './components/newUser.vue'
import resetPass from './components/resetPass.vue'


new Vue({
    render: h => h(App),
    router,
    components: {App}
}).$mount('#app');//Irá montado en un div con ese id