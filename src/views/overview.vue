<template>
<div>
    <h1>美食清單</h1>
        <h3>餐廳名稱</h3><h3>聯絡電話</h3>
    <ol>
        <button @click="rateHandler">餐廳評價(由高至低)</button>
        <li v-for="store in this.$store.state.restaurantList" :key="store.id">
            <span>{{store.name}}</span>
            <span>{{store.phone}}</span>
            <button @click="deleteHandler(store.id)">刪除餐廳</button>
        </li>
    </ol>
    <p>{{this.$store.state.restaurantList}}</p>
    <p>{{this.$store.state.foodList}}</p>
    <p v-show="this.$store.state.foodListRate!=null">{{this.$store.state.foodListRate}}顆星</p>
</div>
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
            await this.$store.dispatch('deleteNode',id)
            await this.$store.dispatch('findRestaurant')
        },
        rateHandler(){
            this.$store.state.restaurantList.sort((a,b)=>{
                return b.rate-a.rate
            })
        }
    }
}

</script>