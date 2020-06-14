<template>
    <nav>
        <v-app-bar app color="purple" class="white--text">
            <v-toolbar-title>
              <span class="font-weight-light">Product<span>Inventory</span></span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text color="white" to="/">Dashbaord</v-btn>
            <v-menu offset-y open-on-hover>
                <template v-slot:activator="{ on, attrs }">
            <v-btn text color="white" v-bind="attrs" v-on="on" >
            Account
            </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(link, index) in links"
          :key="index"
          :to="link.route"
        >
          <v-list-item-title>{{ link.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
            <v-btn text color="white" right to="/login">
                <span>Log Out</span>
                <v-icon right>fas fa-sign-out-alt</v-icon>
            </v-btn>
        </v-app-bar>
    </nav>
</template>
<script>
export default {
    name:'Navbar',
    data(){
        return {
            links:[
                {title:'Login', route:'/login'},
                {title:'Registration', route:'/registration'},
                {title:'AccountDetails', route:'/viewAccount'}
            ]
        }
    }
}
</script>