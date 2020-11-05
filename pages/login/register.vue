<template>
  <div class="column justify-center align-center page">
    <div class="column justify-start align-center box">
      <input type="text" v-model="name" name="name" placeholder="Your Name..." />
      <input type="text" v-model="mobile" name="mobile" placeholder="Mobile Number" />
      <input type="text" v-model="email" name="email" placeholder="Email (Optional)" />
      <input type="password" v-model="password" name="password" placeholder="Password" />
      <div class="row justify-space-between align-center actions">
        <button class="secondary" @click="login">Login</button>
        <button class="primary" @click="register">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'page',
  data(){
    this.$store.dispatch('setTitle', 'Register');
    return {
      name: undefined,
      mobile: undefined,
      email: undefined,
      password: undefined
    }
  },
  methods: {
    login(){
      this.$router.push({path: '/login'})
    },
    async register(){
      try {
        var reqBody = {
          name: this.name,
          mobile: this.mobile,
          email: this.email,
          password: this.password
        }
        console.log(reqBody);
        var response = (await this.$axios.post('/users/register', reqBody)).data;
        if(response) {
          this.$notify({group:'foo', type: 'success', title: 'Account successfully created', text: 'Please wait while we login you'});
          this.$auth.loginWith('local', {
            data: {
              mobile: this.mobile,
              password: this.password
            }
          }).then(() => this.$notify({
            group: 'foo',
            type: 'success',
            title: 'Welcome',
            text: 'Welcome'
          })).catch((e) => this.$notify({
            group: 'foo',
            type: 'error',
            title: 'Invalid Credentials',
            text: 'The credentials you entered are incorrect'
          }));
        } else {
          this.$notify({group:'foo', type: 'error', title: 'Internal Server Error'});
        }
      } catch (e) {
        console.log('Exception', e);
        this.$notify({group:'foo', type: 'error', title: 'Something Went Wrong'});
      }
    }
  }
}
</script>

<style scoped>
.page{
  height: 100%;
  width: 100%;
}
.box{
  margin: 20px;
}
.actions{
  margin: 20px 0;
}
input{
  margin: 10px 0;
}
.actions > button{
  height: 30px;
  outline: none;
  border: none;
  box-shadow: 0px 4px 4px rgba(50, 50, 71, 0.08), 0px 4px 8px rgba(50, 50, 71, 0.06);
  border-radius: 5px;
  margin: 0 10px;
  cursor: pointer;
}
button.primary{
  background-color: #670882;
  color: white;
}
button.secondary{
  background-color: white;
  color: black;
}
</style>