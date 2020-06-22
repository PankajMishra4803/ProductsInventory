<template>
  <nav>
    <v-app-bar app color="purple" class="white--text">
      <v-toolbar-title>
        <span class="font-weight-light">Product<span>Inventory</span></span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="text-center" v-if="$store.state.userInfo.isLoggedIn">
        <v-chip class="ma-2" color="purple" text-color="white">
          <v-avatar left>
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
         Welcome {{$store.state.userInfo.fname}}
        </v-chip>
      </div>
      <v-btn text color="white" to="/">Dashbaord</v-btn>
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text color="white" v-bind="attrs" v-on="on">
            Account
          </v-btn>
        </template>
        <v-list v-if="!$store.state.userInfo.isLoggedIn">
          <v-list-item
            v-for="(link, index) in UserNotLoggedlinks"
            :key="index"
            :to="link.route"
          >
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list v-if="$store.state.userInfo.isLoggedIn">
          <v-list-item
            v-for="(link, index) in UserLoggedlinks"
            :key="index"
            :to="link.route"
          >
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        text
        color="white"
        right
        to="/login"
        v-if="$store.state.userInfo.isLoggedIn"
        @click="logOut()"
      >
        <span>Log Out</span>
        <v-icon right>fas fa-sign-out-alt</v-icon>
      </v-btn>
    </v-app-bar>
  </nav>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      UserLoggedlinks: [
        { title: "AccountDetails", route: "/viewAccount" },
      ],
      UserNotLoggedlinks: [
        { title: "Login", route: "/login" },
        { title: "Registration", route: "/registration" },
      ],
    };
  },
  methods: {
    logOut() {
      localStorage.removeItem("userLoggged");
      this.$store.state.userInfo.isLoggedIn = false;
    },
  },
};
</script>
