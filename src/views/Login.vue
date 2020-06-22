<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="purple" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="loginForm">
                  <v-text-field
                    color="purple"
                    v-model="values.emailId"
                    :rules="loginEmailRules"
                    label="Email"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    color="purple"
                    v-model="values.password"
                    :rules="[rules.required]"
                    label="Password"
                    prepend-icon="mdi-lock"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="() => (show = !show)"
                    :type="show ? 'password' : 'text'"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn @click="login()" color="purple" class="white--text"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <div class="text-center">
      <v-snackbar
        v-model="snackbar"
        timeout="2000"
        top
        color="red"
        :multi-line="multiLine"
      >
        {{ textMessage }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      values: {
        emailId: null,
        password: null,
      },
      textMessage:'Invalid username and password',
      snackbar:false,
       multiLine: true,
      show: true,
      loginEmailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 8) || "Min 8 characters",
      },
    };
  },
  methods: {
    login() {
      if (this.$refs.loginForm.validate()) {
        let userList;
        let returnValue;
        axios.get("http://localhost:3000/users").then((responseData) => {
          userList = responseData.data;
          returnValue = userList.find((user) => {
            return (
              user.mail === this.values.emailId &&
              user.pwd === this.values.password
            );
          });
          if (returnValue) {
            userList.forEach((user) => {
              if (
                user.mail === this.values.emailId &&
                user.pwd === this.values.password
              ) {
                  user.isLoggedIn = true;
                this.$store.dispatch("userLoggedIn", user);
                this.$router.push({ name: "dashBoard", path: "/" });
              }
            });
          } else {
              this.snackbar = true;
              this.$refs.loginForm.reset()
          }
        });
      }
    },
  },
};
</script>

<style>
.v-application--wrap {
  min-height: 0px !important;
}
</style>
