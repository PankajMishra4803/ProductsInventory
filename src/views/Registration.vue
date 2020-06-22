<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid >
        <v-row align="center" justify="center" >
          <v-col cols="12" sm="8" md="4" >
            <v-card class="elevation-12">
              <v-toolbar color="purple" dark flat class="white--text">
                <v-toolbar-title>Registration form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="isValid" ref="form">
                  <v-text-field label="First Name" 
                    v-model="firstname"
                    name="firstname" 
                    color="purple"
                    type="text" 
                    :rules="[v => !!v || 'First Name is required']"
                    required >
                  </v-text-field>
                  <v-text-field label="Last Name"
                    v-model="lastname"
                    name="lastname" 
                    color="purple"
                    type="text" 
                    :rules="[v => !!v || 'Last Name is required']"
                    required >
                  </v-text-field>
                  <v-text-field label="Email"
                    v-model="email"
                    name="email" 
                    type="email" 
                    color="purple"
                    :rules="emailRules"
                    error-count="2"
                    v-on:blur="checkExitEMail(email)" 
                    required >
                  </v-text-field>
                  <v-text-field label="Password"
                    v-model="password"
                    name="password"
                    color="purple" 
                    type="password"
                    :rules="passwordRules"
                    error-count="5"
                    required
                    >
                  </v-text-field>
                  <v-text-field label="Confirm Password"
                    v-model="cnpassword"
                    name="cnpassword" 
                    color="purple"
                    type="password"
                    :rules="confirmpasswordRules"
                    required
                    >
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions  class="justify-center">
                <v-btn color="purple" class="white--text" :disabled="!isValid" @click="addUser">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      timeout='2000'
      top
      :color="dynamicColor"
      :multi-line="multiLine"
    >
      {{ textMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
  </v-app>
  
</template>

<script>
import axios from 'axios';
export default {
  name: 'Registration',
  data: () => ({
    firstname: '',
    lastname: '',
    email: '', 
    password: '',
    cnpassword: '',
    multiLine: true,
    timeout:2000,
    snackbar:false,
    dynamicColor:'',
    textMessage:'',
    emailRules: [ 
      v => !!v || 'Email is required', 
      v => /.+@.+/.test(v) || 'E-mail must be valid' 
    ],
    passwordRules: [ 
      v => !!v || 'Password is required', 
      v => (v && v.length >= 5) || 'Password must have 5+ characters',
      v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character', 
      v => /(?=.*\d)/.test(v) || 'Must have one number', 
      v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]' 
    ],
    
    isValid: true 
  }),
  computed: {
    confirmpasswordRules () {
      const confirmpasswordRules = []
      const emptyrule =
      v => !!v || 'Password is required'
      confirmpasswordRules.push(emptyrule);

      if (this.password) {
        const matchrule =
        v => (!!v && v) === this.password || 'Values do not match'
        confirmpasswordRules.push(matchrule)
      }
      return confirmpasswordRules
    },
  },watch: {
    cnpassword: 'validateField',
  },
  methods: {
    validateField () {
      this.$refs.form.validate()
    },
    addUser(){
         let registerUser = {};
      registerUser.fname = this.firstname;
      registerUser.lname = this.lastname;
      registerUser.mail = this.email;
      registerUser.pwd = this.password;
      axios.post('http://localhost:3000/users', registerUser)
      .then(() =>{
        this.snackbar = true;
        this.dynamicColor='green';
        this.textMessage ="successfully registered."
        this.$refs.form.reset()
        setTimeout(() =>{
           this.$router.push({ name: 'Login', path: '/login' } );
        }, 2000)
      })
      .catch((error) =>{
        console.log(error)
      })
  },
  checkExitEMail(email){
      axios.get("http://localhost:3000/users")
      .then((data) =>{
          let userData =data.data;
          userData.forEach((user) =>{
          if(user.mail === email){
            this.snackbar = true;
            this.dynamicColor = 'red';
            this.textMessage ="Email Already exit.";
            this.$refs.form.reset()
          }
        })
      })
    },
      
  },

}
</script>