<template>
  <section class="flex" style="">
    <a-navbar class="flex-none"></a-navbar>
    <slot class="flex-1"/>
  </section>
</template>

<script>
import ANavbar from "@/components/Admin/components/a-navbar";
import {mapGetters} from "vuex";
import router from "@/router/router";
import store from "@/vuex/store";
import {useToast} from "vue-toastification";

export default {
  name: "admin-layout",
  components: {ANavbar},
  computed: {
    ...mapGetters({
      auth: "AUTH"
    })
  },
  methods: {
    async authDone() {
      await store.dispatch("GET_AUTH")
      if (this.auth.role !== 2) {
        await router.push("/catalog")
        useToast().error("Вы не являетесь администратором")
      }
    }
  },
  mounted() {
    this.authDone()
  }
}
</script>

<style scoped>

</style>