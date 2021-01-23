import Vue from 'vue';
import router from './router/router.js'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

new Vue({
    render: h => h(App),
    router,
    components: {App}
}).$mount('#app');//Irá montado en un div con ese id