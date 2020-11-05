<template>
  <div class="column justify-start align-center page">
    <div class="column justify-start align-start">
      Welcome {{$auth.user.name}}
    </div>
    <div v-if="myNeos && myNeos.length" class="column jutify-start align-start list">
      <div>List of all saved NEOs</div>
      <neo v-for="thisNeo in myNeos" :key="thisNeo.id" :neo="thisNeo" />
    </div>
    <div v-else>You haven't saved any NEO yet!</div>
    <span class="logout" @click="logout">Logout</span>
  </div>
</template>

<script>
export default {
  layout: 'page',
  computed: {
    myNeos(){
      return this.$auth.user.favorites || []
    }
  },
  head(){
    this.$store.dispatch('setTitle', 'My Profile');
  },
  methods: {
    logout(){
      this.$auth.logout().then( ()=>{
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'Logged out'
        })
      })
    }
  }
}
</script>

<style scoped>
.page{
  width: 100%;
  height: calc(100vh - 60px);
  color: white;
  padding: 20px;
}
.page > div{
  margin-bottom: 10px;
}
.list{
  width: 100%;
  color: black;
}
.logout{
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 10px;
  background-color: white;
  color: black;
  text-align: center;
  cursor: pointer;
}
</style>