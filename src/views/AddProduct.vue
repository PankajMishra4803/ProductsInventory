<template>
  <div>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="purple" dark flat class="text-xs-center">
              <v-toolbar-title class="justify-center" v-if="addProductFlag"
                >Add Product</v-toolbar-title
              >
              <v-toolbar-title v-if="updateProductFlag"
                >Update Product</v-toolbar-title
              >
              <v-toolbar-title v-if="viewProductFlag"
                >View Product</v-toolbar-title
              >
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="product.productName"
                  label="ProductName"
                  name="productName"
                  type="text"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="product.productDescription"
                  label="ProductDescription"
                  name="ProductDescription"
                  type="text"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="product.manufacturer"
                  label="Manufacturer"
                  name="manufacturer"
                  type="text"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="product.price"
                  label="Price"
                  name="price"
                  type="number"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="product.quantity"
                  label="Quantity"
                  name="quantity"
                  type="number"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn
                @click="addProduct"
                v-if="addProductFlag"
                color="primary"
                type="submit"
                :disabled="!formIsValid"
                >Add Product</v-btn
              >

              <v-btn
                @click="updateProduct"
                v-if="updateProductFlag"
                color="purple"
                class="white--text"
                type="submit"
                :disabled="!formIsValid"
                >Update Product</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddProduct",

  data() {
    return {
      product: {
        productName: "",
        productDescription: "",
        manufacturer: "",
        price: "",
        quantity: "",
      },
      viewProductFlag: false,
      updateProductFlag: false,
      addProductFlag: false,
    };
  },

  mounted: function() {
    const productId = this.$route.params.id;
    this.getAllProducts();
    const currentRoute = this.$router.currentRoute.fullPath.split("/")[1];
    if (currentRoute == "addProduct") {
      this.addProductFlag = true;
    } else if (currentRoute == "viewProduct") {
      this.viewProductFlag = true;
      this.getProduct(productId);
    } else if (currentRoute == "updateProduct") {
      this.updateProductFlag = true;
      this.getProduct(productId);
    } else {
      console.log("You are trying to access wrong url");
    }
  },

  computed: {
    formIsValid() {
      return (
        this.product.productName !== "" &&
        this.product.productDescription !== "" &&
        this.product.manufacturer !== "" &&
        this.product.price !== "" &&
        this.product.quantity !== ""
      );
    },
  },

  methods: {
    addProduct() {
      if (!this.formIsValid) {
        return;
      }
      this.$store.dispatch("addNewProduct", this.product);
    },

    getAllProducts() {
      axios
        .get(`http://localhost:3000/products`)
        .then((data) => {
          this.$store.dispatch("addAllProducts", data);
        });
    },

    getProduct(id) {
      axios
        .get(`http://localhost:3000/products/${id}`)
        .then((data) => {
          this.product = data.data;
        });
    },
    updateProduct() {
      if (!this.formIsValid) {
        return;
      }
      this.$store.dispatch("updateProduct", [
        this.product,
        this.$route.params.id,
      ]);
    },
  },
};
</script>
