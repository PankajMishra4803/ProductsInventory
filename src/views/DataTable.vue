<!--Search function-->
<template>
  <div >
    <h1>Datatable</h1>
    <p> {{SearchKey}}</p>

     <ul>
        <!-- Render a li element for every entry in the computed filteredArticles array. -->

        <li :key="indx" v-for="(user,indx) in filteredArticles">
            
            <p><b>{{user}}</b></p>
            <hr>
        </li>
    </ul>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'Datatable',
  props: ['SearchKey'],
  data (){
    return {
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
