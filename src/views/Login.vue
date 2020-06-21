<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="purple" dark flat >
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="isValid" ref="loginForm" >
                  <v-text-field color="purple"  v-model="values.emailId" :rules="loginEmailRules" label="Email"  prepend-icon="mdi-account" type="text"></v-text-field>
                  <v-text-field color="purple" v-model="values.password" :rules="[rules.required]" label="Password" prepend-icon="mdi-lock" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="() => (show = !show)" :type="show ? 'password' : 'text'"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn @click="login()" color="purple" class="white--text" :disabled="!isValid">Login</v-btn>
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
  name: 'Login',
  data(){
    return{
      values : {
        emailId : null,
        password : null
      },
     
      show:true,
      loginEmailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 8) || "Min 8 characters"
      }
    }
  },
  methods:{
    login(){
      this.$refs.loginForm.validate();
      console.log(this.values);
      

    }
  }
}
</script>

<style>
.v-application--wrap {
  min-height: 0px !important;
}
</style>
