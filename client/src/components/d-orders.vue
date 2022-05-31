<template>
  <div>
    <h2 class="bg-base-200 text-2xl pb-10 pt-28">Заказы</h2>
    <div class="bg-base-200 pb-8">
      <ul class="menu bg-base-100 p-2 rounded-box menu-normal flex-col-reverse mx-2">
        <DOrdersItem
          v-for="order in ORDERS"
          :key="order.id"
          :order_data="order"
        />
      </ul>

    </div>
  </div>
</template>

<script>
import DOrdersItem from "@/components/d-orders-item";
import {mapGetters} from 'vuex';
import store from "@/vuex/store";

export default {
  name: "d-orders",
  components:{
    DOrdersItem
  },
  computed: {
    ...mapGetters([
      'ORDERS',
    ])
  },
  mounted() {
    store.dispatch("GET_ORDERS")
    console.log
  }
}
</script>

<style scoped>

</style>