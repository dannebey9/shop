<template>
  <div id="app">
    <d-navbar/>
    <d-main-wrapper>

    </d-main-wrapper>
  </div>
</template>

<script>
  import dMainWrapper from './components/d-main-wrapper'

export default {
  name: 'App',
  components: {
    dMainWrapper
  },
  methods:{
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
