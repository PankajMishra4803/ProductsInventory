import Vue from 'vue'
import Vuex from 'vuex'
const URL =  "http://localhost:3000/products"
import axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    products: [],
    success: null,
    error: null
  },
  mutations: {
    setAllProducts(state,payload){
      console.log(state.products)
      state.products = payload
      console.log(state.products.data)
    },
    createAProduct(state, payload) {
      const newProduct = payload
      state.products.push(newProduct)
    },
    setSuccess (state , payload) {
      state.success = payload
    }, 
    setError (state, payload) {
      state.error = payload
    },
    updateAProduct(state,payload) {
      for( let product in state.products.data)
      {
        if(product.id == payload[1])
        {
        product.productName=  payload[0].productName,
        product.productDescription =  payload[0].productDescription,
        product.manufacturer =  payload[0].manufacturer,
        product.price = payload[0].price,
        product.quantity = payload[0].quantity
        }
      }
    }
  },
  actions: {
    addNewProduct({ commit }, payload) {
      const product = {
        productName: payload.productName,
        productDescription: payload.productDescription,
        manufacturer: payload.manufacturer,
        price: payload.price,
        quantity: payload.quantity,
      }
      axios.post(`${URL}`, product)
      .then((data) =>{
        let key =  data.id
        commit('createAProduct',{...product,key})
        commit('setSuccess', `${data.data.productName} is added to Products !! Redirecting to Dashboard...` )
      })
      .catch((error) =>{
        commit('setError', error )
      }
      )
    },
    updateProduct({commit}, payload)
    {
      const product =  {
        productName: payload[0].productName,
        productDescription: payload[0].productDescription,
        manufacturer: payload[0].manufacturer,
        price: payload[0].price,
        quantity: payload[0].quantity,
      }
      axios.put(`${URL}/${payload[1]}`,product)
      .then((data)=>{
        commit('updateAProduct', payload)
        commit('setSuccess', `${data.data.productName} is updated successfully` )
      })
      
    },
    addAllProducts( {commit }, payload)
    {
      commit('setAllProducts',payload)
    }
  },
  getters:{
    success (state) {
            return state.success
        },
        error (state) {
            return state.error
        }
  }

})