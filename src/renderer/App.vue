<template lang="pug">
  div#app
    transition(name="fade")
      router-view
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="less">
// https://github.com/iview/iview/blob/2.0/src/styles/custom.less
@import "~iview/src/styles/index.less";
// @import "~leaflet/dist/leaflet.css";
@import "./assets/css/style.css";
// @import "./assets/css/font-awesome.css";
@import "./assets/css/login.css";
@import "./assets/css/mobileSelect.css";
@import "./assets/css/swiper.min.css";
@import "./assets/css/font-awesome.css";

.fade-enter-active {
  animation: fade-in 2s;
  position: absolute;
  width: 100vw;
  height: 100vh;
}
.fade-leave-active {
  animation: fade-in 2s reverse;
  position: absolute;
  width: 100vw;
  height: 100vh;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
body::-webkit-scrollbar {
  display: none;
}
</style>
