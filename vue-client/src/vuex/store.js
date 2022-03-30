//import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import VueCookies from 'vue-cookies'

//Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        products: [],
        basketProducts: []
    },
    mutations: {
        SET_PRODUCTS_TO_STATE: (state, products) => {
            state.products = products;
        },
        SET_BASKET_PRODUCTS_TO_STATE: (state, basketProducts) => {
            state.basketProducts = basketProducts;
        }
    },
    actions: {
        GET_PRODUCT_FROM_API({commit}) {
            return axios('http://10.10.5.200:5000/api/product/', {
                method: "GET",
            })
                .then((products) => {
                    commit('SET_PRODUCTS_TO_STATE', products.data)
                    return products;
            })
                .catch((error) => {
                    console.log(error);
                    return error;
                })

        },
        GET_BASKET_PRODUCTS_FROM_API({commit}) {
            return axios('http://10.10.5.200:5000/api/basket/', {
                method: "GET",
                headers: {"Authorization": VueCookies.get("Authorization")}
            })
                .then((basketProducts) => {
                    commit('SET_BASKET_PRODUCTS_TO_STATE', basketProducts.data)
                    return basketProducts;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        }
    },
    getters: {
        PRODUCTS(state) {
            return state.products.rows;
        },
        BASKETS(state) {
            return state.basketProducts;
        }
    }
})

export default store;