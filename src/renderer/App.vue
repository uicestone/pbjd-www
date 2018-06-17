<template lang="pug">
  div#app
    transition(name="fade")
      router-view
    div(v-if="cacheable" ref="hidden" style="display: none")
      div(v-for="(item, index) in data")
        img(v-if="item.type == 'image'" :src="item.url")
        audio(v-if="item.type == 'audio'" :src="item.url" preload=true)
        video(v-if="item.type == 'video'" :src="item.url" preload=true)
</template>

<script>
import * as request from "./utils/request";

export default {
  name: "app",
  data(){
    return {
      cacheable: true,
      data: [],
      t: null
    }
  },
  methods:{
    goHome(){
      const {meta:{homeName}} = this.$route 
      console.log(homeName)

      if(homeName){
        this.$router.replace({name: homeName})
      }
    }
  },
  async mounted(){
    this.data = await request.getAllResources();
    // 暂时设为5秒后删除隐藏DOM
    setTimeout(() =>{
      this.cacheable = false
      this.data = null
    },5000)

    let events = ["click"," touchstart", "keydown"]

    this.t = setTimeout(() => this.goHome(),3000)
    events.forEach(i => {
      document.addEventListener(i, e => {
        if(this.t){
          clearTimeout(this.t)
        }
        this.t = setTimeout(() => this.goHome(),3000)
      })
    })
  }
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
