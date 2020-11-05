<template>
  <div class="column justify-start align-start container">
    <h1>Browse Neo</h1>
    <div class="sub-header">
      <label style="color: white;" for="entries">Entries Per Page</label>
      <select v-model="toShow" name="entries" id="entries" @change="update">
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="15">15</option>
        <option :value="20">20</option>
      </select>
    </div>
    <div class="row justify-center align-start width100 wrap list">
      <neo v-for="thisNeo in neos" :key="thisNeo.id" :neo="thisNeo" />
    </div>
    <div class="row justify-space-between align-center pagination">
      <div @click="goTo(0)" v-if="page.number > 0">First</div>
      <span class="material-icons-outlined" @click="goTo(page.number-1)" v-if="page.number > 0">keyboard_arrow_left</span>
      <div class="column justify-center align-center pageNo">{{page.number + 1}}</div>
      <span class="material-icons-outlined" @click="goTo(page.number+1)" v-if="page.number < page.total_pages - 1">keyboard_arrow_right</span>
      <div @click="goTo(page.total_pages - 1)" v-if="page.number < page.total_pages - 1">Last</div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, env }) {
    var neos = [];
    var page = null;
    try {
      var response = (await $axios.get('/neos/browse?page=0&size=10')).data;
      if(response) {neos = response.near_earth_objects; page = response.page;};
    } catch (e){
      console.log("Exception: " + e);
    } finally {
      return {
        neos: neos,
        page: page
      }
    }
  },
  data(){
    return {
      toShow: 10
    }
  },
  methods: {
    async goTo(num){
      try {
        var response = (await this.$axios.get('/neos/browse?page=' + num + '&size=' + this.toShow)).data;
        if(response) {this.neos = response.near_earth_objects; this.page = response.page;};
      } catch (e){
        console.log("Exception: " + e);
      }
    },
    async update(){
      try {
        var response = (await this.$axios.get('/neos/browse?page=0&size=' + this.toShow)).data;
        if(response) {this.neos = response.near_earth_objects; this.page = response.page;};
      } catch (e){
        console.log("Exception: " + e);
      }
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 650px;
  width: 100%;
}
h1{
  color: white;
  padding: 10px 0;
  border-bottom: 1px solid whitesmoke;
  width: 100%;
}
.sub-header{
  padding: 10px 0;
  margin: 10px 0;
}
.pagination{
  margin-top: 10px;
  padding: 10px;
  color: white;
  width: 100%;
  font-size: 16px;
  position: fixed;
  bottom: 0;
  background-color: black;
}
.pagination > div{
  cursor: pointer;
  text-decoration: underline;
  flex: 0 0 20%;
}
.list{
  margin-bottom: 60px;
}
.pageNo{
  padding: 10px;
  color: black;
  background-color: white;
}
</style>
