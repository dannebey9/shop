<template>
  <section class="flex" style="background-color: #2c3e50">
    <a-navbar class="flex-none"></a-navbar>
    <slot class="flex-1"/>
  </section>
</template>

<script>
import ANavbar from "@/components/Admin/components/a-navbar";

export default {
  name: "admin-layout",
  components: {ANavbar}
}
</script>

<style scoped>

</style>