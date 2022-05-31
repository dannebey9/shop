<template>
  <div class="mx-auto overflow-x-hidden">
    <h2 class="text-base-100 text-2xl my-4 font-bold">Продукты</h2>
    <div class="overflow-x-auto w-full">
      <table class="table w-full text-center">
        <thead>
        <tr>
          <td>ID</td>
          <td>Название</td>
          <th>Цена</th>
          <th>Кол-во</th>
          <th>В продаже</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <a-products-item
            v-for="product in this.products"
            :key="product"
            :product_data="product"
        />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AProductsItem from "@/components/Admin/a-products-item";
import {mapGetters} from "vuex";
import store from "@/vuex/store";
export default {
  name: "AProducts",
  components: {AProductsItem},
  computed: {
    ...mapGetters({
      products: "ADMIN_PRODUCTS"
    })
  },
  mounted() {
    console.log(this.products)
    store.dispatch("ADMIN_GET_PRODUCT_FROM_API")
  }
}
</script>

<style scoped>

</style>