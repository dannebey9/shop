//import store from "@/vuex/store";
//import router from "@/router/router";

export default function auth({ next, store }) {
    if(!store.getters.AUTH) {
        return next({
            name: 'login'
        })
    }
    return next()
}