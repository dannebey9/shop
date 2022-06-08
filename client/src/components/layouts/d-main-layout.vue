<template>
  <div class="d-main-wrapper dark:text-white">
    <d-navbar/>
    <section>
      <slot/>
    </section>
<!--    <router-view></router-view>-->
    <d-footer/>
  </div>
</template>

<script>
import DNavbar from "@/components/d-navbar";
import DFooter from "@/components/d-footer";


export default {
  name: "d-main-wrapper",
  components: {DFooter, DNavbar},
  props: {},
  data() {
    return {
    }
  },
  computed: {},
  methods: {},
  watch: {},
  mounted() {
  }
}
</script>

<style>
  input{
    @apply dark:bg-base-200 active:bg-base-200
  }
  input:focus{
    @apply dark:bg-base-200}
</style>