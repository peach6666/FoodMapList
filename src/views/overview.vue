<template>
<section id="list">
    <div class="container">
        <h1>店鋪清單</h1>
        <table class="list-table">
            <thead>
                <tr>
                    <th><h3 class="restaurantInfo">名稱</h3></th>
                    <th><h3 class="restaurantInfo">聯絡電話</h3></th>
                    <th><button  class="restaurantInfo" @click="rateHandler">評價(由高至低)</button></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="store in this.$store.state.restaurantList" :key="store.id">
                    <td><span>{{store.name}}</span></td>
                    <td><span>{{store.phone}}</span></td>
                    <td><span>{{store.rate}}</span></td>
                    <button  class="delete-btn" @click="deleteHandler(store.id)">刪除</button>
                </tr>
            </tbody>
        </table>
        
        <!--<p>{{this.$store.state.restaurantList}}</p>-->
        <!--<p>{{this.$store.state.foodList}}</p>-->
        <!--<p v-show="this.$store.state.foodListRate!=null">{{this.$store.state.foodListRate}}顆星</p>-->
    </div>
</section>
</template>
<script>

export default{
    name:"search",
    data(){
        return{
            storeInf:this.$store.state.restaurantList
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.$store.dispatch('findRestaurant')
        })
    },
    methods:{
        async deleteHandler(id){
            //刪除資料後再重新call新資料到前端
            await this.$store.dispatch('deleteNode',id)
            await this.$store.dispatch('findRestaurant')
        },
        rateHandler(){
            //評論依星數由高至低排序
            this.$store.state.restaurantList.sort((a,b)=>{
                return b.rate-a.rate
            })
        }
    }
}

</script>