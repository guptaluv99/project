<template>
  <div class="column justify-start align-center page">
    <neo v-if="neo" :neo="neo" detailed="true" />
    <div class="column justify-center align-center sorry" v-else>
      <div>Sorry! No Match Found</div>
      <div>Keep Browsing</div>
      <div><nuxt-link to="/">Neo Browse</nuxt-link><nuxt-link to="/search">Neo Feed</nuxt-link></div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }){
    var neo = null;
    try {
      neo = (await $axios.get('/neos/browse/' + params.id)).data;
    } catch (e){
      console.log("Exception: " + e);
    } finally {
      return {
        neo: neo
      }
    }
  },
  layout: 'page',
  data(){
    this.$store.dispatch('setTitle', 'Search By ID')
  }
}
</script>

<style scoped>
.page{
  width: 100%;
}
.sorry{
  width: 100%;
  height: 80vh;
  color: whitesmoke;
}
.sorry > div{
  font-size: 20px;
  margin-bottom: 10px;
}
.sorry > div > a{
  margin: 0 10px;
  padding: 10px;
  background-color: white;
}
</style>