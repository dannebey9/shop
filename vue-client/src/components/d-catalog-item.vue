<template>
  <div>
    <div class="card w-72 bg-base-100 shadow-xl z-0">
      <figure><img :src="'http://10.10.5.200:5000/static/' + product_data.img" alt="product image" /></figure>
      <div class="card-body">
        <h2 class="card-title">{{ product_data.name }}</h2>
        <p class="card-title">{{ product_data.price }} Рублей</p>
        <div class="card-actions justify-end">
          <button @click="addToCart" class="btn btn-primary">В корзину</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import VueCookies from "vue-cookies";
//import router from "@/router/router";
import {useToast} from "vue-toastification";

export default {
  name: "d-catalog-item",
  data(){
    return{

    }
  },
  props: {
    product_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    addToCart(){
      let data = JSON.stringify({
        "productId": this.product_data.id,
      });
      let config = {
        method: 'post',
        url: "http://10.10.5.200:5000/api/basket",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": VueCookies.get("Authorization")
        },
        data : data
      };

      axios(config)
          .then(function (response) {
            useToast().info(response.data)
          })
          .catch(function (error) {
            console.log(error)
            useToast().error("Ошибка добавления в корзину!" + error)
          });
    }
  }
}
</script>

<style scoped>

</style>