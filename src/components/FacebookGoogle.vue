<template>
  <div>
    <section id="firebaseui-auth-container"></section>
    <!-- <div id="loader">Loading...</div> -->
    <!-- <div v-if="isSignedIn">
      <v-btn @click="login">Call</v-btn>
      <v-btn @click="handleSignOut"> Sign Out</v-btn>
    </div> -->
  </div>
</template>

<!-- <script src="/__/firebase/init.js"></script>
<script src="https://cdn.firebase.com/libs/firebaseui/3.0.0/firebaseui.js"></script> -->
<script>
import axios from 'axios';
import { ref } from 'vue';
import firebaseConfig from '../firebaseConfig';
import firebase from 'firebase/compat/app';

firebase.initializeApp(firebaseConfig); 
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css';
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export default {
  mounted(){
    const user = ref(null);
   
    const email = ref(null);
    const image = ref(null);
   
    const useridfb = ref(null);
    const isSignedIn = ref(false);
    
    const uiConfig = {
      signInFlow: 'popup',
      signinSuccessUrl: 'http://localhost:8080/',
      signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,

      ],
      callbacks: {
     
        signInSuccessWithAuthResult: function(authResult) 
        {
          user.value = authResult.user.displayName;
          email.value = authResult.user.email;
          image.value = authResult.user.photoURL;
          useridfb.value = authResult.additionalUserInfo.profile.id;
       
          console.log(authResult);
          console.log(authResult.user.email);
          
          console.log(authResult.credential.providerId);

          if (authResult.credential.providerId == "google.com" ){
            console.log(authResult.user.displayName)
            
            axios.post( `http://192.168.1.46:8991/api/auth/google-signin`, {
               "name" : authResult.user.displayName,
               "email": email.value,
               "username": email.value,
               "password": email.value,
               "imageurl": image.value,
            })
            .then((response)=>{
                console.log(response.status);
                console.log(response.data);
               
                console.log('Success')
                // this.$router.push({name: 'home'})
              }).catch((error)=>{
                  alert( `Error connection`)
                  console.log(error);
                  console.log("error");
                console.log(error.response);
              });
          }
          if (authResult.credential.providerId == "facebook.com" ){
            
            console.log(authResult.additionalUserInfo.profile.id)
           
            axios.post(`http://192.168.1.46:8991/api/auth/fb-signin`, 
            {
               "username" :  useridfb.value,
               "name" : authResult.user.displayName,
               "identity": useridfb.value,
               "email" : useridfb.value,
               "password": useridfb.value,
               "imageurl": image.value,
            })
            .then((response)=>{
                console.log(response.status);
                console.log(response.data);
               
                console.log('Facebook Success')
                // this.$router.push({name: 'home'})
              }).catch((error)=>{
                  alert( `Error connection`)
                  console.log(error);
                  console.log("error");
                console.log(error.response);
              });
          }
       
          isSignedIn.value = true;

          return false;
        },

        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        },
      },
  }
  if(firebaseui.auth.AuthUI.getInstance()) {
      const ui = firebaseui.auth.AuthUI.getInstance()
      ui.start('#firebaseui-auth-container', uiConfig)
    } else {
      const ui = new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('#firebaseui-auth-container', uiConfig)
    }
    document.querySelector('#firebaseui-auth-container');


    // Initialize the FirebaseUI Widget using Firebase.

    // var ui = new firebaseui.auth.AuthUI(firebase.auth());
 
    // ui.start('#firebaseui-auth-container', uiConfig);

    // const handleSignOut = () => {
    //   console.log('signed Out');
    //     signOut(auth).then(() => {
    //       // Sign-out successful.
    //       user.value = null;
    //       isSignedIn.value = false;
    //       console.log(authResult.user.email);
    //       console.log(this.email.value);
    //       ui.start('#firebaseui-auth-container', uiConfig);
    //     }).catch((error) => {
    //       // An error happened.
    //       console.log(error);
    //     });
    //   }

    return{
      user,
      isSignedIn,
      email, image,
      // handleSignOut,
    }
  },

  methods:{
    //  handleSignOut () {
    //   console.log('signed Out');
    //     signOut(auth).then(() => {
    //       // Sign-out successful.
    //       user.value = null;
    //       isSignedIn.value = false;
    //       console.log(authResult.user.email);
    //       console.log(this.email.value);
    //       // ui.start('#firebaseui-auth-container', uiConfig);
    //     }).catch((error) => {
    //       // An error happened.
    //       console.log(error);
    //     });
    //   }

  }
}
</script>