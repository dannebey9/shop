//import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import VueCookies from 'vue-cookies'
import {useToast} from "vue-toastification";
//import {error} from "@babel/eslint-parser/lib/convert";

//Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        adminProducts: [],
        products: [],
        basketProducts: [],
        auth: {auth: true, role: 2},
        totalBasketPrice: 0,
        orders: [],
        createOrder: [],
        brands: [],
        types: [],
        moveProduct: [],
        ordersAdmin: [],
        orderStatus: [],
        users: [],
        roles: [],
    },
    mutations: {
        ADMIN_SET_PRODUCTS_TO_STATE: (state, adminProducts) => {
            state.adminProducts = adminProducts;
        },
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
        },
        SET_ORDERS: (state, orders) => {
            state.orders = orders
        },
        SET_CREATE_ORDER: (state, create_order) => {
            state.createOrder = create_order
        },
        SET_BRANDS: (state, brands) => {
            state.brands = brands
        },
        SET_TYPES: (state, types) => {
            state.types = types
        },
        SET_MOVE_PRODUCTS: (state, moveProduct) => {
            state.moveProduct = moveProduct
        },
        SET_ORDERS_ADMIN: (state, ordersAdmin) => {
            state.ordersAdmin = ordersAdmin
        },
        SET_ORDER_STATUS: (state, orderStatus) => {
            state.orderStatus = orderStatus
        },
        SET_ALL_USERS_ADMIN: (state, users) => {
            state.users = users
        },
        SET_ALL_ROLES_ADMIN: (state, roles) => {
            state.roles = roles
        }

    },
    actions: {
        ADMIN_GET_PRODUCT_FROM_API({commit}) {
            return axios('http://debitsoft.ru:8080/api/product/getadmin', {
                method: "GET",
            })
                .then((products) => {
                    commit('ADMIN_SET_PRODUCTS_TO_STATE', products.data)
                    return products;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },

        GET_PRODUCT_FROM_API(ctx, obj = null) {
            let strQuery = null
            if (!obj.brandId && obj.typeId) {
                strQuery = `http://debitsoft.ru:8080/api/product?typeId=${obj.typeId}&page=${obj.page}&offset=${obj.offset}`
            }
            if (obj.brandId && !obj.typeId) {
                strQuery = `http://debitsoft.ru:8080/api/product?brandId=${obj.brandId}&page=${obj.page}&offset=${obj.offset}`
            }
            if (obj.brandId && obj.typeId) {
                strQuery = `http://debitsoft.ru:8080/api/product?brandId=${obj.brandId}&brandId${obj.typeId}&page=${obj.page}&offset=${obj.offset}`
            }
            if (!obj.brandId && !obj.typeId) {
                strQuery = `http://debitsoft.ru:8080/api/product?page=${obj.page}&offset=${obj.offset}`
            }
            return axios(strQuery, {
                method: "GET",
            })
                .then((products) => {
                    ctx.commit('SET_PRODUCTS_TO_STATE', products.data)
                    return products;
            })
                .catch((error) => {
                    console.log(error);
                    return error;
                })

        },
        GET_AUTH({commit}) {
            if(VueCookies.get("Authorization") !== null){
                return axios('http://debitsoft.ru:8080/api/user/auth', {
                    method: "GET",
                    headers: {"Authorization": VueCookies.get("Authorization")}
                })
                    .then((response) => {
                            let token = JSON.stringify(response.data.token);
                            let role = response.data.role;
                            if (token){
                                token = token.slice(1, token.length-1);
                                //role = role.slice(1, role.length-1);
                                VueCookies.set('Authorization', `Bearer ${token}`);
                                commit('SET_AUTH_TO_STATE', {auth: true, role: role});
                            }
                            else{
                                VueCookies.remove('Authorization');
                            }
                    })
                    .catch((error) => {
                        VueCookies.remove('Authorization');
                        console.log(error);
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
            return axios('http://debitsoft.ru:8080/api/basket/', {
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
            return axios('http://debitsoft.ru:8080/api/basket/', {
                method: "GET",
                headers: {"Authorization": VueCookies.get("Authorization")}
            })
                .then((basketProducts) => {
                    let totalPrice = 0;
                    basketProducts.data.forEach(function (item){
                        totalPrice += item.quantity * item.product.price
                    })
                    commit('SET_TOTAL_PRICE_TO_STATE', totalPrice)
                    return totalPrice;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },
        GET_ORDERS({commit}) {
            let axios = require('axios');
            let config = {
                method: 'get',
                url: 'http://debitsoft.ru:8080/api/order',
                headers: {"Authorization": VueCookies.get("Authorization")}
            };
            axios(config)
                .then(function (response) {
                    commit('SET_ORDERS', response.data)
                    return response.data
                })
                .catch(function (error) {
                    return error
                });
        },
        GET_ORDERS_ADMIN({commit}) {
            let axios = require('axios');
            let config = {
                method: 'get',
                url: 'http://debitsoft.ru:8080/api/order/admin',
                headers: {"Authorization": VueCookies.get("Authorization")}
            };
            axios(config)
                .then(function (response) {
                    commit('SET_ORDERS_ADMIN', response.data)
                    return response.data
                })
                .catch(function (error) {
                    return error
                });
        },
        GET_CREATE_ORDER({commit}) {
            let axios = require('axios');
            let config = {
                method: 'get',
                url: 'http://debitsoft.ru:8080/api/order/check',
                headers: {
                    'Authorization': VueCookies.get("Authorization")
                }
            };
            axios(config)
                .then((response) => {
                    commit('SET_CREATE_ORDER', response.data.object)
                    return response.data.object
                })
                .catch((err) => {
                    return err
                })
        },
        GET_ALL_BRANDS({commit}) {
            let axios = require('axios');
            let config = {
                method: 'get',
                url: 'http://debitsoft.ru:8080/api/brand',
                headers: {
                    'Authorization': VueCookies.get("Authorization"),
                    'Content-Type': 'application/json'
                },
            };

            axios(config)
                .then(function (response) {
                    commit('SET_BRANDS', response.data)
                })
                .catch(function () {
                    useToast().error("Произошла ошибка загрузки 'Brands'")
                });
        },
        GET_ALL_TYPES({commit}){
            let axios = require('axios');
            let config = {
                method: 'get',
                url: 'http://debitsoft.ru:8080/api/type',
                headers: {
                    'Authorization': VueCookies.get("Authorization"),
                    'Content-Type': 'application/json'
                },
            };

            axios(config)
                .then(function (response) {
                    commit('SET_TYPES', response.data)
                })
                .catch(function () {
                    useToast().error("Произошла ошибка загрузки Type'")
                });
        },
        GET_ROLE_ADMIN({commit}){
            let axios = require('axios');
            let config = {
                method: 'get',
                url: 'http://debitsoft.ru:8080/api/user/getrole',
                headers: {
                    'Authorization': VueCookies.get("Authorization"),
                    'Content-Type': 'application/json'
                },
            };

            axios(config)
                .then(function (response) {
                    console.log(response.data)
                    commit('SET_ALL_ROLES_ADMIN', response.data)
                })
                .catch(function () {
                    useToast().error("Произошла ошибка загрузки ROLE'")
                });
        },
        GET_ORDER_STATUS({commit}){
          let axios = require('axios');
          let config = {
              method: 'get',
              url: 'http://debitsoft.ru:8080/api/order/status',
              headers:{
                  'Authorization': VueCookies.get("Authorization"),
                  'Content-Type': 'application/json'
              }
          };
            axios(config)
                .then(function (response) {
                    commit('SET_ORDER_STATUS', response.data)
                })
                .catch(function () {
                    useToast().error("Произошла ошибка загрузки Type'")
                });
        },
        GET_ALL_MOVE_PRODUCTS({commit}){
            let axios = require('axios');
            let config = {
                method: 'get',
                url: 'http://debitsoft.ru:8080/api/product/getmove',
                headers: {
                    'Authorization': VueCookies.get("Authorization"),
                    'Content-Type': 'application/json'
                },
            };
            axios(config)
                .then(function (response) {
                    commit('SET_MOVE_PRODUCTS', response.data)
                })
                .catch(function () {
                    useToast().error("Произошла ошибка загрузки MoveProduct")
                });
        },
        GET_ALL_USERS_ADMIN({commit}){
            let axios = require('axios');
            let config = {
                method: 'get',
                url: 'http://debitsoft.ru:8080/api/user/get',
                headers: {
                    'Authorization': VueCookies.get("Authorization"),
                    'Content-Type': 'application/json'
                },
            };
            axios(config)
                .then(function (response) {
                    commit('SET_ALL_USERS_ADMIN', response.data)
                })
                .catch(function () {
                    useToast().error("Произошла ошибка загрузки Users")
                });
        }
    },
    getters: {
        ADMIN_PRODUCTS(state) {
            return state.adminProducts.rows
        },
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
        },
        ORDERS(state){
            return state.orders;
        },
        CREATE_ORDER(state){
            return state.createOrder
        },
        BRANDS(state) {
            return state.brands
        },
        TYPES(state) {
            return state.types
        },
        MOVE_PRODUCTS(state) {
            return state.moveProduct
        },
        ORDERS_ADMIN(state){
            return state.ordersAdmin
        },
        ORDER_STATUS(state){
            return state.orderStatus
        },
        USERS_ADMIN(state){
            return state.users
        },
        ROLE_ADMIN(state){
            return state.roles
        }
    }
})

export default store;