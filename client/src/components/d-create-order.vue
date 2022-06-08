<template>
  <div>
    <div class="d-basket container mx-auto pt-24" v-if="this.CREATE_ORDER">
      <h1 class="mb-4 text-2xl">Формирование заказа</h1>
      <div class="overflow-x-auto w-full" v-if="this.CREATE_ORDER.order_products">
        <table class="table w-full text-center">
          <thead>
          <tr>
            <td>Название</td>
            <th>Цена</th>
            <th>Кол-во</th>
            <th>Стоимость</th>
          </tr>
          </thead>
          <tbody>
          <d-create-order-item
              v-for="item in this.CREATE_ORDER.order_products"
              :key="item"
              :order_data="item"
          />
          </tbody>
        </table>
      </div>
      <div class="divider"></div>
      <h2 class="text-2xl mt-4">Итого к оплате: {{this.CREATE_ORDER.price}} рублей</h2>
      <div class="divider"></div>
      <div class="form-control w-full max-w-xs mx-auto">
        <label class="label">
          <span class="label-text" >ФИО получателся</span>
        </label>
        <input type="text" v-model="fio" placeholder="Иванов Иван Иванович" class="input input-bordered w-full max-w-xs" />

        <label class="label">
          <span class="label-text" >Адрес доставки</span>
        </label>
        <input type="text" v-model="address" placeholder="г.Москва ул.Пушкина д.1 кв.1" class="input input-bordered w-full max-w-xs" />

        <label class="label">
          <span class="label-text">Почтовый индекс</span>
        </label>
        <input type="number" v-model="index" placeholder="000000" class="input input-bordered w-full max-w-xs" />

        <label class="label">
          <span class="label-text">Номер телефона получателя</span>
        </label>
        <input type="tel" v-model="phone" placeholder="+79991234567" class="input input-bordered w-full max-w-xs mb-5" />
      </div>

      <button class="btn btn-outline btn-success btn-wide mb-5" @click="SendData">Оформить заказ</button>
  </div>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";
import DCreateOrderItem from "@/components/d-create-order-item";
import {useToast} from "vue-toastification";
import store from "@/vuex/store";
import {mapGetters} from 'vuex';
import router from "@/router/router";

const toast = useToast()

export default {
  name: "d-create-order",
  components: {DCreateOrderItem},
  data() {
    return{
      order: {},
      price: 0,
      fio: null,
      index: null,
      address: null,
      phone: null,

    }
  },
  computed: {
    ...mapGetters([
      'CREATE_ORDER',
    ]),
  },
  methods: {
    SendData() {
      this.orderId = this.CREATE_ORDER.id
      if( this.fio && this.address && this.index && this.phone){
        let axios = require('axios');
        let data = JSON.stringify({
          "fio": this.fio,
          "index": this.index,
          "address": this.address,
          "phone": this.phone,
        });
      let config = {
        method: 'post',
        url: 'http://85.172.79.146:8080/api/order/complete',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": VueCookies.get("Authorization")
        },
        data : data
      };
      axios(config)
          .then(() => {
            toast.info("Заказ успешно оформлен, проверить статус заказа можно на странице \"Заказы\" ")
            router.push("/orders")
          })
          .catch((err) => {
        toast.error(err)
        })
      }
      else{
        toast.error("Заполните все поля")
      }
    },
  },
  mounted() {
    store.dispatch("GET_CREATE_ORDER")
  }
}
</script>

<style scoped>

</style>