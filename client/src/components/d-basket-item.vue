<template>
    <tr class="dark:p-[1rem]">
      <td>
        <div class="absolute text-red-400 dark:p-[1rem] opacity-60 inset-0 bg-base-200 z-50 loading" v-if="loading"></div>
        <div class="flex items-center dark:p-[1rem] space-x-3">

          <div class="avatar">
            <div class="mask mask-squircle w-12 h-12">
              <img :src="'http://debitsoft.ru:8080/static/' + basket_data.product.img" alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div class="font-bold text-center">{{ basket_data.product.name }}</div>
          </div>
        </div>
      </td>
      <td>
        {{basket_data.product.price}}
      </td>
      <td>
        <div class="form-control text-center">

          <div class="input-group mx-auto justify-center">
            <button class="btn btn-outline" :class="{'btn-disabled': loading}" @click="sendPost('decrement')">-</button>
            <input type="text" placeholder="" :key="basket_data.quantity" :value="basket_data.quantity" class="input input-bordered text-center w-16 border-accent" disabled/>
            <button class="btn btn-outline" :class="{'btn-disabled': loading}" @click="sendPost('add')">+</button>
          </div>
        </div>
      </td>
      <th>
        <button class="btn btn-ghost text-red-600 btn-xs" :class="{'btn-disabled text-base-200': loading}" @click="sendPost('del')">Удалить</button>
      </th>
    </tr>
</template>

<script>
import VueCookies from "vue-cookies";
import axios from "axios";
import {useToast} from "vue-toastification";
import store from "@/vuex/store";
//import {nextTick} from "vue";

export default {
  name: "d-basket-item",
  props: {
    basket_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data(){
    return{
      loading: false,
    }
  },
  methods: {
    refreshVuex() {
      store.dispatch('GET_TOTAL_PRICE_FROM_API');
      store.dispatch('GET_BASKET_PRODUCTS_FROM_API');
    },
    sendPost: function (url){
      if (VueCookies.get("Authorization") != null) {
        this.loading = true
        let data = JSON.stringify({
          "productId": this.basket_data.productId,
        });
        let config = {
          method: 'post',
          url: "http://debitsoft.ru:8080/api/basket/" + url,
          headers: {
            'Content-Type': 'application/json',
            "Authorization": VueCookies.get("Authorization")
          },
          data: data
        };
        axios(config)
            .then((res) => {
              useToast().info(res.data.message)
              this.refreshVuex();
              this.loading = false;
            })
            .catch((err) =>{
              useToast().error("Произошла ошибка, обратитесь в тех.поддержку");
              console.log(err);
              this.loading = false;
            })
      }
      else {
        useToast().error("Сначала нужно авторизироваться");
      }
    },
  }
}
</script>

<style scoped>

</style>