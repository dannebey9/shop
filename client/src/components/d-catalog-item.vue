<template>
  <div>
    <div class="card w-72 h-[400px] bg-base-100 shadow-xl z-0">
      <figure ><img :src="'http://debitsoft.ru:8080/static/' + product_data.img" alt="product image" class="h-[180px]"/></figure>
      <div class="card-body">
        <h2 class="card-title">{{ product_data.name }}</h2>
        <p class="card-title">{{ product_data.price }} Рублей</p>
        <div class="card-actions justify-end">
<!--          <div class="input-group">-->
<!--            <button class="btn btn-outline">-</button>-->
<!--            <input type="text" placeholder=""  class="input input-bordered text-center w-16" />-->
<!--            <button class="btn btn-outline">+</button>-->
<!--          </div>-->
          <button @click="addToBasket" class="btn btn-primary" :class="{loading: loading, 'btn-disabled': loading, 'btn-outline': loading}">В корзину</button>
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
//import store from "@/vuex/store";
import {mapActions, mapGetters} from "vuex";
import store from "@/vuex/store";
//import store from "@/vuex/store";
//import store from "@/vuex/store";
//import DToastAskRegister from "@/components/Toaster/d-toast-ask-register";
//import router from "@/router/router";

export default {
  name: "d-catalog-item",
  data(){
    return{
      inBasket: true,
      loading: false
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
  computed: {
    ...mapGetters([
      'BASKETS',
        'AUTH'
    ]),
  },
  mounted() {
    this.refreshVuex();
    //this.chProductBasket();
  },
  methods: {
      ...mapActions([
        'GET_PRODUCT_FROM_API'
      ]),
    refreshVuex(){
        if(this.AUTH){
          store.dispatch('GET_BASKET_PRODUCTS_FROM_API');
          store.dispatch('GET_TOTAL_PRICE_FROM_API');
        }
    },
      chProductBasket() {
       try {
        store.dispatch('GET_BASKET_PRODUCTS_FROM_API');
          console.log(this.BASKETS)
          let prodBasket = this.BASKETS.find(item => item.productId === this.product_data.id)
          //console.log(prodBasket.id)
          //console.log(prodBasket.productId === this.product_data.id)
          this.inBasket = prodBasket.productId === this.product_data.id
         console.log("prodBasket.productId === this.product_data.id")
          return prodBasket.productId === this.product_data.id;
        } catch (err) {
          return false
        }
      },
      addToBasket() {
        this.loading = true;
        if (VueCookies.get("Authorization") != null) {
          let data = JSON.stringify({
            "productId": this.product_data.id,
          });
          let config = {
            method: 'post',
            url: "http://debitsoft.ru:8080/api/basket/add",
            headers: {
              'Content-Type': 'application/json',
              "Authorization": VueCookies.get("Authorization")
            },
            data: data
          };
          axios(config)
              .then((res) => {
                console.log(res.data);
                useToast().info(res.data.message)
                this.loading = false;
                this.refreshVuex();
                this.refreshVuex();
              })
              .catch((err) => {
                useToast().error(err)
                useToast().error("Произошла ошибка добавления в корзину")
                this.loading = false;
              })
        } else {
          useToast().error("Сначала нужно авторизироваться")
          this.loading = false;
        }

      }
    }
}
</script>

<style scoped>

</style>