<template>
  <div class="column justify-start align-center app">
    <client-only placeholder="Loading...">
      <notifications group="foo" animation-type="velocity"/>
    </client-only>
    <div class="row justify-space-between align-center header">
      <div class="logo">
        <img src="~assets/logo.svg" />
      </div>
      <div class="row justify-space-between align-center">
        <nuxt-link to="/search" class="material-icons-outlined">search</nuxt-link>
        <nuxt-link :to="$auth.loggedIn ? '/profile' : '/login'" class="material-icons-outlined">account_circle</nuxt-link>
      </div>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  data(){
    return {
      searchMode: false
    }
  }
}
</script>

<style scoped>
.app{
  background: url('https://physiofirst.s3.ap-south-1.amazonaws.com/development/doctor/5e6b5b84dc017206b94096e8/Organizations/5f465ba7d2d676071f0b62a9-med.webp');
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
.logo{
  width: 200px;
}
a{
  text-decoration: none;
  color: inherit;
}
</style>
