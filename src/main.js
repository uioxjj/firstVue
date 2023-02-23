import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import cssDoodle from "css-doodle";
import gsap from "gsap";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import axios from "axios";


axios.defaults.baseURL='https://127.0.0.1:8080/bms/management'

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app
  .use(store)
  .use(router)
  .use(ElementPlus)
  .use(cssDoodle)
  .use(gsap)
  .mount("#app");

  app.config.globalProperties.$axios = axios

  router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title + '~ ~ 米拉'
    }
    next()
  })
