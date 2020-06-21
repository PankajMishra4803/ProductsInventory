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
                    type="text" 
                    :rules="[v => !!v || 'First Name is required']"
                    required >
                  </v-text-field>
                  <v-text-field label="Last Name"
                    v-model="lastname"
                    name="lastname" 
                    type="text" 
                    :rules="[v => !!v || 'Last Name is required']"
                    required >
                  </v-text-field>
                  <v-text-field label="Email"
                    v-model="email"
                    name="email" 
                    type="email" 
                    :rules="emailRules"
                    error-count="2"
                    required >
                  </v-text-field>
                  <v-text-field label="Password"
                    v-model="password"
                    name="password" 
                    type="password"
                    :rules="passwordRules"
                    error-count="5"
                    required
                    >
                  </v-text-field>
                  <v-text-field label="Confirm Password"
                    v-model="cnpassword"
                    name="cnpassword" 
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
  </v-app>
</template>

<script>

export default {
  name: 'Registration',
  data: () => ({
    firstname: null,
    lastname: null,
    email: null, 
    password: null,
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
    cnpassword: '',
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

      console.log("confirmpasswordRules"+confirmpasswordRules);

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
      console.log("adduser");
      const registerUser = {};
      registerUser.fname = this.firstname;
      registerUser.lname = this.lastname;
      registerUser.mail = this.email;
      registerUser.pwd = this.password;

      console.log("registerUser"+registerUser);

    }
  },

}
</script>