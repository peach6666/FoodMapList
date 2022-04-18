import Vue from "vue";
import Router from "vue-router";
import Index from "./views/index.vue";
import GoogleMap from "./views/googlemap.vue";
import Search from "./views/overview.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: "/map",
      name: "googlemap",
      component: GoogleMap
    },
    {
      path: "/search",
      name: "search",
      component: Search
    }
  ]
});
