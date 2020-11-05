<template>
  <div class="column justify-start align-center app">
    <client-only placeholder="Loading...">
      <notifications group="foo" animation-type="velocity"/>
    </client-only>
    <div class="row justify-start align-center header">
      <div @click="$router.go(-1)" class="row justify-space-between align-center">
        <span class="material-icons-outlined">keyboard_backspace</span>
      </div>
      <div>{{pageTitle}}</div>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    pageTitle(){
      return this.$store.getters['getTitle']
    }
  },
  data(){
    return {
      searchMode: false
    }
  }
}
</script>

<style scoped>
.app{
  background: url('https://physiofirst.s3.ap-south-1.amazonaws.com/development/doctor/5e6b5b84dc017206b94096e8/Users/5fa123401c4250564b911353.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
.header{
  width: 100%;
  background-color: white;
  height: 60px;
  padding: 10px;
  border-bottom: 1px solid gainsboro;
  position: sticky;
  top: 0;
}
a{
  text-decoration: none;
  color: inherit;
}
</style>
