
<template>
  <v-card>
    <v-data-table :headers="headers" :items="filteredProducts" sort-by="calories" color="purple">
      <template v-slot:item="row">
          <tr>
              <td>
                <router-link :to="`/viewProduct/${row.item.id}`">{{row.item.id}}</router-link>
              </td>
              <td>{{row.item.productName}}</td>
              <td>{{row.item.productDescription}}</td>
              <td>{{row.item.manufacturer}}</td>
              <td>{{row.item.price}}</td>
              <td>{{row.item.quantity}}</td>
              <td>
                    <v-btn class="mx-2" fab dark x-small :to="`/updateProduct/${row.item.id}`" color="purple">
                        <v-icon dark>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn class="mx-2" fab dark x-small color="pink">
                        <v-icon dark  @click="deleteItem(item)">mdi-delete</v-icon>
                  </v-btn>
              </td>
          </tr>
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
          { text: 'Quantity', value: 'quantity' },
          { text: 'Actions', value: 'actions', sortable: false },
                   
        ],
        productsList:[]
      }
    },
  
  mounted: function(){
    axios.get("http://localhost:3000/products")
    .then((data) =>{
        this.productsList=data.data;
    })
  },
  computed: {
    filteredProducts: function () {
        let product_array = this.productsList,
            searchString = this.SearchKey;
        if(!searchString){
            return product_array;
        }
        searchString = searchString.trim().toLowerCase();
        product_array = product_array.filter(function(item){
            if(item.productName.toLowerCase().indexOf(searchString) !== -1
            || item.productDescription.toLowerCase().indexOf(searchString) !== -1
            || item.manufacturer.toLowerCase().indexOf(searchString) !== -1
            || item.price.toString().toLowerCase().indexOf(searchString) !== -1
            || item.quantity.toString().toLowerCase().indexOf(searchString) !== -1){
                return item;
            }
        })
        return product_array;
    }
},
methods:{
  deleteItem (item) {
        confirm(`Are you sure you want to delete this item?', ${item.id}`)
      }
}
}
</script>