<template>
  <v-card>
    <h1 class="text-center">DashBoard</h1>
    <chart :chart-data="datacollection"></chart>
    <v-card-title>
      <v-text-field
        v-model="SearchFilter"
        label="Search"
        color="purple"
      ></v-text-field>
    </v-card-title>
    <v-btn
      small
      fab
      dark
      color="purple"
      to="addProduct"
      class="float-right"
      style="margin-top: -22px;"
      v-if="$store.state.userInfo.isLoggedIn"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <DataTable class="mt-6" v-bind:SearchKey="SearchFilter" />
  </v-card>
</template>

<script>
import DataTable from "./DataTable";
import Chart from "../Chart/Chart";
import axios from "axios";
export default {
  name: "DashBoard",
  data() {
    return {
      SearchFilter: "",
      datacollection: null
    };
  },
  components: {
    DataTable,
    Chart,
  },
  mounted() {
    this.fillData();
    localStorage.getItem
  },
  methods: {
    fillData() {
      axios
        .get("http://localhost:3000/productsGraph")
        .then((graphData) => {
          let arrygraphData = graphData.data;
          let productName = [];
          let noOfView = [];
          arrygraphData.forEach((x) => {
            productName.push(x.productName);
            noOfView.push(x.nonOfview);
          });
          this.datacollection = {
            labels: productName,
            datasets: [
              {
                label: "# number of view",
                backgroundColor: "#9c27b0",
                data: noOfView,
              },
            ],
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
