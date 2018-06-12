import Vue from "vue";
import axios from "axios";
// import adapter from "webrtc-adapter";
// import socketio from "socket.io-client";
// import VueSocketio from "vue-socket.io";
import iView from "iview";
import $ from "jquery";
import App from "./App";
import router from "./router";
import store from "./store";
import moment from "moment";
import VueAwesomeSwiper from "vue-awesome-swiper";

// import "swiper/dist/css/swiper.css";

Vue.use(VueAwesomeSwiper);

Vue.filter("dt", (val, format) => (val > 10 ? val : "0" + val));
Vue.filter("MM", (val, format) => moment(val).format(format));

// const SocketInstance = socketio("http://localhost:3000");
// Vue.use(VueSocketio, SocketInstance, store);
Vue.use(iView);

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

window.$ = $;

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  store,
  template: "<App/>"
}).$mount("#app");