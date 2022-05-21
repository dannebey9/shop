<template>
  <div class="d-basket container mx-auto pt-24">
    <h1 class="mb-4 text-2xl">Корзина</h1>
    <div class="overflow-x-auto w-full">
      <table class="table w-full text-center">
        <thead v-if="totalPrice > 0">
        <tr>
<!--          <th>-->
<!--            <label>-->
<!--              <input type="checkbox" class="checkbox" />-->
<!--            </label>-->
<!--          </th>-->
          <th>Название</th>
          <th>Цена</th>
          <th>Кол-во</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
          <d-basket-item
              v-for="basketProduct in this.baskets"
              :key="basketProduct.id"
              :basket_data="basketProduct"
          />
        </tbody>
      </table>
    </div>
    <h1 class="text-4xl text-amber-300" v-if="totalPrice > 0">К оплате: {{ totalPrice  }} руб</h1>
    <h1 class="text-4xl text-amber-300" v-if="totalPrice <= 0">В коризне пока ничего нет</h1>
    <button v-if="totalPrice > 0" class="btn btn-outline btn-wide btn-success mb-4 mt-4" @click="refreshVuex">Оформить заказ</button>
    <router-link to="catalog" v-if="totalPrice <= 0" class="btn btn-outline btn-wide btn-success mb-4 mt-4" @click="refreshVuex">За покупками!</router-link>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import DBasketItem from "@/components/d-basket-item";
import store from "@/vuex/store";
//import router from "@/router/router";

export default {
  name: "d-basket",
  components: {
    DBasketItem
  },
  props: {},
  data() {
    return{

    }
  },
  computed: {
    ...mapGetters({
      baskets: 'BASKETS',
      totalPrice: 'TOTAL_PRICE'
    })
  },
  methods: {
    ...mapActions([
      'GET_BASKET_PRODUCTS_FROM_API'
    ]),
    refreshVuex() {
        store.dispatch('GET_TOTAL_PRICE_FROM_API');
        store.dispatch('GET_BASKET_PRODUCTS_FROM_API');
      }
    },
mounted() {

    store.dispatch('GET_TOTAL_PRICE_FROM_API');
    this.GET_BASKET_PRODUCTS_FROM_API()
        .then((response) => {
          if (response.data) {
            console.log(response.data)
          }
        });
  }

}
</script>

<style scoped>

</style>