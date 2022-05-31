<template>
  <div class="min-h-screen relative transition-all w-16 z-50" :class="{'lg:w-52':openNav, 'w-16':!openNav}">
    <div class="min-h-screen fixed bg-base-200 flex flex-col transition-all" :class="{'w-52':openNav, 'w-16':!openNav}">
      <div class="logo flex flex-col text-center mx-auto transition-all mt-4" :class="{'pb-4':openNav, 'pb-0':!openNav}">
        <i class="fa fa-battery-full text-2xl fa-500px"></i>
        <p class="text-2xl text-center transition-all" :class="{'opacity-0':!openNav}" >SHOP</p>
      </div>
      <div class="flex flex-col gap-6 transition-all">
        <router-link :to="item.href" class="flex overflow-hidden hover:bg-base-300 py-2 rounded-xl p-2 mx-3 gap-6" v-for="item in menu" :key="item.title">
          <i :class="item.icon" class=" text-2xl"></i>
          <p class="font-bold">
            {{item.title}}
          </p>
        </router-link>
      </div>
      <i class="fa rounded-lg fa-align-center fa-arrow-right bottom-0 bg- fa-2x py-2 absolute block inset-x-2 hover:bg-base-300 transition-all " :class="{'fa-rotate-180':openNav}" @click="toggleMenu">
      </i>

    </div>
  </div>
</template>

<script>
export default {
  name: "a-navbar",
  data() {
    return{
      openNav: false,
      showLat: false,
      menu: [
        {title: "Главная", href: "/admin", icon: 'fa fa-map'},
        {title: "Продукты", href: "/admin/products", icon: 'fa fa-box'},
        {title: "Бренды", href: "/", icon: 'fa fa-copyright'},
        {title: "Пользователи", href: "/admin/users", icon: 'fa fa-user'},
        {title: "Заказы", href: "/", icon: 'fa fa-truck'}
      ],
      collapsed: {
        type: Boolean,
        default: false
      },
    }
  },
  methods:{
    //onToggleCollapse(collapsed) {},
    toggleMenu() {
      this.openNav = !this.openNav
    },
  }
}
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

</style>