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
                <v-btn small fab dark color="purple" to="addProduct" class="float-right" style="margin-top: -22px;">
                      <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
            <DataTable class="mt-6" v-bind:SearchKey='SearchFilter'/>
    </v-card>
</template>

<script>
import DataTable from "./DataTable";
import Chart from "../Chart/Chart";
export default {
  name: 'DashBoard',
  data (){
    return {
      SearchFilter:'' ,
      datacollection: null     
    }
  },
  components: {
    DataTable,
    Chart
  },
  mounted() {
        this.fillData();
  },
  methods: {
        fillData() {
          this.datacollection = {
            labels: [
              "Redmi Note7",
              "Samsung A40",
              "Apple 11",
              "Apple SE7",
              "Nokia6 ",
              "Nokia7",
              "Redmi Note8",
              "Redmi Note9",
            ],
            datasets: [
              {
                label: "No Of Product View",
                backgroundColor: "#9c27b0",
                data: [5, 8, 20, 2, 5, 30, 15, 10]
              }
            ]
          };
        },
      }
}
</script>
