//import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import VueCookies from 'vue-cookies'
//import {error} from "@babel/eslint-parser/lib/convert";

//Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        products: [],
        basketProducts: [],
        auth: true,
        totalBasketPrice: 0
    },
    mutations: {
        SET_PRODUCTS_TO_STATE: (state, products) => {
            state.products = products;
        },
        SET_BASKET_PRODUCTS_TO_STATE: (state, basketProducts) => {
            state.basketProducts = basketProducts;
        },
        SET_AUTH_TO_STATE: (state, auth) => {
            state.auth = auth;
        },
        SET_TOTAL_PRICE_TO_STATE: (state, totalBasketPrice) => {
            state.totalBasketPrice = totalBasketPrice;
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
        GET_AUTH({commit}) {
            if(VueCookies.get("Authorization") !== null){
                return axios('http://10.10.5.200:5000/api/user/auth', {
                    method: "GET",
                    headers: {"Authorization": VueCookies.get("Authorization")}
                })
                    .then((authToken) => {
                            let token = JSON.stringify(authToken.data.token);
                            token = token.slice(1, token.length-1);
                            VueCookies.set('Authorization', `Bearer ${token}`);
                            commit('SET_AUTH_TO_STATE', true);
                            return true;
                    })
                    .catch((error) => {
                        VueCookies.remove('Authorization');
                        console.log(error);
                        return error;
                })
                // commit('SET_AUTH_TO_STATE', VueCookies.get("Authorization") !== null)
                // return (VueCookies.get("Authorization") !== null)
        }
            else{
                commit('SET_AUTH_TO_STATE', false);
                return false
            }
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
        },
        GET_TOTAL_PRICE_FROM_API({commit}) {
            return axios('http://10.10.5.200:5000/api/basket/', {
                method: "GET",
                headers: {"Authorization": VueCookies.get("Authorization")}
            })
                .then((basketProducts) => {
                    let totalPrice = 0;
                    basketProducts.data.forEach(function (item){
                        console.log(item.quantity, item.product)
                        console.log(item)
                        totalPrice += item.quantity * item.product.price
                    })
                    commit('SET_TOTAL_PRICE_TO_STATE', totalPrice)
                    return totalPrice;
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
        },
        AUTH(state) {
            return state.auth;
        },
        TOTAL_PRICE(state){
            return state.totalBasketPrice;
        }
    }
})

export default store;