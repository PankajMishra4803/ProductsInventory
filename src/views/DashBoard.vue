<template>
  <div class="mx-4"> 
    <h1>DashBoard</h1>
    <form>
      <v-col cols="12" sm="6">
          <v-text-field
            label="Outlined"
            single-line
            outlined
            v-model="SearchFilter" placeholder="Type here"
          ></v-text-field>
      </v-col>
  
    <DataTable v-bind:SearchKey = 'SearchFilter'/>
    </form>
  </div>
</template>

<script>
import DataTable from "./DataTable"
export default {
  name: 'DashBoard',
  data (){
    return {
      SearchFilter:''      
    }
  },
  components: {
    DataTable
  }
}
</script>
