import Vue from 'vue';
import router from './router'
import App from './views/login.vue'


new Vue({
    //router,
    render: h => h(App)
}).$mount('#app');//Irá montado en un div con ese id