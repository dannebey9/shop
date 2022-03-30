<template>
    <tr>
      <th>
        <label>
          <input type="checkbox" class="checkbox" />
        </label>
      </th>
      <td>
        <div class="flex items-center space-x-3">
          <div class="avatar">
            <div class="mask mask-squircle w-12 h-12">
              <img :src="'http://10.10.5.200:5000/static/' + basket_data.product.img" alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div class="font-bold">{{ basket_data.product.name }}</div>
          </div>
        </div>
      </td>
      <td>
        {{basket_data.product.price}}
      </td>
      <td>
        <div class="form-control">

          <div class="input-group">
            <button class="btn btn-outline">-</button>
            <input type="text" placeholder="" :value="basket_data.quantity" class="input input-bordered text-center w-16" />
            <button class="btn btn-outline">+</button>
          </div>

        </div>
<!--        <div class="flex w-[100px] h-[30px] text-xl border-gray-400 rounded-xl border-2 bg-gray-200">-->
<!--                  <button type="button" class="w-[30px] h-[30px]">+</button>-->
<!--                  <div type="number" class="pointer-events-none w-[40px] text-center">1</div>-->
<!--                  <button type="button" class="w-[30px] h-[30px]">-</button>-->
<!--                </div>-->
      </td>
      <th>
        <button class="btn btn-ghost text-red-600 btn-xs">Удалить</button>
      </th>
    </tr>


<!--    <div class="d-basket-item flex">-->
<!--      <img src="" alt="">-->
<!--      <h3>-->

<!--      </h3>-->
<!--      <div class="flex w-[100px] h-[30px] text-xl border-gray-400 rounded-xl border-2 bg-gray-200">-->
<!--        <button type="button" class="w-[30px] h-[30px]">+</button>-->
<!--        <div type="number" class="pointer-events-none w-[40px] text-center">1</div>-->
<!--        <button type="button" class="w-[30px] h-[30px]">-</button>-->
<!--      </div>-->
<!--      <button class="bg-red-500 w-[100px] h-[30px] rounded-xl">Удалить</button>-->
<!--    </div>-->

</template>

<script>
export default {
  name: "d-basket-item",
  props: {
    basket_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
}
</script>

<style scoped>

</style>