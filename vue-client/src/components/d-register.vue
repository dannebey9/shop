<template>
  <div class="d-register">
    <div class="w-full max-w-xs h-screen m-auto pt-[20%]">
      <form class="card card-side w-80 bg-base-100 shadow-xl" @submit.prevent="PostRegister" novalidate>
        <div class="card-body items-center text-center">
          <div class="card-title">
            <h1>Регистрация</h1>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="e-mail">
              E-mail
            </label>
            <input class="input input-bordered w-full" id="username" type="text" v-model="email" placeholder="E-mail">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Пароль
            </label>
            <input class="input input-bordered w-full max-w-xs" id="password" type="password" v-model="password" placeholder="******************">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Повторите пароль
            </label>
            <input class="input input-bordered w-full max-w-xs" type="password" v-model="repeatPassword" placeholder="******************">
          </div>
          <div class="card-actions">
            <input class="btn btn-success btn-block" type="submit" value="Зарегестрироваться">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import axios from "axios";
import router from "@/router/router";

export default {
  name: "d-register",
  data(){
    return {
      email: "",
      password: "",
      repeatPassword: "",
    }
  },
  methods: {
    PostRegister(){
      if (!(this.email.length < 1 || this.password.length < 1 || this.repeatPassword.length < 1)){
        if(this.password === this.repeatPassword){
          this.AxiosPost()
          router.push('login')
        }
        else{
          useToast().error("Пароли не совпадают!")
        }
      }
      else{
        useToast().error("Заполните все поля!")
      }
    },
    AxiosPost() {
      let data = JSON.stringify({
        "email": this.email,
        "password": this.password
      });

      let config = {
        method: 'post',
        url: 'http://10.10.5.200:5000/api/user/registration',
        headers: {
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
          .then(function (response) {
            useToast().success(response.data.message)
          })
          .catch(function (error) {
            useToast(error).error("Произошла ошибка при создании аккаунта");
          });

    }
  }
}
</script>

<style scoped>

</style>