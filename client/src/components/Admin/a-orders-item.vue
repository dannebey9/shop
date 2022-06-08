<template>
  <tr>
    <td>{{time}}</td>
    <td>{{orders_data.user.email}}</td>
    <td>{{orders_data.fio}}</td>
    <td>{{orders_data.deliveryAddress}}</td>
    <td>{{orders_data.phone}}</td>
    <td>{{orders_data.postalCode}}</td>
    <td>{{orders_data.price}} руб.</td>
    <td>{{orders_data.order_status.name}}</td>
    <td><button class="btn" @click="toggleModalChange">Изменить</button>
    <button class="ml-2 btn btn-info" @click="toggleModalProducts">Товары</button></td>
  </tr>

  <!-- Модальное окно состава заказа -->


  <transition>
    <div v-if="this.modalProducts" class="fixed z-50 inset-0 bg-base-200 bg-opacity-80 overflow-x-hidden overflow-y-hidden flex items-center justify-center">
      <button class="btn btn-ghost btn-square top-2 right-2 absolute z-50" @click="toggleModalProducts"><i class="fa fa-window-close fa-2x"></i></button>
      <div class=" p-5 sm:rounded-2xl rounded-t-2xl w-full sm:w-[600px] border-2 sm:border-accent sm:relative absolute inset-x-0 bottom-0">
        <h3 class="text-xl font-bold mt-4">Состав заказа</h3>
        <div class="overflow-x-auto w-full">
          <table class="table w-full text-center bg-base-200">
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
                v-for="item in this.orders_data.order_products"
                :key="item">
              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img :src="'http://85.172.79.146:8080/static/' + item.product.img" alt="Avatar Tailwind CSS Component" />
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
      </div>
    </div>
  </transition>




  <!--  Модальное окно "Изменить"-->
  <transition>
    <div v-if="this.modalChange" class="fixed z-50 inset-0 bg-base-200 bg-opacity-80 overflow-x-hidden overflow-y-hidden flex items-center justify-center">
      <button class="btn btn-ghost btn-square top-2 right-2 absolute z-50" @click="toggleModalChange"><i class="fa fa-window-close fa-2x"></i></button>
      <div class="bg-base-200 p-5 sm:rounded-2xl rounded-t-2xl w-full sm:w-96 border-2 sm:border-accent sm:relative absolute inset-x-0 bottom-0">
        <section v-if="orders_data.orderStatusId <= 2">
        <label class="label">
          <span class="label-text">ФИО</span>
        </label>
        <input type="text" class="input input-bordered w-full sm:max-w-xs" v-model="outputFio">
        <label class="label">
          <span class="label-text">Адрес доставки</span>
        </label>
        <input type="text" class="input input-bordered w-full sm:max-w-xs" v-model="outputDelivery">
          <label class="label">
            <span class="label-text">Номер телефона</span>
          </label>
          <input type="text" class="input input-bordered w-full sm:max-w-xs" v-model="outputPhone">
          <label class="label">
            <span class="label-text">Почтовый индекс</span>
          </label>
          <input type="text" class="input input-bordered w-full sm:max-w-xs" v-model="outputPostalCode">
        </section>
        <label class="label">
          <span class="label-text">Статус заказа</span>
        </label>
        <select class="select select-bordered w-full" v-model="selectOrderStatus">
          <option v-for="item in this.orderStatus" :value="item.id" :key="item.id">{{item.name}}</option>
        </select>

        <button class="btn btn-success btn-outline btn-block mt-5" @click="postUpdateOrder">Сохранить</button>

      </div>
    </div>
  </transition>
</template>

<script>
import {mapGetters} from "vuex";
import store from "@/vuex/store";
import {useToast} from "vue-toastification";
import VueCookies from "vue-cookies";

export default {
  name: "a-orders-item",
  data(){
    return{
      time: null,
      modalChange: false,
      modalProducts: false,
      selectOrderStatus: this.orders_data.orderStatusId,
      outputDelivery: this.orders_data.deliveryAddress,
      outputFio: this.orders_data.fio,
      outputPhone: this.orders_data.phone,
      outputPostalCode: this.orders_data.postalCode
    }
  },
  computed: {
    ...mapGetters({
      orderStatus: 'ORDER_STATUS'
    })
  },
  methods:{
    timeFun(){
      let timeS = (this.orders_data.createdAt.split('T')[1]).slice(0, -5)
      let date = this.orders_data.createdAt.split('T')[0]
      this.time = date + " " + timeS
    },
    toggleModalChange() {
      this.modalChange = !this.modalChange
    },
    toggleModalProducts() {
      this.modalProducts = !this.modalProducts
    },
    postUpdateOrder() {
      let axios = require('axios');
      let data = JSON.stringify({
        "id": this.orders_data.id,
        "fio": this.outputFio,
        "deliveryAddress": this.outputDelivery,
        "postalCode": this.outputPostalCode,
        "phone": this.outputPhone,
        "orderStatusId": this.selectOrderStatus,

      });

      let config = {
        method: 'post',
        url: 'http://85.172.79.146:8080/api/order/changeadmin',
        headers: {
          'Authorization': VueCookies.get("Authorization"),
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
          .then(function (response) {
            if (response.data.action === "success"){
              useToast().success(response.data.message)
              store.dispatch('GET_ORDERS_ADMIN')
              console.log(response.data)
            }
            else{
              useToast().error(response.data.message)
            }
          })
          .catch(function () {
            useToast().error('Ошибка изменения товара')
          });
    }
  },
  props: {
    orders_data: {
      type: Object,
      default(){
        return{}
      }
    }
  },
  mounted() {
    store.dispatch('GET_ORDER_STATUS')
    this.timeFun()
  }
}
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;

}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  height: 0;
}
</style>