<template>
  <!-- <v-img src="https://media.istockphoto.com/photos/purple-defocused-blurred-motion-abstract-background-picture-id1273929462?b=1&k=20&m=1273929462&s=170667a&w=0&h=Yldyj7IZlkZSFHf3kgp4T2OV2HAYNRX1Kw8W4RAqPlQ="> -->
  <div>
  <home-headers></home-headers>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-h5 pa-10">
          Please check your username or password
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#3e154e"
            text
            @click="dialog = false"
          >
            Okay
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
  <v-container class="container" >
    
    <!-- <v-card class="elevation-8 mt-14 ml-7 mr-7" > -->
      <v-row align="center" justify="center">
       <v-col cols="12" sm="7" md="4">
        <v-img max-width=650 src="login.png"></v-img>
       </v-col>
       
         <v-col cols="12" sm="6" md="5">
            <v-window >
              <v-window-item :value="1">
                <v-row>
                  
                  <v-col cols="12" md="9">
                    <v-card-text class="mt-12">
                      <v-row justify="space-around">
    <v-avatar color="#3e154e">
      <v-icon dark>
        mdi-account-outline</v-icon>
    </v-avatar>
                      </v-row>
                      <br>
                      <h2 class="text-center">Login in to Your Account</h2>
                      
                      <v-row align="center" justify="center">
                       
                        <v-col cols="12" sm="8">
                          <form @submit.prevent="loginValidation" ref="form">
                            <v-text-field
                              label="Email"
                              name="email"
                              placeholder="Email"
                              v-model="email"
                              :rules="emailRules" 
                              outlined
                              dense
                              color="purple"
                              autocomplete="false"
                              class="mt-16"
                              prepend-inner-icon="mdi-email"
                            />
                            <v-text-field
                              label="Password"
                              name="password"
                              placeholder="Password"
                              v-model="password"
                              :rules="passwordRules" 
                              outlined
                              dense
                              color="purple"                              
                              prepend-inner-icon="mdi-lock-outline"
                              :type="passwordShow ? 'text' : 'password'"
                              :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="passwordShow = !passwordShow"
                            />
                            <v-btn
                              type="submit"
                              color="purple"
                              dark
                              block
                              tile
                            >Log in</v-btn
                            >
                            <br>
                            
                             <v-row>
                              <v-col>

                              </v-col>
                              <v-col cols="13" sm="5">
                                
                                <router-link to='/forgetpassword' class="reset-button">Forget password</router-link>
                              </v-col>
                            </v-row>
                           
                              <div class="login-choice"> <span>or log in using</span></div>
                              <v-row> 
                              <v-col cols="12" sm="12">
                               
                                <facebook-google></facebook-google>
                                
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" sm="12">
                              Not a Dtrip Member?? <button><router-link to="/registerpage" class="purple--text">Register</router-link> </button>
                            </v-col>
                            </v-row>
                          </form>
                        </v-col>
                      </v-row>
                     
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-col>
        
        
      </v-row>
    <!-- </v-card> -->
    </v-container>  

  </div>
<!-- </v-img> -->
</template>

<script>
import HomeHeaders from './HomeHeaders.vue'
import FacebookGoogle from '../components/FacebookGoogle'
import axios from 'axios'
export default {
  data(){
    return{    
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be more than 8 characters',
      ],
      passwordShow: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ], 
dialog:false,
    } ;

  },
  
  components: {
    HomeHeaders, FacebookGoogle
  },
  methods: {
    loginValidation() {
      axios.post('http://192.168.1.46:8991/api/auth/signin', {
            "username" : this.email,
            "password": this.password,
              }).then((response)=>{
              if(response.status===208){
                console.log(response.status);
                console.log(response.data);
                console.log('Login Successfully');
                this.$router.push("/registerpage");
              }
              }).catch((error)=>{                     
                console.log(error);
              }); 
              
          },
      
 
     
  }

  }




</script>

<style scoped>
::v-deep .v-btn {
  padding-left: 12px;
  padding-right: 12px;
}
.login-choice span {
  color: #5b6987;
  display: -ms-grid;
  display: grid;
  font-size: 16px;
  width: 100%;
  line-height: 40px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
  -ms-grid-columns: minmax(20px,1fr) auto minmax(20px,1fr);
  grid-template-columns: minmax(20px,1fr) auto minmax(20px,1fr);
  grid-gap: 19px;
}
.login-choice span:after, .login-choice span:before {
  content: "";
  border-top: 1px solid #e5e8ed;
}

</style>