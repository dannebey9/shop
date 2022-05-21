<template>
  <div class="d-catalog bg-base-200">
    <label
      class="btn btn-accent h-16 w-16 btn-circle fixed bottom-20 right-2 modal-button z-40 sm:h-28 sm:w-28 sm:right-20"
      for="filter-modal"
  >
    <svg class="w-10 h-10 sm:w-16 sm:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
  </label>

    <input type="checkbox" id="filter-modal" class="modal-toggle" />
    <label for="filter-modal" class="modal cursor-pointer modal-bottom sm:modal-middle">
      <label class="modal-box relative" for="">
        <label for="filter-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <h3 class="text-lg font-bold">Фильтры</h3>
        <div>
          <table class="table w-full table text-center">
            <!-- head -->
            <thead>
            <tr>
              <th>Категория</th>
              <th>Бренд</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><button class="btn btn-accent btn-block">Сок</button></td>
              <td><button class="btn btn-accent btn-block">Моя семья</button></td>
            </tr>
            </tbody>
          </table>
        </div>

      </label>
    </label>
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
        'PRODUCTS',
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