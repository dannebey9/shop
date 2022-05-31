<template>
  <div class="d-login">
    <div class="w-full max-w-xs h-screen m-auto pt-[20%]">
      <form class="card card-side w-80 bg-base-100 shadow-xl" @submit.prevent="loginUser" novalidate>
        <div class="card-body items-center text-center">
          <div class="card-title">
            <h1>Авторизация</h1>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="e-mail">
              E-mail
            </label>
            <input class="input input-bordered w-full" id="username" type="text" v-model="postBody.email" placeholder="E-mail">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Пароль
            </label>
            <input class="input input-bordered w-full max-w-xs" id="password" type="password" v-model="postBody.password" placeholder="******************">
          </div>
          <div class="card-actions">
            <input class="btn btn-success btn-block" type="submit" value="Войти">
          </div>
        </div>
      </form>
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
import {mapGetters} from "vuex";
import store from "@/vuex/store";
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
      if(this.postBody.email !== "" || this.postBody.password !== ""){
        let data = JSON.stringify({
          "email": this.postBody.email,
          "password": this.postBody.password
        });
        let config = {
          method: 'post',
          url: "http://debitsoft.ru:8080/api/user/login",
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
              store.dispatch('GET_AUTH');
              router.push({name: "catalog", force: true})
              useToast().info("Вы успешно авторизировались!")
            })
            .catch(function (error) {
              useToast().error("Ошибка авторизации!" + error)
            });
      }
      else {
       useToast().error("Заполните все поля")
      }

    }
  },
  computed: {
    ...mapGetters({
      auth: 'AUTH'
    })
  }
}
</script>

<style scoped>

</style>