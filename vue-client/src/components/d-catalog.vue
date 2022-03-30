<template>
  <div class="d-catalog">
    <h1>Catalog</h1>


    <div class="container mx-auto pt-[75px] pl-4">
      <button
          class=" btn text-white bg-blue-700 hover:bg-blue-800 flex focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm pl-4 pr-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
        Фильтр
      </button>
    </div>
    <div class="items-center container mx-auto sm:columns-1 columns-1 md:columns-2 lg:columns-3 flex flex-wrap gap-6 justify-center pb-10 pt-32">
      <d-catalog-item
          v-for="product in PRODUCTS"
          :key="product.id"
          :product_data="product"
      />
    </div>
  </div>
</template>

<script>
import DCatalogItem from "@/components/d-catalog-item";
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "d-catalog",
  components: {
    DCatalogItem
  },
  props: {},
  data() {
    return{

    }
  },
  computed: {
    ...mapGetters([
        'PRODUCTS'
    ])
  },
  methods: {
    ...mapActions([
        'GET_PRODUCT_FROM_API'
    ])
  },
  mounted() {
    this.GET_PRODUCT_FROM_API()
        .then((response) => {
          if (response.data) {
            console.log('Data arrived!')
          }
        })
  }
}
</script>

<style scoped>

</style>