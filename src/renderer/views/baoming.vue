<script>
import { handleLoading } from "../utils/utils";
import * as request from "../utils/request";

export default {
  data() {
    return {
      currentSelect: -1,
      attending: -1,
      attendModal: false,
      attendInfo: {
        name: '',
        phone: ''
      },
      shujiList: []
    };
  },
  computed: {
    currentSelectData() {
      return this.shujiList[this.currentSelect] || {};
    }
  },
  methods: {
    back() {
      if (this.attending > -1) {
        this.attending = -1;
      } else if (this.currentSelect > -1) {
        this.currentSelect = -1;
      } else {
        this.$router.go(-1);
      }
    },
    attend(index) {
      this.attending = index;
    },
    submit() {
      this.attendModal = true
    },
    clearAttendForm() {
      this.attendModal = false;
      this.attendInfo = {name: '', phone: ''}
    }
  },
  async mounted() {
    handleLoading();
    this.shujiList = await request.getPosts({
      query: {
        category: "书记工作室",
        limit: 12
      }
    });
  }
};
</script>


<template>
    <body>
    <div class="main page10" :class="{fixed:currentSelect>-1}">
      <div class="header">
        <a @click.prevent="back()" class="fl back"><i class="fa fa-chevron-left"></i> 返回</a>
        <span><img src="~@/assets/images/index/icon1.png"/>活动报名</span>
      </div>
      <div class="list">
        <ul>
          <li v-for="(item, index) in shujiList" @click="currentSelect = index">
            <div class="imgDiv">
              <img :src="item.posterUrl"/>
            </div>
            <div class="textDiv">
              {{item.title.trim()}}
            </div>
          </li>
          <!-- <li>
            <div class="imgDiv">
              <img src="~@/assets/images/img.png"/>
            </div>
            <div class="textDiv">
              唐祝平书记工作室
            </div>
          </li>
          <li>
            <div class="imgDiv">
              <img src="~@/assets/images/img.png"/>
            </div>
            <div class="textDiv">
              沈彪书记工作室
            </div>
          </li>
          <li>
            <div class="imgDiv">
              <img src="~@/assets/images/img.png"/>
            </div>
            <div class="textDiv">
              陈丽书记工作室
            </div>
          </li>
          
          <li>
            <div class="imgDiv">
              <img src="~@/assets/images/img.png"/>
            </div>
            <div class="textDiv">
              赵宪珍书记工作室
            </div>
          </li>
          
          <li>
            <div class="imgDiv">
              <img src="~@/assets/images/img.png"/>
            </div>
            <div class="textDiv">
              王良悦书记工作室
            </div>
          </li>
          
          <li>
            <div class="imgDiv">
              <img src="~@/assets/images/img.png"/>
            </div>
            <div class="textDiv">
              顾月兰书记工作室
            </div>
          </li>
           -->
        </ul>
      </div>
      <!--弹层-->
      <div class="pop" v-if="currentSelect > -1">
          <!--<span class="back"><i class="fa fa-chevron-left" aria-hidden="true"></i><font>返回</font></span>-->
          <div class="hint">
            <div class="name">{{currentSelectData.title}}</div>
            <p class="infor" v-html="currentSelectData.content"></p>
          </div>
          <button @click="attend(currentSelect)" class="attend">报名</button>
      </div>
      <div class="pop" v-if="attending > -1">
          <!--<span class="back"><i class="fa fa-chevron-left" aria-hidden="true"></i><font>返回</font></span>-->
          <div class="attend-form">
            <div class="item">
              <label>联系人</label>
              <input v-model="attendInfo.name" placeholder="姓名" />
            </div>
            <div class="item">
              <label>联系电话</label>
              <input v-model="attendInfo.phone" placeholder="电话" />
            </div>
          </div>
          <button @click="submit" class="attend">提交</button>
      </div>
      <div class="pop modal" v-if="attendModal">
        <div class="message" @click="clearAttendForm();back()">您已提交成功，正在审核中，工作人员会尽快与您联系。</div>
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
