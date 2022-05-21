<template>
    <tr>
<!--      <th>-->
<!--        <label>-->
<!--          <input type="checkbox" class="checkbox" />-->
<!--        </label>-->
<!--      </th>-->
      <td>
        <div class="flex items-center space-x-3">
          <div class="avatar">
            <div class="mask mask-squircle w-12 h-12">
              <img :src="'http://10.10.5.200:5000/static/' + basket_data.product.img" alt="Avatar Tailwind CSS Component" />
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
            <button class="btn btn-outline" @click="sendPost('decrement')">-</button>
            <input type="text" placeholder="" :key="basket_data.quantity" :value="basket_data.quantity" class="input input-bordered text-center w-16 border-accent" disabled/>
            <button class="btn btn-outline" @click="sendPost('add')">+</button>
          </div>
        </div>
      </td>
      <th>
        <button class="btn btn-ghost text-red-600 btn-xs" @click="sendPost('del')">Удалить</button>
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
    }
  },
  methods: {
    refreshVuex() {
      store.dispatch('GET_TOTAL_PRICE_FROM_API');
      store.dispatch('GET_BASKET_PRODUCTS_FROM_API');
    },
    sendPost: function (url){
      if (VueCookies.get("Authorization") != null) {
        let data = JSON.stringify({
          "productId": this.basket_data.productId,
        });
        let config = {
          method: 'post',
          url: "http://10.10.5.200:5000/api/basket/" + url,
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
              this.refreshVuex();
            })
      }
      else {
        useToast().error("Сначала нужно авторизироваться")
      }
    },
  }
}
</script>

<style scoped>

</style>