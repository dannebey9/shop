<template>
  <tr>
    <td>
      {{product_data.id}}
    </td>
    <td>
      <div class="flex items-center space-x-3">

        <div class="avatar">
          <div class="mask mask-squircle w-12 h-12">
            <img :src="'http://debitsoft.ru:8080/static/' + product_data.img" alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
        <div>
          <div class="font-bold text-center">{{ product_data.name }}</div>
        </div>
      </div>
    </td>
    <td>
      {{product_data.price}}
    </td>
    <td>
      <div class="form-control text-center">
          <input type="text" placeholder="" :key="product_data.quantity" :value="product_data.quantity" class="input input-bordered text-center w-16 border-accent" disabled/>
      </div>
    </td>
    <td>
      <input type="checkbox" class="toggle" v-model="changeAvailable" @change="changeProductAvailable"/>
    </td>
    <th class="">
      <button class="btn btn-ghost text-base-600 btn-md" @click="toggleModalChange">Изменить</button>
        <button class="btn btn-ghost text-red-400 btn-xs" @click="modalDiscard = !modalDiscard">Списать</button>
        <button class="btn btn-ghost text-green-400 btn-xs" @click="modalRegister = !modalRegister">Оприходовать</button>
    </th>
  </tr>
<!--  Модальное окно "Изменить"-->
  <transition>
    <div v-if="this.modalChange" class="fixed z-50 inset-0 bg-base-200 bg-opacity-80 overflow-x-hidden overflow-y-hidden flex items-center justify-center">
      <button class="btn btn-ghost btn-square top-2 right-2 absolute z-50" @click="toggleModalChange"><i class="fa fa-window-close fa-2x"></i></button>
      <div class="bg-base-200 p-5 sm:rounded-2xl rounded-t-2xl w-full sm:w-72 border-2 sm:border-accent sm:relative absolute inset-x-0 bottom-0">
        <div class="avatar max-h-[300px] max-w-[300px]">
          <div class="rounded">
            <img class="" :src="urlImage" alt="Изображение товара" />
          </div>
        </div>
        <button class="btn btn-outline btn-success btn-xs mb-2 mx-auto block" @click="showUploadFile = !showUploadFile">Заменить изображение</button>
        <div :class="{'h-0': !showUploadFile, 'h-[1.8rem]': showUploadFile}" class="transition-all">
          <input class="mb-5 h-full w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer
          dark:text-gray-400 focus:outline-none dark:bg-gray-700
          dark:border-gray-600 dark:placeholder-gray-400 transition-all delay-100 ease-out"
                 id="default_size" type="file"
                 @change="onFileChange"
                 :class="{'opacity-100': showUploadFile, 'opacity-0 hidden': !showUploadFile}"
          >
        </div>
        <label class="label">
          <span class="label-text">Название товара</span>
        </label>
        <input type="text" class="input input-bordered w-full sm:max-w-xs" v-model="changeName" >
        <label class="label">
          <span class="label-text">Цена в рублях</span>
        </label>
        <input type="number" class="input input-bordered w-full sm:max-w-xs" v-model="changePrice" >
        <label class="label">
          <span class="label-text">Производитель</span>
        </label>
        <select class="select select-bordered w-full" v-model="changeBrand">
          <option v-for="item in this.brands" :value="item.id" :key="item.id">{{item.name}}</option>
        </select>
        <label class="label">
          <span class="label-text">Категория</span>
        </label>
        <select class="select select-bordered w-full" v-model="changeType">
          <option v-for="item in this.types" :value="item.id" :key="item.id">{{item.name}}</option>
        </select>

        <button class="btn btn-success btn-outline btn-block mt-5" @click="changeProductPost">Сохранить</button>

      </div>
    </div>
  </transition>
<!--  Модальное окно "Списать"-->
  <transition>
    <div v-if="this.modalDiscard" class="fixed z-50 inset-0 bg-base-200 bg-opacity-80 overflow-x-hidden overflow-y-hidden flex items-center justify-center">
      <button class="btn btn-ghost btn-square top-2 right-2 absolute z-50" @click="modalDiscard = !modalDiscard"><i class="fa fa-window-close fa-2x"></i></button>
      <div class="bg-base-200 p-5 sm:rounded-2xl rounded-t-2xl sm:relative absolute bottom-0 inset-x-0 sm:w-72 w-full border-2 sm:border-accent">
        <div class="avatar max-w-[300px]">
          <div class="rounded">
            <img class="" :src="urlImage" alt="Изображение товара" />
          </div>
        </div>
        <h2 type="text" class=" w-full sm:max-w-xs font-bold" >{{this.name}}</h2>
        <h2 type="text" class=" w-full sm:max-w-xs font-bold mt-4" >Товара на складе: {{product_data.quantity}}</h2>
        <label class="label">
          <span class="label-text">Списать шт.</span>
        </label>
        <input type="number" class="input input-bordered w-full sm:max-w-xs" v-model="moveDecQuantity">

        <button class="btn btn-error btn-outline btn-block mt-5" @click="moveProductDec">Списать</button>

      </div>
    </div>
  </transition>
