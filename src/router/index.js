import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta:{
      title:'首页'
    }
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/more",
    name: "more",
    component: () => import("../views/More.vue"),
    meta:{
      title:'更多插画'
    }
  },
  {
    path: "/details",
    name: "details",
    component: () => import("../views/Details.vue"),
    meta:{
      title:''
    }
  },
  {
    path: "/draw",
    name: "draw",
    component: () => import("../views/Draw.vue"),
    meta:{
      title:'自定义抽签'
    }
  },
  {
    path: "/manage",
    name: "manage",
    component: () => import("../views/Manage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
