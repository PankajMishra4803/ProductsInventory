import Vue from 'vue'
import Vuex from 'vuex'
const URL =  "http://localhost:3000/products"
import axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    setAllProducts(state,payload){
      state.products =  payload
    },
    createAProduct(state, payload) {
      axios.post(`${URL}`,payload)
      .then((data) =>{
        console.log(data)
        state.products.push(data)
      })
      .catch((error) =>{
        console.log(error)
      }
      )
    },
    updateAProduct(state,payload) {
      const product =  {
        productName: payload[0].productName,
        productDescription: payload[0].productDescription,
        manufacturer: payload[0].manufacturer,
        price: payload[0].price,
        quantity: payload[0].quantity,
      }
      axios.put(`${URL}/${payload[1]}`,product)
      .then((data)=>{
          console.log(data)
      })
    }
  },
  actions: {
    addNewProduct({ commit }, payload) {
      commit('createAProduct',payload)
    },
    updateProduct({commit}, payload)
    {
      commit('updateAProduct', payload)
    },
    addAllProducts( {commit }, payload)
    {
      commit('setAllProducts',payload)
    }
  }
})