<!--  Модальное окно "Оприходовать"-->
  <transition>
    <div v-if="this.modalRegister" class="fixed z-50 inset-0 bg-base-200 bg-opacity-80 overflow-x-hidden overflow-y-hidden flex items-center justify-center">
      <button class="btn btn-ghost btn-square top-2 right-2 absolute z-50" @click="modalRegister = !modalRegister"><i class="fa fa-window-close fa-2x"></i></button>
      <div class="bg-base-200 p-5 sm:rounded-2xl rounded-t-2xl sm:w-72 border-2 absolute sm:relative inset-x-0 sm:border-accent bottom-0 shadow-2xl shad">
        <div class="avatar max-w-[300px]">
          <div class="rounded">
            <img class="" :src="urlImage" alt="Изображение товара" />
          </div>
        </div>
        <h2 type="text" class=" w-full sm:max-w-xs font-bold" >{{this.name}}</h2>
        <h2 type="text" class=" w-full sm:max-w-xs font-bold mt-4" >Товара на складе: {{product_data.quantity}}</h2>
        <label class="label">
          <span class="label-text">Оприходовать шт.</span>
        </label>
        <input type="number" class="input input-bordered w-full" v-model="moveIncQuantity">
        <label class="label">
          <span class="label-text">Цена закупки в рублях</span>
        </label>
        <input type="number" class="input input-bordered w-full" v-model="moveIncPrice">

        <button class="btn btn-success btn-outline btn-block mt-5" @click="moveProductInc">Оприходовать</button>

      </div>
    </div>
  </transition>
</template>

<script>


import {mapGetters} from "vuex";
import store from "@/vuex/store";
import VueCookies from "vue-cookies";
import {useToast} from "vue-toastification";

export default {
  name: "a-products-item",
  props: {
    product_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data(){
    return{
      loading: false,
      modalChange: false,
      modalDiscard: false,
      modalRegister: false,
      showUploadFile: false,
      name: this.product_data.name,
      urlImage: 'http://debitsoft.ru:8080/static/' + this.product_data.img,

      oldName: this.product_data.name,
      oldImageUrl: 'http://debitsoft.ru:8080/static/' + this.product_data.img,

      changeName: this.product_data.name,
      changePrice: this.product_data.price,
      changeBrand: this.product_data.brandId,
      changeType: this.product_data.typeId,
      changeFile: null,
      changeAvailable: this.product_data.available,

      moveIncQuantity: null,
      moveIncPrice: null,
      moveDecQuantity: null
    }
  },
  computed: {
    ...mapGetters({
      brands: 'BRANDS',
      types: 'TYPES'
    })
  },
  methods: {
    toggleModalChange() {
      this.modalChange = !this.modalChange
      if (this.modalChange === true){
        this.resetChange()
      }
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.changeFile = file;
      this.urlImage = URL.createObjectURL(file)
      this.showUploadFile = !this.showUploadFile;
    },
    resetChange() {
      this.urlImage = this.oldImageUrl
      this.name = this.oldName
    },
    moveProductDec() {
      let axios = require('axios');
      let data = JSON.stringify({
        "quantity": this.moveDecQuantity,
        "id": this.product_data.id,
        "action": 2
      });

      let config = {
        method: 'post',
        url: 'http://debitsoft.ru:8080/api/product/moveAdmin',
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
            }
            else{
              useToast().error(response.data.message)
            }
            store.dispatch('ADMIN_GET_PRODUCT_FROM_API')
          })
          .catch(function () {
            useToast().error('Ошибка изменения товара')
          });
    },

    moveProductInc() {
      let axios = require('axios');
      let data = JSON.stringify({
        "quantity": this.moveIncQuantity,
        "price": this.moveIncPrice,
        "id": this.product_data.id,
        "action": 1
      });

      let config = {
        method: 'post',
        url: 'http://debitsoft.ru:8080/api/product/moveAdmin',
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
            }
            else{
              useToast().error(response.data.message)
            }
            store.dispatch('ADMIN_GET_PRODUCT_FROM_API')
          })
          .catch(function () {
            useToast().error('Ошибка изменения товара')
          });
    },
    changeProductAvailable() {
      let axios = require('axios');
      let data = JSON.stringify({
        "available": this.changeAvailable,
        "id": this.product_data.id
      });

      let config = {
        method: 'post',
        url: 'http://debitsoft.ru:8080/api/product/changeadmin',
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
            }
            else{
              useToast().error(response.data.message)
            }
            store.dispatch('ADMIN_GET_PRODUCT_FROM_API')
          })
          .catch(function () {
            useToast().error('Ошибка изменения товара')
          });

    },
    changeProductPost() {
      let axios = require('axios');
      let FormData = require('form-data');
      let data = new FormData();
      data.append('id', this.product_data.id);
      data.append('name', this.changeName);
      data.append('price', this.changePrice);
      data.append('img', this.changeFile);
      data.append('typeId', this.changeType);
      data.append('brandId', this.changeBrand);

      let config = {
        method: 'post',
        url: 'http://debitsoft.ru:8080/api/product/changeadmin',
        headers: {
          'Authorization': VueCookies.get("Authorization"),
          'Content-Type': 'multipart/form-data'
        },
        data : data
      };

      axios(config)
          .then(function (response) {
            if (response.data.action === "success"){
              useToast().success(response.data.message)
            }
            else{
              useToast().error(response.data.message)
            }
            store.dispatch('ADMIN_GET_PRODUCT_FROM_API')
          })
          .catch(() => {
            console.log()
            useToast().error('Ошибка изменения товара')
          });
    }

  },
  mounted() {
    store.dispatch('GET_ALL_BRANDS')
    store.dispatch('GET_ALL_TYPES')
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