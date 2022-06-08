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
            <img :src="'http://85.172.79.146:8080/static/' + order_data.product.img" alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
        <div>
          <div class="font-bold text-center">{{ order_data.product.name }}</div>
        </div>
      </div>
    </td>
    <td>
      {{order_data.price}}
    </td>
    <td>
      <div class="form-control text-center">

        <div class=" mx-auto justify-center">
          <input type="text" placeholder="" :key="order_data.quantity" :value="order_data.quantity" class="input input-bordered text-center w-16 border-accent" disabled/>
        </div>
      </div>
    </td>
    <td>
      {{totalPrice()}}
    </td>
  </tr>
</template>

<script>
export default {
  name: "d-create-order-item",
  props: {
    order_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    totalPrice() {
      return this.order_data.price * this.order_data.quantity
    }
  }
}
</script>

<style scoped>

</style>