import Vue from "vue";
import Router from "vue-router";

import login from '../views/login.vue'
import App from '../views/App.vue'
import newUser from '../views/newUser.vue'
import resetPass from '../views/resetPass.vue'

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

