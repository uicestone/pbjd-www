<script>
import { handleLoading } from "../utils/utils";
import * as request from "../utils/request";
import moment from "moment";
let currentDate = moment().format("YYYY-MM");

import Calendar from "vue-calendar-component";
import VueScrollTo from "vue-scrollto";

export default {
  components: {
    Calendar
  },
  data() {
  return {
    currentSelect: -1,
    dataList: [],
    eventDates: [],
    currentDate: ""
  };
  },
  computed: {
    currentSelectData() {
      return this.dataList[this.currentSelect] || {};
    }
  },
  async mounted() {
    handleLoading();
      this.fetchDate({ date: currentDate });
    },
    methods: {
      changeMonth(data) {
        const date = moment(data).format("YYYY-MM");
        this.fetchDate({ date });
      },
      choseDay(data) {
        const date = moment(data).format('YYYY-MM-DD');
        VueScrollTo.scrollTo(`#date-${date}`, {offset:() => {
          return -182 / 1080 * window.innerWidth
        }});
      },
      async fetchDate({ date }) {
        this.currentDate = date;
        let cachedMonthMenu = await request.getPosts({
          query: {
            category: "月度菜单",
            limit: 12,
            month: date
          }
        });
        this.eventDates = [];
        this.dataList = cachedMonthMenu.sort((a, b) => {
          if (!this.eventDates.includes(b.date)) {
            this.eventDates.push(b.date);
          }
          return moment(a.date) < moment(b.date) ? -1 : 1;
        });
      }
  }
};
</script>

<template>
<div class="main view-caidan">
  <div class="header">
    <a @click="$router.go(-1)" href="###" class="fl back"><i class="fa fa-chevron-left"></i> 返回</a>
    <span><img src="~@/assets/images/index/caidan.png"/>月度菜单</span>
  </div>
  <div class="list">
    <div class="list-text">
      <!-- <div class="text-top">
        <span class="fl">6月</span>
        <span class="fr">June</span>
      </div> -->
      <!-- <img src="~@/assets/images/cal.png"/> -->
      <Calendar :markDate="eventDates" @changeMonth="changeMonth" @choseDay="choseDay"></Calendar>
      <!-- <div class="list-page">
        <ul>
          <li><img src="~@/assets/images/index/left-arrow.png"/></li>
          <li class="active"><span></span></li>
          <li><span></span></li>
          <li><span></span></li>
          <li><span></span></li>
          <li><img src="~@/assets/images/index/right-arrow.png"/></li>
        </ul>
      </div> -->
    </div>
    <div class="content-container">
      <div v-bind:id="'date-' + item.date" v-for="(item,index) in dataList"  class="content" :key="index">
        <div class="con-top">
          <div class="date"><span>{{item.date | MM("M.D")}}</span></div>
          <div class="title">
            <img src="~@/assets/images/index/icon2.png"/>
            {{item.title}}
          </div>
          <!-- <h3>“联西的六靠精神”书记工作室导师讲堂</h3> -->
        </div>
        <div class="activity" v-html="item.content"></div>
        <!-- <div class="activity">
          <div class="activity1">
            <div class="title">
              <span><i class="fa fa-file-text-o"></i></span>活动简介
            </div>
            <p>
              邀请安亭镇书记工作室导师、联西村党总支书记唐祝平为辖区青年党员、后备干部
              生动讲述联西村三十年的发展历程以及标志性事件、人物 、故事等，通过参观党建服务站以及交流分享
              ，让党员更直观的了解改革开放以来新农村发生的巨大变化和历史缩影，激励党员积极发挥先锋模范作用。
            </p>
          </div>
          <div class="activity2">
            <div class="title">
              <span><i class="fa fa-clock-o"></i></span>活动时间
            </div>
            <p>
              5月18日 13:30-15:00
            </p>
          </div>
          <div class="activity3">
            <div class="title">
              <span><i class="fa fa-map-marker"></i></span>活动地点
            </div>
            <p>
              联西村党建服务站（联西路28号）
            </p>
          </div>
          <div class="activity4">
            <div class="title">
              <span><i class="fa fa-phone"></i></span>联系方式
            </div>
            <p>
              陈艳：59561186
            </p>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</div>
</template>

