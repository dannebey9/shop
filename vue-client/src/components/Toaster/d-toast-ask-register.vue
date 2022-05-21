<template>
  <div class="container">
    <span>What about events?</span>
    <button
        class="action"
        @click.stop="clicked"
    >SEND!</button>
  </div>
</template>

<script>

export default {
  name: "d-toast-ask-register",
  methods: {
    clicked() {
      this.$emit("Click");
    }
  },
}
</script>

<style scoped>

</style>