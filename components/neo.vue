<template>
  <div class="column justify-start align-start neo" :class="neo.is_potentially_hazardous_asteroid ? 'danger' : ''" :style="detailed ? {'width': '80%'} : {}">
    <div class="name">Name - {{neo.name}}</div>
    <div v-if="detailed" class="name">Designation - {{neo.designation}}</div>
    <div class="diameter">Diameter - <span v-if="neo.estimated_diameter">{{detailed ? neo.estimated_diameter.kilometers.estimated_diameter_min : parseInt(neo.estimated_diameter.kilometers.estimated_diameter_min)}} - {{detailed ? neo.estimated_diameter.kilometers.estimated_diameter_max : parseInt(neo.estimated_diameter.kilometers.estimated_diameter_max)}} Kms</span><span v-else>N/A</span></div>
    <div v-if="neo.close_approach_data && neo.close_approach_data.length" class="row justify-space-between align-center width100" @click="clicked.closestApproach = !clicked.closestApproach;">
      <div class="heading">Closest Approach Data</div>
      <div class="tag">{{neo.close_approach_data.length}}</div>
    </div>
    <div v-if="clicked.closestApproach || detailed" class="column justify-start align-start width100">
      <ul v-for="(thisCAD, index) in neo.close_approach_data" :key="index" class="column justify-start align-start items">
        <li>At - <span v-if="thisCAD.close_approach_date_full">{{thisCAD.close_approach_date_full}}</span><span v-else>N/A</span></li>
        <li>Relative Velocity - <span v-if="thisCAD.relative_velocity.kilometers_per_hour">{{parseInt(thisCAD.relative_velocity.kilometers_per_hour)}}kmph</span><span v-else>N/A</span></li>
        <li>Miss Distance - <span v-if="thisCAD.miss_distance.kilometers">{{parseInt(thisCAD.miss_distance.kilometers)}}kms</span><span v-else>N/A</span></li>
        <li>Orbiting Body - <span v-if="thisCAD.orbiting_body">{{thisCAD.orbiting_body}}</span><span v-else>N/A</span></li>
      </ul>
    </div>
    <div v-if="neo.orbital_data" class="heading" @click="clicked.orbit = !clicked.orbit;">Orbit Data</div>
    <ul v-if="clicked.orbit || detailed" class="column justify-start align-start items">
      <li>ID - <span v-if="neo.orbital_data.orbit_id">{{neo.orbital_data.orbit_id}}</span><span v-else>N/A</span></li>
      <li>Determination - <span v-if="neo.orbital_data.orbit_determination_date">{{neo.orbital_data.orbit_determination_date}}</span><span v-else>N/A</span></li>
      <li>First Observation - <span v-if="neo.orbital_data.first_observation_date">{{neo.orbital_data.first_observation_date}}</span><span v-else>N/A</span></li>
      <li>Last Observation - <span v-if="neo.orbital_data.last_observation_date">{{neo.orbital_data.last_observation_date}}</span><span v-else>N/A</span></li>
      <li>No of Observations - <span v-if="neo.orbital_data.observations_used">{{neo.orbital_data.observations_used}}</span><span v-else>N/A</span></li>
      <li>Uncertainity - <span v-if="neo.orbital_data.orbit_uncertainty">{{neo.orbital_data.orbit_uncertainty}}</span><span v-else>N/A</span></li>
    </ul>
    <div class="row justify-space-between align-center width100">
      <nuxt-link v-if="!detailed" class="heading" :to="'/search/' + neo.id">See More</nuxt-link>
      <span @click="bookmark" v-if="!present" class="material-icons-outlined">bookmark_border</span>
      <span @click="bookmark" v-else class="material-icons-outlined">turned_in</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['neo', 'detailed'],
  data(){
    return {
      clicked: {
        orbit: false,
        closestApproach: false
      }
    }
  },
  computed: {
    present(){
      return this.$auth.loggedIn && (this.$auth.user.favorites.findIndex(elem => elem.id === this.neo.id) > -1);
    }
  },
  methods: {
    async bookmark(){
      try {
        if(!this.$auth.loggedIn) return this.$router.push({ path: '/login' });
        var response = (await this.$axios.post('/users/updateFavorites', this.neo)).data;
        if(response) this.$auth.fetchUser();
        else this.$notify({group: 'foo', type: 'error', title: 'Something went wrong'});
      } catch (e) {
        console.log("Exception", e);
      }
    }
  }
}
</script>

<style>
.neo{
  width: 300px;
  background-color: white;
  border-radius: 4px;
  margin: 10px;
  padding: 10px;
  font-size: 12px;
}
.neo.danger{
  background-color: rgb(255, 238, 238);
}
.name{
  font-size: 16px;
  margin-bottom: 5px;
}
.diameter{
  font-size: 14px;
  padding-bottom: 5px;
  border-bottom: 1px solid whitesmoke;
  margin-bottom: 5px;
}
.heading{
  padding: 5px 0;
  color: #670882;
  text-decoration: underline;
  cursor: pointer;
}
ul{
  padding: 5px;
  margin-bottom: 5px;
  margin-left: 15px;
}
.tag{
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 1px solid gainsboro;
  border-radius: 50%;
}
</style>
