<template>
  <div class="column justify-start align-start page">
    <h1>Neo Feed</h1>
    <div class="column justify-space-between align-center width100 sub-header row-md row-lg">
      <div class="row justify-space-between align-center">
        <input @change="update" v-model="from" placeholder="From" type="date" />
        <input @change="update" v-model="to" placeholder="To" type="date" />
      </div>
      <div class="row justify-space-between align-center">
        <input v-model="query" placeholder="Search By ID..." type="text" />
        <nuxt-link :to="'/search/' + query" class="material-icons-outlined button">arrow_right_alt</nuxt-link>
      </div>
    </div>
    <div class="column jutify-start align-start width100">
      <neo-list v-for="thisDay in toShowNeos" :key="thisDay.date" :thisDay="thisDay" />
    </div>
  </div>
</template>

<script>
export default {
  layout:'page',
  async mounted() {
    var neos = null;
    var start = this.$moment().subtract(7, 'days');
    var end = this.$moment();
    var count = 0;
    try {
      var response = (await this.$axios.get('/neos/feed?detailed=true&start_date=' + start.format('YYYY-MM-DD') + '&end_date=' + end.format('YYYY-MM-DD'))).data;
      if(response) {this.neos = response.near_earth_objects; this.count = response.element_count; this.from = start.format('YYYY-MM-DD'); this.to = end.format('YYYY-MM-DD');};
    } catch (e){
      console.log("Exception: " + e);
    }
  },
  computed: {
    toShowNeos(){
      var returnArr = [];
      for(var prop in this.neos){
        var obj = {
          date: prop,
          neos: this.neos[prop].sort((a,b) => {
            if(a.close_approach_data && a.close_approach_data.length && b.close_approach_data && b.close_approach_data.length) return this.$moment(b.close_approach_data[0].close_approach_date_full) - this.$moment(a.close_approach_data[0].close_approach_date_full);
            if(a.close_approach_data && a.close_approach_data.length && (!b.close_approach_data || !b.close_approach_data.length)) return 1;
            if(b.close_approach_data && b.close_approach_data.length && (!a.close_approach_data || !a.close_approach_data.length)) return -1;
          }).slice(0, 10)
        };
        returnArr.push(obj);
      }
      return returnArr.sort((a,b) => {
        return this.$moment(b.date, 'YYYY-MM-DD') - this.$moment(a.date, 'YYYY-MM-DD')
      });
    }
  },
  data(){
    this.$store.dispatch('setTitle', 'Neo Feed')
    return {
      query: undefined,
      neos: [],
      count: 0,
      from: undefined,
      to: undefined
    }
  },
  methods: {
    async update(){
      var a = this.$moment(this.from);
      var b = this.$moment(this.to);
      if(b.diff(a, 'days') <= 7){
        try {
          var response = (await this.$axios.get('/neos/feed?detailed=true&start_date=' + a.format('YYYY-MM-DD') + '&end_date=' + b.format('YYYY-MM-DD'))).data;
          if(response) {this.neos = response.near_earth_objects; this.count = response.element_count;};
        } catch (e){
          this.$notify({group: 'foo', type: 'error', title: 'Something went wrong', text: e});
        }
      } else {
        this.$notify({group: 'foo', type: 'error', title: 'Max range in 7 days'})
      }
    }
  }
}
</script>

<style scoped>
h1{
  color: white;
  padding: 10px;
  border-bottom: 1px solid whitesmoke;
  width: 100%;
}
.page{
  width: 100%;
  height: calc(100vh - 60px);
  color: white;
}
.sub-header{
  padding: 10px;
}
.sub-header > div > input{
  margin: 0 5px;
}
.button{
  background-color: white;
  height: 25px;
  width: 25px;
  border: 1px solid white;
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
</style>