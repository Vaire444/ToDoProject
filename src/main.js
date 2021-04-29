import Vue from "vue";
import App from "./App.vue";
import moment from "moment";
import store from "./components/store";

// import "./registerServiceWorker";

Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
