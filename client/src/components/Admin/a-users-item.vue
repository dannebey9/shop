<template>
  <tr>
    <td>{{users_data.id}}</td>
    <td>{{users_data.email}}</td>
    <td>{{users_data.user_role.role}}</td>
    <td>{{time}}</td>
    <td><button class="btn" @click="toggleModalChange">Изменить</button></td>
  </tr>

  <!--  Модальное окно "Изменить"-->
  <transition>
    <div v-if="this.modalChange" class="fixed z-50 inset-0 bg-base-200 bg-opacity-80 overflow-x-hidden overflow-y-hidden flex items-center justify-center">
      <button class="btn btn-ghost btn-square top-2 right-2 absolute z-50" @click="toggleModalChange"><i class="fa fa-window-close fa-2x"></i></button>
      <div class="bg-base-200 p-5 sm:rounded-2xl rounded-t-2xl w-full sm:w-96 border-2 sm:border-accent sm:relative absolute inset-x-0 bottom-0">
          <label class="label">
            <span class="label-text">E-mail</span>
          </label>
          <input type="text" class="input input-bordered w-full sm:max-w-xs" v-model="outputEmail">
        <label class="label">
          <span class="label-text">Роль</span>
        </label>
        <select class="select select-bordered w-full" v-model="outputRole">
          <option v-for="item in role" :value="item.id" :key="item.role">{{ item.role }}</option>
        </select>

        <button class="btn btn-success btn-outline btn-block mt-5" @click="postChangeUser">Сохранить</button>

      </div>
    </div>
  </transition>
</template>

<script>
import {mapGetters} from "vuex";
import store from "@/vuex/store";
import axios from "axios";
import VueCookies from "vue-cookies";
import {useToast} from "vue-toastification";

export default {
  name: "a-users-item",
  data(){
    return {
      time: null,
      modalChange: false,
      outputEmail: this.users_data.email,
      outputRole: this.users_data.user_role.id,
    }
  },
  props: {
    users_data: {
      type: Object,
      default(){
        return{}
      }
    }
  },
  computed:{
    ...mapGetters({
      role: 'ROLE_ADMIN'
    })
  },
  methods: {
    toggleModalChange() {
      this.modalChange = !this.modalChange
    },
    timeFun(){
      let timeS = (this.users_data.createdAt.split('T')[1]).slice(0, -5)
      let date = this.users_data.createdAt.split('T')[0]
      this.time = date + " " + timeS
      console.log(this.users_data)
    },
    async postChangeUser() {
      let data = JSON.stringify({
        "email": this.outputEmail,
        "role": this.outputRole,
        "userId": this.users_data.id,
      });
      let config = {
        method: 'post',
        url: "http://85.172.79.146:8080/api/user/edit",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": VueCookies.get("Authorization")
        },
        data: data
      };
      await axios(config)
          .then((res) => {
            useToast().info(res.data.message)
          })
          .catch(() => {
            useToast().error("Произошла ошибка измениния пользователя")
          })
      this.modalChange = false
      await store.dispatch('GET_ALL_USERS_ADMIN')
    }
  },
  mounted() {
    store.dispatch('GET_ROLE_ADMIN')
    this.timeFun()
  }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;

}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  height: 0;
}
</style>