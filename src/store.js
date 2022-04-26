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
    //把資料填入state
    fillRestaurantList(state,data){
      state.restaurantList=data
    },
  },
  actions: {
    //context是在action叫用mutation的參數
    findRestaurant(context){
      //call Node那邊api到前端
      return axios.get('/api').then((res)=>{
        context.commit('fillRestaurantList',res.data)
      })
    },
    postNode(){
      //把前端資料POST到Node資料
      return axios.post('/api',{
        name:this.state.foodList,
        rate:this.state.foodListRate,
        phone:this.state.foodListPhone
      })
    },
    deleteNode(context,id){
      //es6字串模板使用，刪除相應資料
      return axios.delete(`/api/${id}`)
    }
  }
});
