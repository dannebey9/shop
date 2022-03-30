<template>
  <div class="d-register">
    <div class="w-full max-w-xs h-screen m-auto pt-[20%]">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="PostRegister" novalidate>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="e-mail">
            E-mail
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" v-model="email" placeholder="E-mail">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Пароль
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" v-model="password" placeholder="******************">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Повторите пароль
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" v-model="repeatPassword" placeholder="******************">
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
import { useToast } from "vue-toastification";

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
      if (this.email.length < 1 || this.password.length < 1 || this.repeatPassword.length < 1){
        if(this.password === this.repeatPassword){
          useToast.success("Регистрация прошла успешно!")
        }
        else{
          useToast.error("Пароли не совпадают!")
        }
      }
      else{
        useToast.error("Заполните все поля!")
      }
    }
  }
}
</script>

<style scoped>

</style>