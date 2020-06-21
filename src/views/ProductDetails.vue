<template>
  <div>
   <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar  color="purple" dark flat class="text-xs-center">
              <v-toolbar-title 
                >View Product</v-toolbar-title
              >
            </v-toolbar>
            <v-card-text>
              <v-list>
                <v-list-item-group color="primary">
                  <v-list-item
                  >
                    <v-list-item-content>
                     <div>
                <span class="title">Product Name: </span>
                <span class="value">{{product.productName}}</span>
              </div>
              <div>
                <span class="title">Product Description: </span>
                <span class="value">{{product.productDescription}}</span>
              </div>
              <div>
                <span class="title">Manufacturer: </span>
                <span class="value">{{product.manufacturer}}</span>
              </div>
              <div>
                <span class="title">Price: </span>
                <span class="value">{{product.productName}}</span>
              </div>
              <div>
                <span class="title">Quantity: </span>
                 <span class="value">{{product.quantity}}</span>
              </div>
                    </v-list-item-content>
                    
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              
            </v-card-text>
            <v-card-actions >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ProductDetails',
  data() {
    return {
      product: {
         productName: "",
         productDescription: "",
         manufacturer: "",
         price: "",
         quantity: "",
      },
    }
  },
  mounted: function() {
    const productId = this.$route.params.id;
    axios
        .get(`http://localhost:3000/products/${productId}`)
        .then((data) => {
          this.product = data.data;
          console.log(this.product)
        })
        .catch((error)=>{
          this.error =  error
        })
  }
}
</script>

<style scoped>
.value {
  width: 100px;
  font-size: 22px;
 color :purple;
}
.title {
  color: black;
  font-size: 24px;
}
</style>
