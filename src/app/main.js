import Vue from 'vue';
import router from './router/router.js'
import App from './App.vue'
import app from './components/App.vue'
import login from './components/login.vue'
import newUser from './components/newUser.vue'
import resetPass from './components/resetPass.vue'
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

new Vue({
    render: h => h(resetPass),
    router,
    components: {resetPass}
}).$mount('#app');//Irá montado en un div con ese id