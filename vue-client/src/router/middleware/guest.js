//import store from "@/vuex/store";

export default function guest ({ next, store }){
    if(store.getters.AUTH){
        return next({
            name: 'catalog'
        })
    }

    return next()
}