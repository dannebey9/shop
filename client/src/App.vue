<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
  import dMainLayout from './components/layouts/d-main-layout'
  import adminLayout from './components/layouts/admin-layout'


export default {
  name: 'App',
  components: {
    dMainLayout, adminLayout
  },
  computed: {
    layout(){
      return (this.$route.meta.layout || dMainLayout)
    }
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
