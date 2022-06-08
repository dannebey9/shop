<template>
  <div class="mx-auto overflow-x-auto">
    <h2 class="text-2xl text-primary-content my-4 font-bold">Движение товара</h2>
    <div class="overflow-x-auto">
      <table class="table table-compact w-full dark:text-primary-content text-center">
        <thead>
        <tr>
          <td>Дата и время</td>
          <th>Событие</th>
          <th>ID Товара</th>
          <th>Название товара</th>
          <th>Кол-во</th>
          <th>Цена закпупки</th>
          <th>Стоимость закпупки</th>
          <th>Пользователь</th>
        </tr>
        </thead>
        <tbody>
        <a-products-move-item
            v-for="item in moveProducts"
            :key="item.id"
            :moveProducts_data="item"
        />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AProductsMoveItem from "@/components/Admin/a-products-move-item";
import {mapGetters} from "vuex";
import store from "@/vuex/store";
export default {
  name: "a-products-move",
  components: {AProductsMoveItem},
  computed: {
    ...mapGetters({
      moveProducts: 'MOVE_PRODUCTS'
    })
  },
  mounted() {
    store.dispatch('GET_ALL_MOVE_PRODUCTS')
  }
}
</script>

<style scoped>

</style>