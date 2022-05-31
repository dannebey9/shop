<template>
  <div>
    <div v-show="dataAction" @click="ClosePopup" class="fixed inset-0 z-50 overflow-auto bg-smoke-light bg-base-200 opacity-80 flex t">
    </div>
  <div class="modal" id="query">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Congratulations random Interner user!</h3>
      <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
      <div class="modal-action">
        <a href="#" class="btn">Yay!</a>
      </div>
    </div>
  </div>
  <div class="d-basket container mx-auto pt-24">
    <h1 class="mb-4 text-2xl">Корзина</h1>
    <div class="overflow-x-auto w-full">
      <table class="table w-full text-center">
        <thead v-if="totalPrice > 0">
        <tr>
<!--          <th>-->
<!--            <label>-->
<!--              <input type="checkbox" class="checkbox" />-->
<!--            </label>-->
<!--          </th>-->
          <td>Название</td>
          <th>Цена</th>
          <th>Кол-во</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
          <d-basket-item
              v-for="basketProduct in this.baskets"
              :key="basketProduct"
              :basket_data="basketProduct"
          />
        </tbody>
      </table>
    </div>
    <h1 class="text-4xl text-amber-300" v-if="totalPrice > 0">К оплате: {{ totalPrice  }} руб</h1>
    <h1 class="text-4xl text-amber-300" v-if="totalPrice <= 0">В коризне пока ничего нет</h1>
    <button v-if="totalPrice > 0" @submit="refreshVuex" class="btn btn-outline btn-wide btn-success mb-4 mt-4" @click="sendPostOrder">Оформить заказ</button>
    <router-link to="catalog" v-if="totalPrice <= 0" class="btn btn-outline btn-wide btn-success mb-4 mt-4" @click="refreshVuex">За покупками!</router-link>
  </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import DBasketItem from "@/components/d-basket-item";
import store from "@/vuex/store";
import { useToast, POSITION } from "vue-toastification";
import VueCookies from "vue-cookies";
import DToastAskOrder from "@/components/Toaster/d-toast-ask-order";
import router from "@/router/router";
//import router from "@/router/router";
//import router from "@/router/router";

const toast = useToast()

export default {
  name: "d-basket",
  components: {
    DBasketItem
  },
  props: {},
  data() {

    return {
      dataAction: false,
    }
  },
  computed: {
    ...mapGetters({
      baskets: 'BASKETS',
      totalPrice: 'TOTAL_PRICE'
    })
  },
  methods: {
    ...mapActions([
      'GET_BASKET_PRODUCTS_FROM_API'
    ]),
    ClosePopup(){
      this.dataAction = false
      toast.clear()
    },
    refreshVuex() {
        store.dispatch('GET_TOTAL_PRICE_FROM_API');
        store.dispatch('GET_BASKET_PRODUCTS_FROM_API');
      },
    sendPostOrder() {
      let axios = require('axios');
      let data = JSON.stringify({
        "basket": this.baskets,
        "totalPrice": this.totalPrice
      });

      let config = {
        method: 'post',
        url: 'http://debitsoft.ru:8080/api/order/create',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": VueCookies.get("Authorization")
        },
        data : data
      };

      axios(config)
          .then((response) =>  {
            store.dispatch("GET_CREATE_ORDER")
            switch (response.data.action) {
              case 'refresh':
                store.dispatch('GET_TOTAL_PRICE_FROM_API');
                store.dispatch('GET_BASKET_PRODUCTS_FROM_API');
                useToast().error(response.data.message);
                break;

              case 'popup':
                this.dataAction = response.data.action;
                //router.push({path: '/basket', hash: '#query'})
                  toast({
                    component: DToastAskOrder,
                    listeners: {
                      continueOrder: () => {
                        store.dispatch("GET_CREATE_ORDER")
                        router.push('/order/create')
                        toast.clear()
                        store.dispatch("GET_CREATE_ORDER")
                        toast.info("Заполните данные для оформления заказа")
                      },
                      removeOrder: () => {
                       this.RemoveLastOrder()
                        this.dataAction = false
                        toast.clear()
                      }
                    }
                  }, {
                    timeout: false,
                    closeButton: false,
                    draggable: false,
                    closeOnClick: false,
                    icon: false,
                    position: POSITION.BOTTOM_CENTER,
                  }, )
                    this.dataAction = true;
              break;
              case "success":
                store.dispatch("GET_CREATE_ORDER")
                toast.info(response.data.message)
                    router.push("/order/create")


            }
            console.log(JSON.stringify(response.data));
            //useToast().info(response.data.message);
          })
          .catch(function (error) {
            console.log(error);
            useToast().info(error);
          });
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
          })
          .catch((err) => {
            toast.error(err)
          })
    }
    },
mounted() {

    store.dispatch('GET_TOTAL_PRICE_FROM_API');
    store.dispatch('GET_CREATE_ORDER');
    store.dispatch('GET_BASKET_PRODUCTS_FROM_API');
    this.GET_BASKET_PRODUCTS_FROM_API()
        .then((response) => {
          if (response.data) {
            console.log(response.data)
          }
        });
  }

}
</script>

<style scoped>

</style>