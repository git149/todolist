import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

const user = JSON.parse(localStorage.getItem('user'));
if (user) {
  store.commit('setUser', user);
}
// // 在应用启动时加载用户信息
// const storedUser = localStorage.getItem('user');
// if (storedUser) {
//   store.commit('setUser', JSON.parse(storedUser));
// }