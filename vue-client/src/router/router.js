import { createRouter, createWebHistory } from 'vue-router';

import dCatalog from '../components/d-catalog'
import dBasket from '../components/d-basket'
import dLogin from '../components/d-login'
import dRegister from '../components/d-register'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/catalog',
            name: 'catalog',
            component: dCatalog
        },
        {
            path: '/basket',
            name: 'basket',
            component: dBasket
        },
        {
            path: '/login',
            name: 'login',
            component: dLogin
        },
        {
            path: '/register',
            name: 'register',
            component: dRegister
        }

    ]
})

export default router;