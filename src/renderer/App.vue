<template lang="pug">
  div#app
    div
      div.button-back-debug(@click="$router.go(-1)") 返回
    router-view
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="less">
// https://github.com/iview/iview/blob/2.0/src/styles/custom.less
// @import "~iview/src/styles/index.less";
@import "~leaflet/dist/leaflet.css";
@import "./assets/css/style.css";
// @import "./assets/css/font-awesome.css";
@import "./assets/css/login.css";
@import "./assets/css/mobileSelect.css";
@import "./assets/css/swiper.min.css";
@import "./assets/css/font-awesome.css";

// @link-color: #000000;
// html {
//   font-size: 10px;
// }
// input,
// textarea,
// select {
//   -webkit-appearance: none;
//   border: none;
//   outline: none;
// }
// li {
//   list-style-type: none;
// }
.button-back-debug {
  position: absolute;
  font-size: 0.5rem;
  z-index: 100;
}
</style>
