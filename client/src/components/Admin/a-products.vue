<template>
  <div class="mx-auto overflow-x-hidden dark:text-primary-content">
    <h2 class="text-base-100 dark:text-primary-content text-2xl my-4 font-bold">Продукты</h2>
    <div class="overflow-x-auto w-full">
      <table class="table w-full text-center dark:rounded-lg dark:p-20">
        <thead class="bg-base-200">
        <tr>
          <td>ID</td>
          <td>Название</td>
          <th>Цена</th>
          <th>Кол-во</th>
          <th>В продаже</th>
          <th class="justify-end items-end justify-items-end"><button class="btn btn-success btn-sm btn-square" @click="this.modalCreate = !this.modalCreate"><i class="fa fa-plus"></i></button></th>
        </tr>
        </thead>
        <tbody>
        <a-products-item
            v-for="product in this.products"
            :key="product"
            :product_data="product"
        />
        </tbody>
      </table>
    </div>
    <!--  Модальное окно "Создать"-->
    <transition>
      <div v-if="this.modalCreate" class="fixed z-50 inset-0 bg-base-200 bg-opacity-80 overflow-x-hidden overflow-y-hidden flex items-center justify-center">
        <button class="btn btn-ghost btn-square top-2 right-2 absolute z-50" @click="this.modalCreate = !this.modalCreate"><i class="fa fa-window-close fa-2x"></i></button>
        <div class="bg-base-200 p-5 sm:rounded-2xl rounded-t-2xl w-full sm:w-72 border-2 sm:border-accent sm:relative absolute inset-x-0 bottom-0">
          <div class="avatar max-h-[300px] max-w-[300px]">
            <div class="rounded">
              <img class="" :src="UrlImage" alt="Изображение товара" />
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

          <button class="btn btn-success btn-outline btn-block mt-5" @click="createProductPost">Сохранить</button>

        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AProductsItem from "@/components/Admin/a-products-item";
import {mapGetters} from "vuex";
import store from "@/vuex/store";
import {useToast} from "vue-toastification";
import VueCookies from "vue-cookies";
export default {
  name: "AProducts",
  components: {AProductsItem},
  computed: {
    ...mapGetters({
      products: "ADMIN_PRODUCTS",
      brands: 'BRANDS',
      types: 'TYPES'
    })
  },
  data() {
    return{
      showUploadFile: false,
      modalCreate: false,
      UrlImage: "https://imgholder.ru/300x300/8493a8/adb9ca&text=300x300&font=kelson",
      changeFile: null,
      changeName: null,
      changePrice: null,
      changeBrand: null,
      changeType: null,
    }
  },
  mounted() {
    store.dispatch("ADMIN_GET_PRODUCT_FROM_API")
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.changeFile = file;
      this.UrlImage = URL.createObjectURL(file)
      this.showUploadFile = !this.showUploadFile;
    },
    createProductPost() {
      if (this.changeName && this.changeFile && this.changePrice && this.changeType && this.changeBrand){
        let axios = require('axios');
        let FormData = require('form-data');
        let data = new FormData();
        data.append('name', this.changeName);
        data.append('price', this.changePrice);
        data.append('img', this.changeFile);
        data.append('typeId', this.changeType);
        data.append('brandId', this.changeBrand);

        let config = {
          method: 'post',
          url: 'http://85.172.79.146:8080/api/product/',
          headers: {
            'Authorization': VueCookies.get("Authorization"),
            'Content-Type': 'multipart/form-data'
          },
          data : data
        };

        axios(config)
            .then((response) => {
              if (response.data.action === "success"){
                useToast().success(response.data.message)
              }
              else{
                useToast().error(response.data.message)
              }
              this.modalCreate = false
              store.dispatch('ADMIN_GET_PRODUCT_FROM_API')
              // store.dispatch('GET_PRODUCT_FROM_API')
              this.changeName = null
              this.changePrice = null
              this.UrlImage = "https://imgholder.ru/300x300/8493a8/adb9ca&text=300x300&font=kelson"
              this.changeType = null
              this.changeBrand = null
            })
            .catch(function (err) {
              useToast().error('Ошибка изменения товара')
              console.log(err)
            });
      }
      else {
        useToast().error("Заполните все поля и загрузите изображение")
      }
    }
  },
}
</script>

<style scoped>

</style>