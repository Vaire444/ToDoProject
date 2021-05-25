import Vue from "vue";
import App from "./App.vue";
import moment from "moment";
import store from "../store";
import './registerServiceWorker'
import router from './routes/router';

Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
