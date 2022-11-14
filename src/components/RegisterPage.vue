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
    <home-headers></home-headers>
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
                      <h2 class="text-center">Create a New Account</h2>
                      
                      <v-row align="center" justify="center">
                       
                        <v-col cols="12" sm="8">
                          <v-form @submit.prevent="register" ref="form" v-model="form">
                            <v-text-field
                            label="Name"
                            type="text"
                            placeholder="Name"
                            v-model="name"
                            :rules="[rules.required]"
                            outlined
                            dense
                            color="purple"
                            autocomplete="false"
                            class="mt-16"
                            prepend-inner-icon="mdi-account"
                          />  
                          <v-text-field
                            label="Email"
                           
                            placeholder="Email"
                            v-model="email"
                            :rules="emailRules" 
                            outlined
                            dense
                            color="purple"
                            autocomplete="false"
                            
                            prepend-inner-icon="mdi-email"
                          />                 
                          <v-text-field
                            label="Password"
                            
                            placeholder="Password"
                            v-model="password"
                            :rules="[rules.password, rules.length(6)]" 
                            outlined
                            dense
                            color="purple"                              
                            prepend-inner-icon="mdi-lock-outline"
                            :type="passwordShow ? 'text' : 'password'"
                            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="passwordShow = !passwordShow"
                          />
                          <v-text-field
                            label="Confirm Password"
                        
                            placeholder="Confirm Password"
                            v-model="password2"
                            :rules="PasswordRules2.concat(validatePassword2)"
                            outlined
                            dense
                            color="purple"                              
                            prepend-inner-icon="mdi-lock-outline"
                            :type="passwordShow ? 'text' : 'password'"
                            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="passwordShow = !passwordShow"
                          />
                          <!-- <v-text-field
                          label="Phone Number"
                          placeholder="Phone Number"
                          v-model="phone"
                  
                          outlined
                          dense
                          color="purple"                              
                          prepend-inner-icon="mdi-phone"
                      
                        /> -->
                        <v-checkbox
                            v-model="agreement"
                            :rules="[rules.required]"
                            color="#92278f"
                        >
                            <template v-slot:label>
                            I agree to the&nbsp;
                            <router-link to="/terms" class="purple--text ml-3" icon>Terms and Conditions</router-link>
                            &nbsp;and&nbsp;
                            <router-link to="/privacy" class="purple--text ml-3" icon>Privacy Policy</router-link>*
                            </template>
                        </v-checkbox> 
                            <v-btn
                            :disabled="!form"
                            :loading="isLoading"
                              type="submit"
                              id="register"
                              color="purple"
                              depressed block tile
                            >Register</v-btn
                            >
                            <br>
                            
                          
                          </v-form>
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
  data: () => ({
      dialog: false,
      agreement: false,
      email: '',
      
      name:'',
      form: false,
      isLoading: false,
      password: '',
      password2: '',
      passwordShow: false,
      phone: '',
      PasswordRules2: [ v => !!v || "Password incorrect" ],
      rules: {
        email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
        required: v => !!v || 'This field is required',
      },
    }),
  components: {
    HomeHeaders, FacebookGoogle,
  },
  methods: {
    register() {
      axios.post('http://192.168.1.46:8991/api/auth/admin-signup', {
            "username" : this.email,
            "email" : this.email,
            "password": this.password,
              }).then((response)=>{
              if(response.status===200){
                console.log(response.status);
                console.log(response.data);
                console.log('Registered Successfully');
                this.$router.push("/");
              }
              }).catch((error)=>{                     
                console.log(error);
              }); 
              
          },
          validatePassword2(value) {
          return value == this.password || "Password does not match"
        }, 
 
     
  }

  }




</script>

