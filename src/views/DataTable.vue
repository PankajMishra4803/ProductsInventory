
<template>
  <v-card>
    <v-data-table :headers="headers" :items="filteredArticles" sort-by="calories" class="elevation-1">
      <template v-slot:item.actions ="{ item }">
          <v-btn class="mx-2" fab dark x-small :to="`/updateProduct/${item.id}`" color="purple">
              <v-icon dark>mdi-pencil</v-icon>
          </v-btn>
          <v-btn class="mx-2" fab dark x-small color="pink">
              <v-icon dark  @click="deleteItem(item)">mdi-delete</v-icon>
         </v-btn>
    </template>
    </v-data-table>
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
        props:['SearchKey'],
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
          { text: 'Actions', value: 'actions', sortable: false },
                   
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
},
methods:{
  deleteItem (item) {
        //const index = this.desserts.indexOf(item)
        console.log(item)
        confirm(`Are you sure you want to delete this item?', ${item.id}`)
      }
}
}
</script>
