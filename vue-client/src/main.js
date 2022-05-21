// import { createApp } from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from './router/router'
import VueCookies from 'vue-cookies'
import './index.css'
import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
//import { createStore } from "vuex";

// createApp(App).mount('#app');
// createApp(App).use(store).mount('#app');

// const store = createStore({
//     /* state, actions, mutations */
// });
const app = createApp(App);
app.use(store);
app.use(Toast, {
    transition: "Vue-Toastification__fade",
    maxToasts: 20,
    newestOnTop: true
});
app.use(router);
app.use(VueCookies, { expire: '7d'});
app.mount("#app");