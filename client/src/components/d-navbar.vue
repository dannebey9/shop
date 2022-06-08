<template>
<div>
    <div class="navbar bg-base-100 fixed z-40 shadow-2xl dark:shadow-base-900 dark:shadow-xl">
      <div class="navbar-start">

        <button class="btn btn-ghost normal-case text-xl">Shop</button>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal p-0">
          <li v-for="link in this.links" :key=link.id ><router-link :to="link.li">{{ link.name }}</router-link></li>
        </ul>
      </div>
      <div class="navbar-end">
        <router-link class="btn" to="login" active-class="hidden" v-if="!auth.auth" :key="auth">Войти</router-link>
        <router-link class="btn ml-3" to="register" active-class="hidden" v-if="!auth.auth" :key="auth">Нет аккаунта</router-link>
        <label tabindex="0" class="btn btn-ghost btn-circle" :key="auth" v-if="auth.auth" @click="pushBasket">
          <div class="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span class="badge badge-sm indicator-item">{{ lenBasket.length }}</span>
          </div>
        </label>
        <div class="dropdown dropdown-end" v-if="auth.auth">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><a @click="delToken">Выйти</a></li>
            <li v-if="auth.role === 2"><router-link to="/admin">Админ панель</router-link></li>
          </ul>
        </div>
      </div>
      </div>

  <div class="navbar bg-base-100 shadow-2xl shadow-b bottom-0 fixed z-40 justify-around lg:hidden dark:shadow-base-900 dark:shadow-xl">
    <router-link :to="link.li" class="btn btn-ghost" v-for="link in links" :key=link.id>{{ link.name }}</router-link>
  </div>
</div>
</template>

<script>
//import VueCookies from "vue-cookies";
import router from "@/router/router";
import {useToast} from "vue-toastification";
import {mapGetters, mapActions} from 'vuex';
import VueCookies from "vue-cookies";
import store from "@/vuex/store";



export default {
  name: "d-navbar",
  data(){
    return{
      tokenSet: VueCookies.get("Authorization") !== null,
      links: [
        { name: 'Каталог', li: '/catalog', id: '1'},
        { name: 'Заказы', li: '/orders', id: '2'},
        // { name: 'Корзина', li: '/basket', id: '3' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      auth: 'AUTH',
      lenBasket: 'BASKETS'
    })
  },
  methods:{
    ...mapActions([
        'GET_AUTH'
    ]),
    delToken() {
      VueCookies.remove("Authorization");
      store.dispatch('GET_AUTH');
      useToast().info("Вы вышли из аккаунта")
      router.push("/login");
    },
    getAuthCookie() {
      console.log(this.auth)
    },
    pushBasket(){
      if(this.auth) {
        router.push("/basket")
      }
      else {
        useToast().info("Сначала нужно авторизироватсья")
      }
    },
  },

  mounted() {
    store.dispatch("GET_AUTH")

      store.dispatch('GET_BASKET_PRODUCTS_FROM_API');
      store.dispatch("GET_CREATE_ORDER")

  }
}
</script>

<style scoped>

</style>