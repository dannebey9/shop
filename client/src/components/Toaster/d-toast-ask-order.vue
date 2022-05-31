<template>
  <div class="container text-center">
    <span class="text-center">У вас есть не оформленный заказ, можете продолжить его оформление или удалить.</span>
    <div>
      <button
          class="action ml-2 btn btn-ghost text-green-400"
          @click.stop="continueOrder"
      >Продолжить</button>
      <button
          class="action ml-2 btn btn-ghost text-red-400"
          @click.stop="removeOrder"
      >Удалить</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "d-toast-ask-register",
  methods: {
    continueOrder() {
      this.$emit("continueOrder");
    },
    removeOrder() {
      this.$emit("removeOrder");
    },
  },
}
</script>

<style scoped>

</style>