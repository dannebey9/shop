<template>
  <div class="mx-auto overflow-x-hidden dark:text-primary-content">
    <h2 class="text-base-100 dark:text-primary-content text-2xl my-4 font-bold">Категории</h2>
    <div class="overflow-x-auto w-full">
      <table class="table w-full text-center">
        <thead>
        <tr>
          <td>ID</td>
          <td>Производитель</td>
          <th class="justify-end items-end justify-items-end"><button class="btn btn-success btn-sm btn-square" :class="{'btn-error': openAddType}" @click="this.toggleAddType"><i class="fa transition-all" :class="{'fa-plus':!openAddType, 'fa-minus': openAddType}"></i></button></th>
        </tr>
        </thead>
        <tbody>
        <transition>
          <tr v-if="openAddType" class="py-0">
            <td>#</td>
            <td><input class="w-56 max-w-xs text-center text-inherit outline-none text-[1rem] input-bordered input" v-model="inputName" placeholder="Введите название бренда"/></td>
            <th><button class="btn btn-outline btn-success text-base-600 btn-md w-28" @click="createType">Сохранить</button></th>
          </tr>
        </transition>
        <a-types-item
            v-for="item in this.types"
            :key="item"
            :type_data="item"
        />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ATypesItem from "@/components/Admin/a-types-item";
import store from "@/vuex/store";
import VueCookies from "vue-cookies";
import {useToast} from "vue-toastification";

export default {
  name: "a-types",
  components: {ATypesItem},
  data() {
    return{
      openAddType: false,
      inputName: null
    }
  },
  computed: {
    ...mapGetters({
      types: 'TYPES'
    })
  },
  mounted() {
    store.dispatch('GET_ALL_TYPES')
  },
  methods: {
    toggleAddType() {
      this.openAddType = !this.openAddType
    },
    createType() {
      let axios = require('axios');
      let data = JSON.stringify({
        "name": this.inputName,
      });

      let config = {
        method: 'post',
        url: 'http://85.172.79.146:8080/api/type',
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
              store.dispatch('GET_ALL_TYPES')
              this.toggleAddType()
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