<template>
  <div class="d-basket container mx-auto pt-24">
    <h1 class="mb-4 text-2xl">Корзина</h1>
    <div class="overflow-x-auto w-full">
      <table class="table w-full">
        <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <th>Название</th>
          <th>Цена</th>
          <th>Кол-во</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
          <d-basket-item
              v-for="basketProduct in BASKETS"
              :key="basketProduct.id"
              :basket_data="basketProduct"
          />
        </tbody>
      </table>
    </div>
    <button class="btn btn-outline btn-wide btn-success mb-4 mt-4">Оформить заказ</button>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import DBasketItem from "@/components/d-basket-item";

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
    ...mapGetters([
      'BASKETS'
    ])
  },
  methods: {
    ...mapActions([
      'GET_BASKET_PRODUCTS_FROM_API'
    ])
  },
  mounted() {
    this.GET_BASKET_PRODUCTS_FROM_API()
        .then((response) => {
          if (response.data) {
            console.log(response.data)
          }
        })
  }

}
</script>

<style scoped>

</style>