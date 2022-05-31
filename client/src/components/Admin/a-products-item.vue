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
      <input type="checkbox" class="toggle" :checked="product_data.available" />
    </td>
    <th class="">
      <button class="btn btn-ghost text-base-600 btn-md" @click="toggleModalChange">Изменить</button>
        <button class="btn btn-ghost text-red-400 btn-xs">Списать</button>
        <button class="btn btn-ghost text-green-400 btn-xs">Оприходовать</button>
    </th>
  </tr>
  <transition>
    <div v-if="this.modalChange" class="fixed z-50 inset-0 bg-base-200 bg-opacity-80 overflow-x-hidden overflow-y-hidden flex items-center justify-center">
      <button class="btn btn-ghost btn-square top-2 right-2 absolute" @click="toggleModalChange"><i class="fa fa-window-close fa-2x"></i></button>
      <div class="bg-base-200 p-5 rounded-2xl w-72">
        <div class="avatar">
          <div class="rounded">
            <img class="" :src="urlImage" alt="Изображение товара" />
          </div>
        </div>
        <button class="btn btn-outline btn-success btn-xs mb-2" @click="showUploadFile = !showUploadFile">Заменить изображение</button>
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
        <input type="text" class="input input-bordered w-full max-w-xs" :value="this.name">
        <label class="label">
          <span class="label-text">Цена в рублях</span>
        </label>
        <input type="text" class="input input-bordered w-full max-w-xs" :value="product_data.price">

        <button class="btn btn-success btn-outline btn-block mt-5">Сохранить</button>

      </div>
    </div>
  </transition>
</template>

<script>


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
      showUploadFile: false,
      name: this.product_data.name,
      urlImage: 'http://debitsoft.ru:8080/static/' + this.product_data.img,

      oldName: this.product_data.name,
      oldImageUrl: 'http://debitsoft.ru:8080/static/' + this.product_data.img,
    }
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
      this.urlImage = URL.createObjectURL(file)
      this.showUploadFile = !this.showUploadFile;
    },
    resetChange() {
      this.urlImage = this.oldImageUrl
      this.name = this.oldName
    }
  },
  mounted() {
    console.log(this.product_data)
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