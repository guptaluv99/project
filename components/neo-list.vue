<template>
  <div class="column justify-start align-start subBox">
    <div @click="show = !show;" class="row justify-space-between align-center subBoxTitle">
      <div>{{thisDay.date}}</div>
      <div v-if="show" class="material-icons-outlined">keyboard_arrow_up</div>
      <div v-else class="material-icons-outlined">keyboard_arrow_down</div>
    </div>
    <div v-if="show" class="row justify-start align-start wrap">
      <neo style="color:black;" v-for="thisNeo in thisDay.neos" :key="thisNeo.id" :neo="thisNeo" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['thisDay'],
  data(){
    return { show: false }
  }
}
</script>

<style scoped>
.subBox{
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: 1px solid whitesmoke;
  border-radius: 4px;
  background-color: black;
}
.subBoxTitle{
  width: 100%;
  font-size: 20px;
  border-bottom: 1px solid whitesmoke;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
</style>