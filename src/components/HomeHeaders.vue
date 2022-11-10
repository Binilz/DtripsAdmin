<template>
<div>
  <v-app-bar  
  color="#3e154e" height="100" 
  app style="position:fixed">  
  
  <button>
      <router-link to="/" ><v-img
      class="mx-2"
      src="logo.png"
      max-height="200"
      max-width="200"></v-img></router-link></button>
    <!-- <v-btn color="purple" dark permanent><router-link to="/login">Log In</router-link> </v-btn> -->
  
<v-spacer></v-spacer>

<v-list class="d-flex align-center rounded" color="#3e154e" dark permanent

>
<v-list-item
  v-for="item in items"
  :key="item.title"
  :to="item.to"
  link
  >

    <v-list-item-title>{{ item.title }}</v-list-item-title>
  
</v-list-item>
<v-btn color="#3e154e">Reach Us</v-btn>
<v-btn color="white" icon>
  <v-icon>mdi-magnify</v-icon>
</v-btn>
<v-btn outlined color="white"><router-link to="/login" style="text-decoration :none" class="white--text">Sign In or Register</router-link></v-btn>
</v-list>



</v-app-bar>
</div>
</template>
<script>

export default {
data:() => ({
items: [
        { title: 'Welcome',},
        { title: 'Flights', },
        { title: 'Hotels', },
        { title: 'About Us', }
      ],
})
}
</script>

<style scoped>


</style>