import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    restaurantList:null,
    foodList:null,
    foodListRate:null,
    foodListPhone:null
  },
  mutations: {
    fillRestaurantList(state,data){
      state.restaurantList=data
    },
  },
  actions: {
    //context是在action叫用mutation的參數
    findRestaurant(context){
      return axios.get('/api').then((res)=>{
        context.commit('fillRestaurantList',res.data)
      })
    },
    postNode(){
      return axios.post('/api',{
        name:this.state.foodList,
        rate:this.state.foodListRate,
        phone:this.state.foodListPhone
      })
    },
    deleteNode(context,id){
      //es6字串模板使用
      return axios.delete(`/api/${id}`)
    }
  }
});
