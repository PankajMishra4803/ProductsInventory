<!--Search function-->
  
<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="UserList"
      :search="search"
    ></v-data-table>
  </v-card>
</template>



<script>

import axios from "axios";

export default {
  name: 'Datatable',
  props: ['SearchKey'],
  data () {
      return {
        search: '',
        headers: [
          {
            text: 'Product ID',
            align: 'start',
            filterable: false,
            value: 'id',
          },
          { text: 'Product Name', value: 'productName' },
          { text: 'Product Description', value: 'productDescription' },
          { text: 'Manufacturer', value: 'manufacturer' },
          { text: 'Price', value: 'price' },
          { text: 'Quantity', value: 'qantity' },
                   
        ],
        UserList:[]
      }
    },
  
  mounted: function(){
    axios.get("http://localhost:3000/products")
    .then((data) =>{
        console.log("Data:",data.data);
        this.UserList=data.data;
        console.log("UserList:",this.UserList);

    })
  },
  computed: {
    // A computed property that holds only those items that match the searchString.
    filteredArticles: function () {
        var user_array = this.UserList,
            searchString = this.SearchKey;

        if(!searchString){
            return user_array;
        }

        searchString = searchString.trim().toLowerCase();

        user_array = user_array.filter(function(item){
            if(item.productName.toLowerCase().indexOf(searchString) !== -1
            || item.productDescription.toLowerCase().indexOf(searchString) !== -1
            || item.manufacturer.toLowerCase().indexOf(searchString) !== -1
            || item.price.toString().toLowerCase().indexOf(searchString) !== -1
            || item.qantity.toString().toLowerCase().indexOf(searchString) !== -1){
                return item;
            }
        })

        // Return an array with the filtered data.
        return user_array;
    }
}
}
</script>
