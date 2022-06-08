<template>
  <tr>
    <td>
      {{brand_data.id}}
    </td>
    <td>
        <input class="w-56 max-w-xs text-center text-inherit input-ghost outline-none text-[1rem]" v-model="inputName" :readonly="!toggleChange" :class="{'input-bordered input':toggleChange}"/>
    </td>
    <th class="">
      <transition-group>
      <button class="btn btn-ghost text-base-600 btn-md w-28" v-if="!toggleChange" @click="toggleModalChange">Изменить</button>
      <button class="btn btn-ghost text-base-600 btn-md w-28" v-if="toggleChange" @click="sendChangeBrand">Сохранить</button>
      <button class="btn btn-ghost text-red-400 btn-md" @click="sendDelBrand">Удалить</button>
      </transition-group>
    </th>
  </tr>
</template>

<script>
import store from "@/vuex/store";
import {useToast} from "vue-toastification";
import VueCookies from "vue-cookies";

export default {
  name: "a-brands-item",
  props: {
    brand_data: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return{
      toggleChange: false,
      inputName: this.brand_data.name
    }
  },
  methods: {
    toggleModalChange() {
      this.toggleChange = !this.toggleChange
    },
    sendChangeBrand() {
      if (this.inputName === this.brand_data.name){
        this.toggleModalChange()
        return null
      }
      let axios = require('axios');
      let data = JSON.stringify({
        "name": this.inputName,
        "id": this.brand_data.id
      });

      let config = {
        method: 'post',
        url: 'http://debitsoft.ru:8080/api/brand/change',
        headers: {
          'Authorization': VueCookies.get("Authorization"),
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
          .then(function (response) {
            if (response.data.action === "success"){
              useToast().success(response.data.message)
              store.dispatch('GET_ALL_BRANDS')
            }
            else{
              useToast().error(response.data.message)
            }
          })
          .catch(function () {
            useToast().error('Ошибка изменения товара')
          });
      this.toggleModalChange()
    },
    sendDelBrand() {
      let axios = require('axios');
      let data = JSON.stringify({
        "id": this.brand_data.id
      });

      let config = {
        method: 'post',
        url: 'http://debitsoft.ru:8080/api/brand/del',
        headers: {
          'Authorization': VueCookies.get("Authorization"),
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
          .then(function (response) {
            if (response.data.action === "success"){
              useToast().success(response.data.message)
              store.dispatch('GET_ALL_BRANDS')
            }
            else{
              useToast().error(response.data.message)
            }
          })
          .catch(function () {
            useToast().error('Ошибка изменения товара')
          });
    }
  }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 1s ease;

}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  /*height: 0;*/
  /*width: 0;*/
  transform: translateX(-30px);
}
.v-leave-active {
  position: absolute;
}

</style>