//import store from "@/vuex/store";

import {useToast} from "vue-toastification";

export default function admin ({ next, store }){
    if(store.getters.AUTH.role !== 2){
        useToast().error("Вы не явлветесь администратором")
        return next({
            name: 'catalog'
        })
    }

    return next()
}