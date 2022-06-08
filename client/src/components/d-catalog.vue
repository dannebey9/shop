<template>
  <div class="d-catalog bg-base-200 pb-8">
    <label
      class="btn btn-accent h-16 w-16 btn-circle fixed bottom-20 right-2 modal-button z-40 sm:h-28 sm:w-28 sm:right-20"
      for="filter-modal"
  >
    <svg class="w-10 h-10 sm:w-16 sm:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
  </label>
    <input type="checkbox" id="filter-modal" class="modal-toggle" @click="noScroll"/>
    <label for="filter-modal" class="modal cursor-pointer modal-bottom sm:modal-middle z-50">
      <label class="modal-box relative" for="">
        <label for="filter-modal" class="btn btn-sm btn-circle absolute right-2 top-2" >✕</label>
        <h3 class="text-xl font-bold mb-8">Фильтры</h3>
        <div class="flex justify-around mx-auto">

          <div class="flex flex-col w-[40%] gap-2">
            <h2 class="font-bold">Категория</h2>
            <button class="btn btn-block" :class="{'btn-success': select.id === item.id && select.name === 'typeId'}" v-for="item in types" @click="queryGet(item.id, null)" :key="item.id">{{item.name}}</button>
          </div>
          <div class="flex flex-col w-[40%] gap-2">
            <h2 class="font-bold">Бренд</h2>
            <button class="btn btn-block" :class="{'btn-success': select.id === item.id && select.name === 'brandId'}" v-for="item in brands" @click="queryGet(null, item.id)" :key="item.id">{{item.name}}</button>
          </div>
        </div>

      </label>
    </label>
    <div class="items-center container mx-auto sm:columns-1 columns-1 md:columns-2 lg:columns-3 flex flex-wrap gap-6 justify-center pb-10 pt-32">
      <d-catalog-item
          v-for="product in products.rows"
          :key="product.id"
          :product_data="product"
      />
    </div>
    <div class="btn-group mx-auto justify-center">
      <button class="btn" v-for="page in products.pages" @click="queryPagination(page)" :class="{'btn-active': page === selectPage}" :key="page">{{page}}</button>
    </div>
  </div>
</template>

<script>
import DCatalogItem from "@/components/d-catalog-item";
import {mapActions, mapGetters} from 'vuex';
import store from "@/vuex/store";

export default {
  name: "d-catalog",
  components: {
    DCatalogItem
  },
  props: {},
  data() {
    return{
      scroll: false,
      select: {name: null, id: null},
      selectPage: 1,
    }
  },
  computed: {
    ...mapGetters({
      products: 'PRODUCTS',
      types: 'TYPES',
      brands: 'BRANDS'
    })
  },
  methods: {
    ...mapActions([
        'GET_PRODUCT_FROM_API'
    ]),
    queryPagination(page) {
      this.selectPage = page
      let obj
      switch (this.select.name) {
        case "typeId":
          obj = {typeId: this.select.id || null, brandId: null, offset: 20, page: page || 1}
          break
        case "brandId":
          obj = {typeId: null, brandId: this.select.id || null, offset: 20, page: page || 1}
          break
        default:
          obj = {typeId: null, brandId: null, offset: 20, page: page || 1}
          break
      }
      this.GET_PRODUCT_FROM_API(obj)
    },
    queryGet(typeId = null, brandId = null, offset = 20, page = 1) {
      if (typeId){
        this.select.id = typeId
        this.select.name = `typeId`
      }
      if (brandId){
        this.select.id = brandId
        this.select.name = `brandId`
      }
      let obj = {typeId: typeId || null, brandId: brandId || null, offset: offset || 20, page: page || 1}
      this.GET_PRODUCT_FROM_API(obj)
    },
    noScroll() {
      this.scroll = !this.scroll
    },
  },
  mounted() {
    //store.dispatch('GET_PRODUCT_FROM_API')
    this.queryGet()
    store.dispatch('GET_ALL_TYPES')
    store.dispatch('GET_ALL_BRANDS')
  },
  watch: {
    // whenever active changes, this function will run
    scroll: function () {
      document.body.style.overflow = this.scroll ? 'hidden' : ''
    }
  }
}
</script>

<style>

.no-scroll{
  overflow-y: hidden;
}
</style>