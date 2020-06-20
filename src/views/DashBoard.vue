<template>
  <div class="mx-4"> 
    <h1>DashBoard</h1>
    <DataTable v-bind:SearchKey = 'SearchFilter'/>
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
