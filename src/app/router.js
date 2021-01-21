import Vue from "vue";
import Router from "vue-router";
import App from './App.vue'

Vue.use(Router);

const routes = [
    {
        path: "/",
        name: "App",
        component: App
    }
];

const router = new Router({
    mode: "history",
    routes
});

export default router;