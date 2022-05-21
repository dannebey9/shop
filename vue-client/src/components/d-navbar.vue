<template>
<div>
    <div class="navbar bg-base-100 fixed z-40 shadow-2xl dark:shadow-base-900 dark:shadow-xl">
      <div class="navbar-start">

        <button class="btn btn-ghost normal-case text-xl">Shop</button>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal p-0">
          <li v-for="link in links" :key=link.id ><router-link :to="link.li">{{ link.name }}</router-link></li>
        </ul>
      </div>
      <div class="navbar-end">
        <router-link class="btn" to="login" active-class="hidden" v-if="!auth" :key="auth">Войти</router-link>
        <router-link class="btn ml-3" to="register" active-class="hidden" v-if="!auth" :key="auth">Нет аккаунта</router-link>
        <label tabindex="0" class="btn btn-ghost btn-circle" :key="auth" v-if="auth" @click="pushBasket">
          <div class="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span class="badge badge-sm indicator-item">{{ lenBasket.length }}</span>
          </div>
        </label>
        <div class="dropdown dropdown-end" v-if="auth">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><button @click="delToken">Выйти</button></li>
          </ul>
        </div>
      </div>
      </div>

  <div class="navbar bg-base-100 shadow-2xl shadow-b bottom-0 fixed z-40 justify-around lg:hidden dark:shadow-base-900 dark:shadow-xl">
    <router-link :to="link.li" class="btn btn-ghost" v-for="link in links" :key=link.id>{{ link.name }}</router-link>
  </div>
</div>




<!--    <div class="d-navbar z-30">-->
<!--      <nav-->
<!--          class="-->
<!--        navbar-->
<!--        bg-base-100-->
<!--  fixed-->
<!--  w-full-->
<!--  z-30-->
<!--  flex flex-wrap-->
<!--  items-center-->
<!--  justify-between-->
<!--  py-4-->

<!--  z-50-->
<!--  text-gray-500-->
<!--  hover:text-gray-700-->
<!--  focus:text-gray-700-->
<!--  shadow-lg-->
<!--  navbar navbar-expand-lg-->
<!--  "-->
<!--      >-->
<!--        <div class="container-fluid w-full flex  px-6">-->
<!--          <div class="flex flex-grow " id="navbarSupportedContent">-->
<!--            <a-->
<!--                class="-->
<!--        flex-->
<!--        items-center-->
<!--        normal-case-->
<!--        btn btn-ghost-->
<!--        mt-0-->
<!--		text-2xl-->
<!--        lg:mt-0-->
<!--        mr-1-->
<!--      "-->
<!--                href="#"-->
<!--            >-->
<!--              siteName-->
<!--            </a>-->
<!--            &lt;!&ndash; Left links &ndash;&gt;-->
<!--            <ul class="navbar-nav hidden sm:flex pl-0 list-style-none mr-auto">-->

<!--              <li class="nav-item p-2" id="id" v-for="link in links" :key="link.id" >-->
<!--                <router-link class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" :active-class="'disabled pointer-events-none cursor-default text-[#999]'" :to=link.li>{{link.name}}</router-link>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
<!--          <div class="flex items-center relative">-->
<!--            &lt;!&ndash; Icon &ndash;&gt;-->
<!--            <button class="text-gray-500 hover:text-gray-700 focus:text-gray-700 mr-4 hide-mobile" :key="auth" v-if="auth" @click="pushBasket">-->
<!--              <svg-->

<!--                  aria-hidden="true"-->
<!--                  focusable="false"-->
<!--                  data-prefix="fas"-->
<!--                  data-icon="shopping-cart"-->
<!--                  class="w-4"-->
<!--                  role="img"-->
<!--                  xmlns="http://www.w3.org/2000/svg"-->
<!--                  viewBox="0 0 576 512"-->
<!--              >-->
<!--                <path-->
<!--                    fill="currentColor"-->
<!--                    d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"-->
<!--                />-->
<!--              </svg>-->
<!--            </button>-->
<!--            <button-->
<!--                class="btn btn-link"-->
<!--                v-if="auth"-->
<!--                :key="auth"-->
<!--            >-->
<!--              <img-->
<!--                  src="https://mdbootstrap.com/img/new/avatars/2.jpg"-->
<!--                  class="rounded-full"-->
<!--                  style="height: 25px; width: 25px"-->
<!--                  alt=""-->
<!--                  loading="lazy"-->
<!--              />-->
<!--            </button>-->
<!--            <router-link to="login" active-class="hidden" v-if="!auth" :key="auth" class="btn btn-sm btn-outline ml-3 btn-success">-->
<!--              Вход-->
<!--            </router-link>-->
<!--            <router-link to="register" active-class="hidden" v-if="!auth" :key="auth" class="btn btn-sm btn-outline ml-3 btn-info">-->
<!--              Нет аккаунта-->
<!--            </router-link>-->
<!--            <button class="btn btn-ghost text-red-600 btn-sm" v-if="auth" @click="delToken">-->
<!--              Выйти-->
<!--            </button>-->
<!--          </div>-->
<!--          &lt;!&ndash; Right elements &ndash;&gt;-->
<!--        </div>-->
<!--      </nav>-->

<!--      <div-->
<!--          class="bg-blue-600 transition-all sm:hidden duration-300 z-2 mx-auto my-auto w-screen h-16 bottom-0 fixed flex items-stretch justify-center z-30"-->
<!--      >-->
<!--        <ul class="self-center flex">-->
<!--          <li class=" text-sm leading-8 mb-2 mt-2 py-1 px-5 flex flex-col justify-center text-white" v-for="link in links" :key=link.id>-->
<!--            <router-link class="text-center flex-col justify-center" :active-class="'disabled pointer-events-none cursor-default text-[#999]'" :to=link.li>-->
<!--              <h3>{{link.name}}</h3>-->
<!--            </router-link>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
<!--    </div>-->

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
        { name: 'Главная', li: '/', id: '1' },
        { name: 'Каталог', li: '/catalog', id: '2'},
        { name: 'О нас', li: '/aboutus', id: '3'},
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
    console.log("this.auth " + this.auth);
    this.GET_AUTH()
        .then((response) =>{
          console.log(response);
        })
  }
}
</script>

<style scoped>

</style>