<template>
<section id="foodmap">
    <div class="storeSearch">
        <h1>斗六美食地圖</h1>
        <div class="input-box">
            <input type="text" size="50" ref="site" placeholder="請輸入餐廳名稱" v-model="site">
        </div>
        <div id="map"></div> 
    </div>
    <div v-if="place!=null">
        <div v-if="place.reviews!=null">
            <div class="storeIntroduce">
                <span>餐廳:{{place.name}}</span><br>
                <span>評價:{{place.rating}}顆星</span><button @click="addHandler">加入美食清單</button><br>
                <span>電話:{{place.international_phone_number}}</span>
                <p>營業時間:{{place.opening_hours.weekday_text}}</p>
            </div>
            <div class="comment">
                <h3>評論</h3>
                <div v-for="item in place.reviews" :key="item.author_name">
                    <img  class="comment-img" :src="item.profile_photo_url">
                    <a target="_blank" :href="item.author_url">{{item.author_name}}</a>
                    <p>{{item.text}}</p>
                    <h6>{{item.relative_time_description}}</h6>
                </div>
            </div>
        </div>
    </div>     
    <router-view></router-view>
</section>
</template>

<script>

export default{
    name:'googlemap',
    data(){
        return{
            map:null,
            lat:23.698621698892573,
            lng:120.52715149204452,
            autocomplete:null,
            //places api綁定的搜尋框
            site:'',
            //存確定好的地點資料
            place:null,
            infowindow:null
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.initMap();
            this.resetCenter();
            this.$store.dispatch('findRestaurant')
        })
    },
    methods:{
        //載入google map
        initMap() {
            this.map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: this.lat, lng: this.lng },
                zoom: 15,
                maxZoom: 20,
                minZoom: 3,
                streetViewControl: true,
                mapTypeControl: false
            })
        },
        resetCenter(){
            let options = {
              componentRestrictions: { country: 'tw' }, // 限制在台灣範圍
            }
            this.autocomplete = new google.maps.places.Autocomplete(this.$refs.site, options);
            this.autocomplete.addListener('place_changed', () => {
                this.place = this.autocomplete.getPlace()
                if(this.place.geometry) {
                    this.map.panTo(this.place.geometry.location); // panTo是平滑移動、setCenter是直接改變地圖中心
                }
                // 放置標記
                let marker = new google.maps.Marker({
                  position: this.place.geometry.location,
                  map: this.map
                })

                //訊息窗
                let infowindow = new google.maps.InfoWindow({
                  content: this.place.formatted_address
                })
                infowindow.open(this.map, marker)
                marker.addListener('click',()=>{
                    infowindow.open(this.map, marker)
                })
            })
        },
        async addHandler(){
            this.$store.state.foodList=this.place.name
            this.$store.state.foodListRate=this.place.rating
            this.$store.state.foodListPhone=this.place.international_phone_number
            this.$router.push({path:'/search'})
            await this.$store.dispatch('postNode')
            await this.$store.dispatch('findRestaurant')
        }
    }
}
</script>
<style>
    #map{
        width:45vw;
        height:40vw;
        margin-top: 3vh;
    }
</style>