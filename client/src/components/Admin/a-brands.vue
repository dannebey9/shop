<template>
  <div class="mx-auto overflow-x-hidden dark:text-primary-content">
    <h2 class="text-base-100 dark:text-primary-content text-2xl my-4 font-bold">Производители</h2>
    <div class="overflow-x-auto w-full">
      <table class="table w-full text-center">
        <thead>
        <tr>
          <td>ID</td>
          <td>Производитель</td>
          <th class="justify-end items-end justify-items-end"><button class="btn btn-success btn-sm btn-square" :class="{'btn-error': openAddBrand}" @click="this.toggleAddBrand"><i class="fa transition-all" :class="{'fa-plus':!openAddBrand, 'fa-minus': openAddBrand}"></i></button></th>
        </tr>
        </thead>
        <tbody>
        <transition>
          <tr v-if="openAddBrand" class="py-0">
            <td>#</td>
            <td><input class="w-56 max-w-xs text-center text-inherit outline-none text-[1rem] input-bordered input" v-model="inputName" placeholder="Введите название бренда"/></td>
            <th><button class="btn btn-outline btn-success text-base-600 btn-md w-28" @click="createBrand">Сохранить</button></th>
          </tr>
        </transition>
        <a-brands-item
            v-for="item in this.brands"
            :key="item"
            :brand_data="item"
        />
        </tbody>
      </table>
    </div>
    <!--  Модальное окно "Изменить"-->
    <transition>
      <div v-if="this.modalCreate" class="fixed z-50 inset-0 bg-base-200 bg-opacity-80 overflow-x-hidden overflow-y-hidden flex items-center justify-center">
        <button class="btn btn-ghost btn-square top-2 right-2 absolute z-50" @click="this.modalCreate = !this.modalCreate"><i class="fa fa-window-close fa-2x"></i></button>
        <div class="bg-base-200 p-5 sm:rounded-2xl rounded-t-2xl w-full sm:w-72 border-2 sm:border-accent sm:relative absolute inset-x-0 bottom-0">
          <label class="label">
            <span class="label-text">Название категории</span>
          </label>
          <input type="text" class="input input-bordered w-full sm:max-w-xs" v-model="changeName" >
          <button class="btn btn-success btn-outline btn-block mt-5" @click="createProductPost">Сохранить</button>

        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ABrandsItem from "@/components/Admin/a-brands-item";
import store from "@/vuex/store";
import VueCookies from "vue-cookies";
import {useToast} from "vue-toastification";

export default {
  name: "a-brands",
  components: {ABrandsItem},
  data() {
    return{
      openAddBrand: false,
      inputName: null
    }
  },
  computed: {
    ...mapGetters({
      brands: 'BRANDS'
    })
  },
  mounted() {
    store.dispatch('GET_ALL_BRANDS')
  },
  methods: {
    toggleAddBrand() {
      this.openAddBrand = !this.openAddBrand
    },
    createBrand() {
      let axios = require('axios');
      let data = JSON.stringify({
        "name": this.inputName,
      });

      let config = {
        method: 'post',
        url: 'http://debitsoft.ru:8080/api/brand',
        headers: {
          'Authorization': VueCookies.get("Authorization"),
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
          .then((response) => {
            if (response.data.action === "success"){
              useToast().success(response.data.message)
              store.dispatch('GET_ALL_BRANDS')
              this.toggleAddBrand()
            }
            else{
              useToast().error(response.data.message)
            }
            this.inputName = null
          })
          .catch(() => {
            useToast().error('Ошибка изменения товара')
          });
    }
  }
}
</script>

<style scoped>
.v-enter-active {
  transition: all 0.3s;
  height: 100%;
  position: relative;
  padding: 1rem;
}
.v-leave-active {
  transition: opacity 0.3s ease, transform 0.6s ease;


}

.v-enter-from{
  transform: translateY(-100px);
  opacity: 0;
}
.v-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
.v-leave-active {
  position: absolute;
}

</style>