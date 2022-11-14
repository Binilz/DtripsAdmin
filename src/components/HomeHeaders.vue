<template>
<div>
  <v-app-bar  
  color="#3e154e" height="100" 
  flat
  >  
  <v-app-bar-nav-icon class="hidden-lg-and-up" dark  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  <!-- <v-btn class="hidden-lg-and-up">Drawer</v-btn> -->
  <button>
      <router-link to="/" ><v-img
      class="mx-2"
      src="logo.png"
      max-height="200"
      max-width="200"></v-img></router-link></button>
    <!-- <v-btn color="purple" dark permanent><router-link to="/login">Log In</router-link> </v-btn> -->
  
<v-spacer></v-spacer>

<v-list class="d-none d-sm-flex align-center rounded"  color="#3e154e" dark permanent

>
<v-list-item

  v-for="item in items"
  :key="item.title"
  :to="item.to"
  link
  >

    <v-list-item-title>{{ item.title }}</v-list-item-title>
  
</v-list-item>

<v-btn class="hidden-sm-and-down" color="white" icon>
  <v-icon>mdi-magnify</v-icon>
</v-btn>
<v-btn class="hidden-sm-and-down" outlined color="white">Sign In or Register</v-btn>
</v-list>



</v-app-bar>
<v-navigation-drawer
class="hidden-sm-and-up" 
  v-model="drawer"
  absolute
  height="250"
  temporary
  width="128"
  
 >
<v-list nav>
  <v-list-item v-for="item in items" :key="item.title" link>
   
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    
  </v-list-item>
</v-list>
</v-navigation-drawer>
</div>
</template>
<script>

export default {
data:() => ({
  drawer: null,
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