<style lang="stylus">
.view-caidan
  .header
    height 15vw
    background #d5ac50
    line-height 15vw
    color #fff
    font-size 5.7vw
    text-align center
    padding 0 5vw
    position fixed
    left 0
    width 100vw
    z-index 1
    a
      font-size 4vw
      color #fff
      position absolute
      left 5vw
      i
        font-size 5vw
        top 0.5vw
        position relative
    img
      display inline-block
      width 7vw
      position relative
      top 1vw
      margin-right 2vw
  .list
    .list-text
      padding 15vw 2vw 0
      z-index 1
      background rgba(242, 242, 243, 0.9)
      .text-top
        font-size 6vw
        color #d5ac50
        padding 2vw 0
        overflow hidden
      & > img
        width 100%
      & > ul
        & > li
          padding 3vw 2vw
          background #e6e6e6
          height 9vw
          line-height 9vw
          padding 0 2vw
          color #3e3e3f
          font-size 3vw
          margin-bottom 3vw
          span
            font-size 2.4vw
            position relative
            top 03vw
            color #000
    .content-container
      padding 0 2.7vw
      background-color #f3f3f4
    .content
      border 1px solid #ccc
      background #fff
      position relative
      margin 2vw 0
      &:first-child
        margin-top 0
      &:last-child
        margin-bottom 0
  .list-page
    text-align center
    line-height 0
    margin-bottom 5vw
    padding-top 3vw
    ul
      overflow hidden
      display inline-block
      li
        float left
        height 2.9vw
        margin-left 2vw
        img
          width 2.9vw
        span
          width 1vw
          height 1vw
          display block
          background #d2d3d3
          border-radius 50%
          position relative
          top 12vw
        &.active
          span
            background #690000
  .con-top
    .date
      position absolute
      top 0
      left 0
      width 0
      height 0
      border-top 13.5vw solid #d5ac50
      border-right 13.5vw solid transparent
      span
        font-size 2.7vw
        color #fff
        position absolute
        top -10vw
        left 2.8vw
        transform rotate(-45deg)
    .title
      background #d5ac50
      height 4.5vw
      line-height 4.5vw
      font-size 2.3vw
      color #fff
      width 34.5vw
      text-align center
      margin 0 auto
      margin-top 2.5vw
      margin-bottom 1.5vw
      img
        display inline-block
        width 3vw
        position relative
        top 0.5vw
    h3
      font-size 4vw
      color #4d4d4e
      text-align center
  .activity
    padding 3vw 9vw
    h1
      font-size 4vw
      color #4d4d4e
      text-align center
      line-height 10vw
    h2
      font-size 2.3vw
      color #d5ac50
    .title
      font-size 2.3vw
      color #d5ac50
      span
        display inline-block
        text-align center
        line-height 3.5vw
        width 3.5vw
        height 3.5vw
        border-radius 0.5vw
        background #d5ac50
        color #fff
        margin-right 1vw
    p
      font-size 2.3vw
      color #515152
      text-indent 2em
      text-align justify
      border-bottom 1px solid #d5ac50
      margin 1vw 0
      padding 1vw 0
    & > div
      padding-top 1vw
      padding-bottom 1vw
      border-bottom 1px solid #d5ac50
      &.activity4
        border 0
.wh_container
  max-width none !important
.wh_top_changge
  height 10vw !important
  align-items center !important
.wh_top_changge li
  color #d5ac50 !important
  font-size 5vw !important
.wh_jiantou2
  border-top 2px solid #666 !important
  border-right 2px solid #666 !important
  width 2.5vw !important
  height 2.5vw !important
.wh_jiantou1
  border-top 2px solid #666 !important
  border-left 2px solid #666 !important
  width 2.5vw !important
  height 2.5vw !important
.wh_content_li
  font-size 5vw !important
.wh_content_all
  background-color transparent !important
.wh_top_tag, .wh_item_date
  color #666 !important
  border solid 0.2vw #ccc !important
  background-color #fff !important
  width 12vw !important
  height 12vw !important
.wh_content
  margin-left -0.2vw
  padding 0 !important
  justify-content space-between !important
.wh_content_item
  width 12% !important
  margin 0.85vw !important
  height 12vw !important
  font-size 5vw !important
.wh_content_item .wh_isToday
  background-color white !important
  border-radius 0 !important
  color #d5ac50 !important
.wh_content_item .wh_chose_day
  background white !important
  border-radius 0 !important
.wh_content_item .wh_isMark
  border-radius 0 !important
  background #d5ac50 !important
  color: white !important
</style>
