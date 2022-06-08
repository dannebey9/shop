<template>
  <div class="mx-auto overflow-x-hidden dark:text-primary-content">
    <h2 class="text-base-100 dark:text-primary-content text-2xl my-4 font-bold">Заказы</h2>
    <div class="overflow-x-auto w-full">
      <table class="table w-full text-center">
        <thead>
        <tr>
          <td>Дата и время</td>
          <td>Пользователь</td>
          <td>ФИО</td>
          <td>Адрес доставки</td>
          <td>Номер телефона</td>
          <td>Почтовый индекс</td>
          <td>Стоимость</td>
          <td>Статус заказа</td>
          <td></td>
        </tr>
        </thead>
        <tbody>
        <a-orders-item
            v-for="item in this.aOrders"
            :key="item"
            :orders_data="item"
        />
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import AOrdersItem from "@/components/Admin/a-orders-item";
import store from "@/vuex/store";

export default {
  name: "a-orders",
  components: {AOrdersItem},
  computed: {
    ...mapGetters({
      aOrders: "ORDERS_ADMIN"
    })
  },
  mounted() {
    store.dispatch('GET_ORDERS_ADMIN')
  }
}
</script>

<style scoped>

</style>