<template lang="pug">
  div#app
    router-view
    div(v-if="cachingAttachments.length" ref="hidden")
      div.caching-media-indicator 正在缓存媒体资源… 剩余 {{ cachingAttachments.length }} 项
      div.caching-media
        div(v-if="cachingAttachments.length" v-for="(item, index) in cachingAttachments")
          img(v-if="item.type == 'image'" :src="item.url" @load="mediaLoaded(item)")
          audio(v-if="item.type == 'audio'" :src="item.url" preload="auto" @loadeddata="mediaLoaded(item)")
          video(v-if="item.type == 'video'" :src="item.url" preload="auto" @loadeddata="mediaLoaded(item)")
</template>

<script>
import * as request from "./utils/request";

export default {
  name: "app",
  data() {
    return {
      cacheMedia: false,
      cachingAttachments: [],
      goHomeTimeout: null,
      towns: ['安亭镇', '嘉定新城（马陆镇）', '南翔镇', '江桥镇', '徐行镇', '外冈镇', '华亭镇', '嘉定镇街道', '新成路街道', '真新街道', '嘉定工业区', '菊园新区']
    }
  },
  methods:{
    goHome() {
      const {meta: {homeName}} = this.$route 

      if(homeName){
        this.$router.replace({name: homeName})
      }
    },
    mediaLoaded(attachment) {
      this.cachingAttachments = this.cachingAttachments.filter(a => a.url !== attachment.url);
    }
  },
  async mounted(){
    if (this.cacheMedia) {
      this.cachingAttachments = await request.getAllResources();
    }

    setTimeout(() => {
      this.cachingAttachments = [];
    }, 60000)

    const resetGoHomeTimeout = () => {
      if (this.goHomeTimeout) {
        clearTimeout(this.goHomeTimeout);
      }
      this.goHomeTimeout = setTimeout(() => this.goHome(), 300000);
    };

    if (!window.process) {
      
      resetGoHomeTimeout();

      ['click','touchstart', 'keydown', 'scroll'].forEach(i => {
        document.addEventListener(i, e => {
          resetGoHomeTimeout();
        })
      });

      ['scroll'].forEach(i => {
        document.addEventListener(i, e => {
          resetGoHomeTimeout();
        })
      });

    }
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
  animation: fade-in 1s;
  position: absolute;
  width: 100vw;
  height: 100vh;
}
.fade-leave-active {
  animation: fade-in 1s reverse;
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
.caching-media {
  display: none;
}
.caching-media-indicator {
  font-size: 1vw;
  color: grey;
  position: absolute;
  left: 1vw;
  top: 98vh;
}
</style>
