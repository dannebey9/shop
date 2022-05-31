// import { createApp } from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from './router/router'
import VueCookies from 'vue-cookies'
import './index.css'
import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import './all.min.css'
import dMainLayout from './components/layouts/d-main-layout'
import adminLayout from "@/components/layouts/admin-layout";



const app = createApp(App);

app.use(store);
app.use('dMainLayout', dMainLayout);
app.use('adminLayout', adminLayout);
app.use(VueSidebarMenu)
app.use(Toast, {
    transition: "Vue-Toastification__fade",
    maxToasts: 3,
    newestOnTop: true
});
app.use(router);
app.use(VueCookies, { expire: '7d'});
app.mount("#app");