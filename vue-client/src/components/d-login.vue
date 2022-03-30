<template>
  <div class="d-login h-screen">
    <div class="w-full max-w-xs h-screen m-auto pt-[20%]">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="loginUser" novalidate>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="e-mail">
            E-mail
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" v-model="email" placeholder="Username">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Пароль
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" v-model="password" placeholder="******************">
        </div>
        <div class="flex items-center justify-between">
          <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Войти">
          <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Забыли пароль?
          </a>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2022 DEBitSoft Corp. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
//import {LogPost} from "@/axios/http-common";
import axios from "axios";
import VueCookies from 'vue-cookies'
import router from "@/router/router";
import { useToast } from "vue-toastification";
//import {error} from "@babel/eslint-parser/lib/convert";



export default {
  name: "d-login",
  data(){
    return {
      postBody: {
        email: "",
        password: ""
      }
    }
  },
  methods:{
    loginUser(){
      let data = JSON.stringify({
        "email": this.email,
        "password": this.password
      });
      let config = {
        method: 'post',
        url: "http://10.10.5.200:5000/api/user/login",
        headers: {
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
          .then(function (response) {
            let token = JSON.stringify(response.data.token)
            token = token.slice(1, token.length-1)
            VueCookies.set('Authorization', `Bearer ${token}`);
            router.push("/catalog")
            useToast().info("Вы успешно авторизировались!")
          })
          .catch(function (error) {
            useToast().error("Ошибка авторизации!" + error)
          });
    }
  }
}
</script>

<style scoped>

</style>