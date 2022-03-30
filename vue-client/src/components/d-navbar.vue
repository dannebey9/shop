<template>
  <div class="d-navbar z-30">
    <nav
        class="
  fixed
  w-full
  z-30
  flex flex-wrap
  items-center
  justify-between
  py-4
  bg-gray-100
  text-gray-500
  hover:text-gray-700
  focus:text-gray-700
  shadow-lg
  navbar navbar-expand-lg navbar-light
  "
    >
      <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <div class="flex collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent">
          <a
              class="
        flex
        items-center
        text-gray-900
        hover:text-gray-900
        focus:text-gray-900
        mt-0
		text-2xl
        lg:mt-0
        mr-1
      "
              href="#"
          >
            siteName
          </a>
          <!-- Left links -->
          <ul class="navbar-nav hidden sm:flex pl-0 list-style-none mr-auto">

            <li class="nav-item p-2" id="id" v-for="link in links" :key="link.id" >
              <router-link class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" :active-class="'disabled pointer-events-none cursor-default text-[#999]'" :to=link.li>{{link.name}}</router-link>
            </li>
          </ul>
        </div>
        <div class="flex items-center relative">
          <!-- Icon -->
            <router-link class="text-gray-500 hover:text-gray-700 focus:text-gray-700 mr-4 hide-mobile" :active-class="'invisible'" to="basket" >
            <svg

                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="shopping-cart"
                class="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
            >
              <path
                  fill="currentColor"
                  d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
              />
            </svg>
            </router-link>
          <div class="hide-mobile">
            <a
                class="dropdown-toggle flex items-center hidden-arrow"
                href="#"
                id="dropdownMenuButton2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
              <img
                  src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                  class="rounded-full"
                  style="height: 25px; width: 25px"
                  alt=""
                  loading="lazy"
              />
            </a>
          </div>
        </div>
        <!-- Right elements -->
      </div>
    </nav>

    <div
        class="bg-blue-600 transition-all sm:hidden duration-300 z-2 mx-auto my-auto w-screen h-16 bottom-0 fixed flex items-stretch justify-center z-30"
    >
      <ul class="self-center flex">
        <li class=" text-sm leading-8 mb-2 mt-2 py-1 px-5 flex flex-col justify-center text-white" v-for="link in links" :key=link.id>
            <router-link class="text-center flex-col justify-center" :active-class="'disabled pointer-events-none cursor-default text-[#999]'" :to=link.li>
            <h3>{{link.name}}</h3>
            </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "d-navbar",
  data(){
    return{
      links: [
        { name: 'Главная', li: '/', id: '1' },
        { name: 'Каталог', li: '/catalog', id: '2'},
        { name: 'О нас', li: '/aboutus', id: '3'},
      ]
    }
  }
}
</script>

<style scoped>

</style>