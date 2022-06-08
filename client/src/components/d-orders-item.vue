<template>
  <div>
  <li class="mb-4"><label :for="'order-modal' + order_data.id" :class="{'bg-base-300 border-red-400 border-2 mb-8': order_data.orderStatusId === 1,  'border-base-200': order_data.orderStatusId !== 1}" class="flex flex-nowrap text-center  border-2 flex-grow flex-col lg:flex-row lg:h-24">
    <h4 class="basis-1/4 text-lg font-bold">Заказ {{order_data.id}}</h4>
    <h4 class="basis-1/4 text-lg">Стоимость: {{ order_data.price }} рублей</h4>
    <h4 class="basis-1/4 text-lg">Статус: {{ order_data.order_status.name }}</h4>
    <h4 class="basis-1/4 text-lg" v-if="order_data.orderStatusId !== 1">ФИО: {{order_data.fio}}</h4>
    <div v-if="order_data.orderStatusId === 1" class="basis-1/4 flex-col">
      <h2 class="text-accent-content text-xl">Незавершенный заказ ожидает действия!</h2>
      <div>
        <button class="btn btn-sm btn-ghost text-blue-400" @click="continueOrder">Оформить</button>
        <button class="btn btn-sm btn-ghost text-red-400" @click="RemoveLastOrder">Удалить</button>
      </div>

    </div>
  </label></li>
    <input type="checkbox" :id="'order-modal' + order_data.id" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
      <div class="modal-box relative sm:w-11/12 sm:max-w-5xl">
        <label :for="'order-modal' + order_data.id" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <h3 class="text-xl font-bold mb-4">Заказ <span>{{order_data.id}}</span></h3>
        <p class="py-2 font-bold">Адрес доставки</p>
        <span class="font-medium">{{order_data.deliveryAddress}}</span>
        <div class="divider my-0 py-0"></div>
        <p class="py-2 font-bold">Получатель</p>
        <span class="font-medium">{{order_data.fio}}</span>
        <div class="divider my-0 py-0"></div>
        <p class="py-2 font-bold">Телефон</p>
        <span class="font-medium">{{order_data.phone}}</span>
        <div class="divider my-0 py-0"></div>
        <p class="py-2 font-bold">Дата оформления</p>
        <span class="font-medium">{{order_data.createdAt.split('T')[0]}}</span>
        <div class="divider my-0 py-0"></div>
        <p class="py-2 font-bold">Статус заказа</p>
        <span class="font-medium">{{order_data.order_status.name}}</span>
        <div class="divider my-0 py-0"></div>
        <h3 class="text-xl font-bold mt-4">Состав заказа</h3>
        <div class="overflow-x-auto w-full">
          <table class="table w-full text-center ">
            <thead>
            <tr>
              <td>Название</td>
              <th>Цена</th>
              <th>Кол-во</th>
              <th>Стоимость</th>
            </tr>
            </thead>
            <tbody>
              <tr
                  v-for="item in this.order_data.order_products"
                  :key="item">
                <td>
                  <div class="flex items-center space-x-3">
                    <div class="avatar">
                      <div class="mask mask-squircle w-12 h-12">
                        <img :src="'http://debitsoft.ru:8080/static/' + item.product.img" alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div class="font-bold text-center">{{ item.product.name }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {{item.price}}
                </td>
                <td>
                  <div class="form-control text-center">

                    <div class=" mx-auto justify-center">
                      <input type="text" placeholder="" :key="item.quantity" :value="item.quantity" class="input input-bordered text-center w-16 border-accent" disabled/>
                    </div>
                  </div>
                </td>
                <td>
                  {{item.quantity * item.price}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="divider"></div>
        <h3 class="font-bold text-xl">Итог: {{order_data.price}} руб</h3>
        <h3 class="font-bold text-xl"></h3>
      </div>
    </div>
  </div>
</template>

<script>

import store from "@/vuex/store";
import router from "@/router/router";
import {useToast} from "vue-toastification";
import VueCookies from "vue-cookies";
//import axios from "axios";
import {mapGetters} from "vuex";

const toast = useToast()

export default {
  name: "d-orders-item",
  computed: {
    ...mapGetters({
      baskets: 'BASKETS',
      totalPrice: 'TOTAL_PRICE',
    })
  },
methods:{
    continueOrder(){
      store.dispatch("GET_CREATE_ORDER")
      router.push('/order/create')
      toast.clear()
      store.dispatch("GET_CREATE_ORDER")
      toast.info("Заполните данные для оформления заказа")
    },
  RemoveLastOrder() {
    let axios = require('axios');
    let data = JSON.stringify({
      "basket": this.baskets,
      "totalPrice": this.totalPrice
    });

    let config = {
      method: 'post',
      url: 'http://debitsoft.ru:8080/api/order/remove',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": VueCookies.get("Authorization")
      },
      data : data
    };
    axios(config)
        .then((response) => {
          toast.info(response.data.message)
          store.dispatch("GET_ORDERS")
        })
        .catch((err) => {
          toast.error(err)
        })
  },
  getOrderState() {
    switch (this.order_data.status) {
      case 0:
        return "Оформляется"
      case 1:
        return "Обрабатывается магазином"
      case 2:
        return "Передан перевозчику"
      case 3:
        return "Выполнен"
      case 4:
        return "Возврат"
    }
  }
},
  props: {
    order_data: {
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