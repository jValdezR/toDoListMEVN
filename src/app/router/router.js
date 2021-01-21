import Vue from "vue";
import Router from "vue-router";

import login from '../components/login.vue'
import App from '../components/App.vue'
import newUser from '../components/newUser.vue'
import resetPass from '../components/resetPass.vue'

Vue.use(Router);

export default new Router({
    mode: "history",
    linkActiveClass: "active",
    routes: [
        {
            path: "/",
            name: "login",
            component: login
        },
        {
            path: "/register",
            name: "register",
            component: newUser
        },
        {
            path: "/resetPass",
            name: "resetPass",
            component: resetPass
        },
        {
            path: "/app",
            name: "app",
            component: App
        },

    ]
});