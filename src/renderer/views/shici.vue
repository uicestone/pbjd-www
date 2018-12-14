<script>
import { handleLoading } from "../utils/utils";
import * as request from "../utils/request";

export default {
  data() {
    return {
      currentSelectPeople: -1,
      peopleList: [],
      musicList: [],
      currentPlayIndex: -1,
      currentTag: 1,
      flowText: [
        "正衣冠，列队有序进入宣誓厅（室）；",
        "主持人宣布仪式开始，奏唱《中华人民共和国国歌》；",
        "观看誓词教育宣传片《看齐》；",
        "主持人介绍领誓人，并简要介绍其先进事迹；",
        "领誓人带领全体党员面向党旗宣誓（有条件的，参加宣誓的党员在“宣誓人”环节依次报名）；",
        "领誓人致共勉词，与全体党员共勉；",
        "奏《国际歌》；",
        "主持人宣布仪式结束。"
      ]
    };
  },
  computed: {
    currentSelectPeopleData() {
      return this.peopleList[this.currentSelectPeople] || {};
    },
    currentPlayer(){
      return this.$refs.audio;
    }
  },
  async mounted() {
    handleLoading();
    this.peopleList = await request.getPosts({
      query: {
        category: "誓词教育",
        limit: 12
      }
    });
    this.musicList = await request.getAttachments({
      query: {
        category: "红色歌曲",
        limit: 12
      }
    });
  },
  methods: {
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
  }
};
</script>

<template>
    <body>
    <div class="main page2" >
      <img src="~@/assets/images/title1_01.png" width="100%">
      <div class="header">
        <a  @click="$router.go(-1)" class="back"><i class="fa fa-chevron-left"></i> 返回</a>
      </div>
      <div class="content">
        <div class="middle">
            <div class="tab-bar">
              <div :class="{curr: currentTag == 1}"  @click="currentTag =1">
                <p><i class="fa fa-list-ul" aria-hidden="true"></i><font>宣誓流程</font></p>
                <img src="~@/assets/images/line.jpg">
              </div>
              <div :class="{curr: currentTag == 2}"  @click="currentTag =2">
                <p><i class="fa fa-user-o" aria-hidden="true"></i><font>领誓人</font></p>
                <img src="~@/assets/images/line.jpg">
              </div>
              <div :class="{curr: currentTag == 3}"  @click="currentTag =3" >
                <p><i class="fa fa-music" aria-hidden="true"></i><font>红色歌曲</font></p>
                <img src="~@/assets/images/line.jpg">
              </div>
            </div>
            
            <div class="list-box">
              <div class="lists">
                <ul v-if="currentTag == 1" class="chunk chunk1">
                  <li v-for="(item, index) in flowText">
                    <span>{{index + 1}}</span>
                    <p>{{item}}</p>
                  </li>
                </ul>
                <div v-if="currentTag == 2" class="chunk chunk2">
                  <div v-for="(item,index) in peopleList" @click="currentSelectPeople = index">
                    <img :src="item.posterUrl" width="100%">
                    <p>{{item.title}}</p>
                  </div>               
                </div>
                  
                  <ul v-if="currentTag == 3"  class="chunk chunk3">
                    <li v-for="(item, index) in musicList" :class="{played: index == currentPlayIndex}" @click="playAudio(index)">
                      <span>{{item.title}}</span>
                      <!-- <audio class="myaudio" :src="item.url" :ref="`audio${index}`" preload="auto" loop="loop"></audio> -->
                      <i :class="{fa: true, 'fa-play-circle-o': currentPlayIndex != index, 'fa-volume-up': currentPlayIndex == index}" aria-hidden="true"></i>                      
                    </li>
                    <audio ref="audio"  style="overflow: hidden"/>
                  </ul>
              </div>
            </div>
          </div>
      </div>
            
            
      <div class="pop" v-if="currentSelectPeople > -1">
        <span class="back" @click="currentSelectPeople = -1" ><i class="fa fa-chevron-left" aria-hidden="true"></i><font>返回</font></span>
            <div class="hint">
            <div class="userIfor">
              <img :src="currentSelectPeopleData.posterUrl">
              <div>
                <p class="nameBox">
                  <font class="name">
                    {{currentSelectPeopleData.title}}
                  </font>
                    <!-- /<font class="sex">女</font> --> -->
                  </p>
                <p class="post" v-html="currentSelectPeopleData.content"></p>
              </div>
            </div>
            <!-- <p class="infor">义勇军进行曲义勇军进行曲义勇军进行曲义勇军进行曲义勇军进行曲义勇军进行曲义勇军进行曲</p> -->
            </div>
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

<style>
</style>


