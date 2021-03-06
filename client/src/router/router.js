import { createRouter, createWebHistory } from 'vue-router';

import dCatalog from '../components/d-catalog'
import dBasket from '../components/d-basket'
import dLogin from '../components/d-login'
import dRegister from '../components/d-register'
import dCreateOrder from '../components/d-create-order'
import dOrders from '../components/d-orders'
//import dNotFound from '../components/d-not-found'
import AdminHome from '../components/Admin/a-home'
import AProducts from "@/components/Admin/a-products";

import auth from "@/router/middleware/auth";
import guest from "@/router/middleware/guest";
import middlewarePipeline from './middlewarePipeline'
import store from "@/vuex/store";
import AProductsMove from "@/components/Admin/a-products-move";
import ABrands from "@/components/Admin/a-brands";
import ATypes from "@/components/Admin/a-types";
import AOrders from "@/components/Admin/a-orders";
import admin from "@/router/middleware/admin";
import AUsers from "@/components/Admin/a-users";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/catalog'
        },
        {
            path: '/catalog',
            name: 'catalog',
            component: dCatalog
        },
        {
            path: '/basket',
            name: 'basket',
            component: dBasket,
            meta: {
                middleware: [
                    auth
                ]
            },
            // beforeEnter: (to, from, next) => {
            //     if(store.getters.AUTH) next()
            //     else next({ name: 'login'})
            // }
        },
        {
            path: '/login',
            name: 'login',
            component: dLogin,
            meta: {
                middleware: [
                    guest
                ]
            },
        },
        {
            path: '/register',
            name: 'register',
            component: dRegister,
            meta: {
                middleware: [
                    guest
                ]
            },
        },
        {
            path: '/order/create',
            name: 'createOrder',
            component: dCreateOrder,
            meta: {
                middleware: [
                    auth
                ]
            }
        },
        {
            path: '/orders',
            name: 'Orders',
            component: dOrders,
            meta: {
                middleware: [
                    auth
                ]
            }
        },
        {
            path: '/admin',
            name: 'Admin',
            component: AdminHome,
            meta: {
                layout: 'admin-layout',
                middleware: [
                    admin
                ]
            }
        },
        {
            path: '/admin/products',
            name: 'AdminProducts',
            component: AProducts,
            meta: {
                layout: 'admin-layout',
                middleware: [
                    admin
                ]
            }
        },
        {
            path: '/admin/products/move',
            name: 'AdminProductsMove',
            component: AProductsMove,
            meta: {
                layout: 'admin-layout',
                middleware: [
                    admin
                ]
            }
        },
        {
            path: '/admin/brands',
            name: 'ABrands',
            component: ABrands,
            meta: {
                layout: 'admin-layout',
                middleware: [
                    admin
                ]
            }
        },
        {
            path: '/admin/types',
            name: 'ATypes',
            component: ATypes,
            meta: {
                layout: 'admin-layout',
                middleware: [
                    admin
                ]
            }
        },
        {
            path: '/admin/orders',
            name: 'AOrders',
            component: AOrders,
            meta: {
                layout: 'admin-layout',
                middleware: [
                    admin
                ]
            }
        },
        {
            path: '/admin/users',
            name: 'AUsers',
            component: AUsers,
            meta: {
                layout: 'admin-layout',
                middleware: [
                    admin
                ]
            }
        },
        // { path: '/404', component: dNotFound},
        // { path: '/:pathMatch(.*)*', redirect: '/404' },
    ]
})

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware
    const context = {
        to,
        from,
        next,
        store
    }
    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
})

export default router;