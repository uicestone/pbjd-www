<script>
  import Datepicker from 'vuejs-datepicker';
  import {zh} from 'vuejs-datepicker/dist/locale';
  import { handleLoading } from "../utils/utils";
  import * as request from "../utils/request";
  
  export default {
    components: {
      Datepicker
    },
    data() {
      return {
        showing: 'menu',
        showed: [],
        form: {},
        zh,
        submitModal: false,
        musicList: [],
        currentPlayIndex: -1,
      };
    },
    computed: {
      currentPlayer(){
        return this.$refs.audio;
      }
    },
    methods: {
      submit() {
        this.submitModal = true;
      },
      clearForm() {
        this.form = {};
      },
      show(layer) {
        if (this.showing) {
          this.showed.push(this.showing);
        }
        this.showing = layer;
      },
      back() {
        if (this.showed.length) {
          this.showing = this.showed.pop();
        } else {
          this.$router.back();
        }
      },
      playAudio(index) {
        if (index == this.currentPlayIndex && !this.currentPlayer.paused) {
          this.currentPlayer.pause();
          return;
        }
        this.currentPlayIndex = index;
        let data = this.musicList[index];
        this.currentPlayer.src = data.url;
        this.currentPlayer.play();
      }
    },
    async mounted() {
      handleLoading();
      this.musicList = await request.getAttachments({
        query: {
          category: "红色歌曲",
          limit: 12
        }
      });
    }
  }
</script>
<template>
  <body class="geren-view">
    <div class="main page-yuyue">
      <div class="header">
        <a @click.prevent="back()" class="fl back"><i class="fa fa-chevron-left"></i> 返回</a>
        <b><img src="~@/assets/images/index/icon9.png"/>活动预约</b>
      </div>
      <div class="content geren-menu" v-if="showing=='menu'">
        <ul class="dangyuan-info">
          <li>王光军</li>
          <li>单位</li>
          <li>嘉定区党建服务中心</li>
        </ul>
        <div class="item" @click="show('my-yuyue')"><i class="fa fa-map-marker"></i> 我的活动预定</div>
        <div class="item" @click="show('my-speech')"><i class="fa fa-volume-up"></i> 我的党建声音</div>
        <div class="item" @click="show('signin')"><i class="fa fa-check-circle-o"></i> 党员签到</div>
      </div>
      <div class="content geren-menu my-yuyue-list" v-if="showing=='my-yuyue'">
        <h2>活动预定</h2>
        <div class="item">
          <ul class="info">
            <li>参观党建服务中心</li>
            <li>XXXXXXXX单位</li>
            <li>2018.10.1 13:00~14:00</li>
            <li>20人</li>
          </ul>
          <span class="status">待审核</span>
        </div>
        <div class="item">
          <ul class="info">
            <li>参观党建服务中心</li>
            <li>XXXXXXXX单位</li>
            <li>2018.10.1 13:00~14:00</li>
            <li>20人</li>
          </ul>
          <span class="status">待审核</span>
        </div>
      </div>
      <div class="content geren-menu my-speech" v-if="showing=='my-speech'">
        <h2>我的党建声音</h2>
        <ul class="chunk list">
          <li v-for="(item, index) in musicList" :class="{played: index == currentPlayIndex}" @click="playAudio(index)">
            <span>{{item.title}}</span>
            <!-- <audio class="myaudio" :src="item.url" :ref="`audio${index}`" preload="auto" loop="loop"></audio> -->
            <i :class="{fa: true, 'fa-play-circle-o': currentPlayIndex != index, 'fa-volume-up': currentPlayIndex == index}" aria-hidden="true"></i>                      
          </li>
          <audio ref="audio"  style="overflow: hidden"/>
        </ul>
      </div>
    </div>
    <!--等待-->
    <div class="pre_load" >
      <div class="wrapper">
        <div class="inner">
          <span>L</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
        </div>
      </div>
    </div>
  </body>
</template>

<style lang="less">
.geren-view {
  .header {
    background: #49a96f;
  }
  .content {
    padding: 0.7rem;
    height: calc(100vh - 1.6rem);
    overflow-y: auto;
    padding-bottom: 1.5rem !important;
    img {
      width: 100%;
    }
    h2 {
      color: #888;
      font-size: 0.5rem;
      text-align: center;
      margin-top: -0.3rem;
      font-weight: normal;
      margin-bottom: 0.15rem;
    }
  }
  .geren-menu {
    .dangyuan-info {
      margin-top: -0.2rem;
      margin-bottom: 0.4rem;
      li {
        font-size: 0.4rem;
        font-weight: bold;
      }
    }
    .item {
      background: #edeeed;
      color: #999;
      padding: 0.5rem 0.7rem;
      margin-bottom: 0.5rem;
      font-size: 0.65rem;
      font-weight: bold;
      i {
        color: #49a96f;
        font-size: 1rem;
        vertical-align: middle;
        margin-right: 0.3rem;
        width: 0.8rem;
        text-align: center; 
      }
    }
  }
  .my-yuyue-list {
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .info {
        font-size: 0.45rem;
        color: #686868;
        line-height: 1.25;
      }
      .status {
        font-size: 0.4rem;
      }
    }
  }
  .btn-block {
    margin: 0.2rem auto 0;
    display: block;
    left: 0.7rem;
    right: 0.7rem;
    width: calc(100% - 1.4rem);
    bottom: 0.2rem;
    border: none;
    height: 1.3rem;
    color: white;
    font-size: 0.55rem;
    font-weight: bold;
    line-height: 1;
    border-radius: 0.2rem;
    outline: none;
    position: fixed;
  }
  .form {
    background: #f7f8f8;
    padding: .6rem;
    .item {
      border: #ddd 1px solid;
      padding: 0.3rem;
      background: white;
      font-size: 0.45rem;
      margin-bottom: 0.25rem;
      min-height: 1.4rem;
    }
    label {
      font-weight: bold;
      margin-right: 0.3rem;
      width: 33%;
      display: inline-block;
      text-align: center;
    }
    ::placeholder {
      color: #c8c8c8;
    }
    select {
      outline: none;
      margin-left: -3px;
      font-family: inherit;
      width: 62%;
    }
    textarea {
      outline: none;
      width: 62%;
    }
    .vdp-datepicker {
      display: inline-block;
    }
    .vdp-datepicker__calendar {
      left: -2.2rem !important;
    }
    .modal {
      background: rgba(127, 127, 127, 0.5);
      position: absolute;
      top: 0;
      height: 100vh;
      left: 0;
      right: 0;
    }

    .modal .message {
      position: absolute;
      top: 50%;
      height: 2.7rem;
      margin-top: -2rem;
      left: 5vw;
      width: 90vw;
      padding: 0.5rem;
      font-size: 0.65rem;
      color: white;
      font-weight: bold;
      border-radius: 0.4rem;
      text-align: center;
      line-height: 1.3;
    }
  }
  .my-speech .list {
    width: 100%;
    height: auto;
    padding: 0.5rem;
    padding-top: 0.1rem;
  }
  .my-speech .list li {
    width: 100%;
    height: 1rem;
    color: #cccccb;
    font-size: 0.35rem;
    font-weight: bold;
    background: #cccccb;
    color: #3c3c3d;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.15rem;
    padding: 0 0.5rem;
  }
  .my-speech .list i {
    font-size: 0.5rem;
  }
  .my-speech .list .played {
    color: #fff;
    background: #49a96f;
  }
  .orange {
    background-color: #e79b32;
  }
  .red {
    background-color: #952320;
  }
  .blue {
    background-color: #51a7dc;
  }
  .green {
    background-color: #84c5cf;
  }
}
</style>