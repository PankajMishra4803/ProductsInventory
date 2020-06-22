<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="purple" dark flat class="text-xs-center">
              <v-toolbar-title>Account details</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-list>
                <v-list-item-group color="primary">
                  <v-list-item>
                    <v-list-item-content>
                      <div>
                        <span class="title">FirstName: </span>
                        <span class="value">{{
                          $store.state.userInfo.fname
                        }}</span>
                      </div>
                      <div>
                        <span class="title">LastName: </span>
                        <span class="value">{{
                          $store.state.userInfo.lname
                        }}</span>
                      </div>
                      <div>
                        <span class="title">MailId: </span>
                        <span class="value">{{
                          $store.state.userInfo.mail
                        }}</span>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AcountDetails",
};
</script>
