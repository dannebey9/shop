<template>
  <tr>
    <td>{{ time }}</td>
    <th :class="{'text-red-400': moveProducts_data.action === 2, 'text-green-400': moveProducts_data.action === 1, 'text-blue-400': moveProducts_data.action === 5}">{{ actionName }}</th>
    <th>{{ moveProducts_data.product.id }}</th>
    <th>{{ moveProducts_data.product.name }}</th>
    <th>{{ moveProducts_data.quantity || "-"}}</th>
    <th>{{moveProducts_data.price || "-"}}</th>
    <th>{{summIn || "-"}}</th>
    <th>{{ moveProducts_data.user.email }}</th>
  </tr>
</template>

<script>
export default {
  name: "a-products-move-item",
  data(){
    return{
      actionName: null,
      time: null,
      summIn: null
    }
  },
  props: {
    moveProducts_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    getActionType(){
      switch (this.moveProducts_data.action) {
        case 1:
          this.actionName = "Оприходован"
          break
        case 2:
          this.actionName = "Списан"
          break
        case 3:
          this.actionName = "Продан"
          break
        case 4:
          this.actionName = "Возврат не законченого заказа"
          break
        case 5:
          this.actionName = "Добавлен"
              break
        case 6:
          this.actionName = "Зарезервирован"
              break
        case 7:
          this.actionName = "Удален из резерва"
              break
        case 8:
          this.actionName = "Заказан"
              break
        default:
          this.actionName = "Не определено"
          break
      }
      let time = (this.moveProducts_data.createdAt.split('T')[1]).slice(0, -5)
      let date = this.moveProducts_data.createdAt.split('T')[0]
      this.time = date + " " + time
      this.summIn = this.moveProducts_data.quantity * this.moveProducts_data.price
    }
  },
  mounted() {
    this.getActionType()
  }
}
</script>

<style scoped>

</style>