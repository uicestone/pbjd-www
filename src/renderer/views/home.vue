<template>
  <div class="home">
    <div class="banner">
      <div class="top-text">
        <div class="datetime">
          <div class="date">{{date.ll}} {{date.dddd}}</div>
          <div class="time">
            <span class="hm">{{date.L}}</span><span class="hm blink">:</span>
            <span class="hm">{{date.T}} </span>  
            <span class="a">{{date.A}}</span>
          </div>
        </div>
        <div class="city-weather">
          <div class="left">
            <div class="city">昆山</div>
            <div class="weather">
              <span class="text">{{weather.text}}</span>
              <span class="temperature">{{weather.temperature}}℃</span>
            </div>
          </div>
          <img :src="weather.icon" class="weather-icon" />                          
        </div>
      </div>
      <div class="banner-title"></div>
    </div>
    <div class="menu">
      <div class="baodao" @click="$router.push('baodao')">
        <div class="content">
          <div class="title">报到人数</div>
          <div>
            <span class="count">{{ signedInMemberCount }}</span>
            <span class="unit">人</span>
          </div>
        </div>
      </div>
      <div class="dongtai col-2" @click="$router.push('dongtai')">党建动态</div>
      <div class="caidan col-2" @click="$router.push('caidan')">
        <div class="content">
          <div class="month-cn">{{ date.M }}<span class="unit">月</span></div>
          <div class="month-en">{{ date.MMMM }}</div>
          <div class="title">月度菜单</div>
        </div>
      </div>
      <div class="fengcai" @click="$router.push('fengcai')">风采展示</div>
      <div class="shici" @click="$router.push('shici')">誓词教育</div>
      <div class="zhuti" @click="$router.push('dangri')">主题党日</div>
      <div class="daolan" @click="$router.push('daolan')">场馆导览</div>
      <div class="fuwu" @click="$router.push('fuwu')">三级党群<br>服务体系</div>
      <div class="yuyue" @click="$router.push('baoming')">活动预约</div>
      <div class="dangxiao" @click="$router.push('dangxiao')">五点半党校</div>
    </div>
    <div class="contact">
      <h3>联系我们</h3>
      <p><span><i class="fa fa-map-marker"></i>昆山经济技术开发区党群服务中心：</span>昆山开发区南浜路兵希文体中心</p>
      <p><span><i class="fa fa-phone"></i>联系电话：</span>0512-50138517、50138520</p>
    </div>
  </div>
</template>

<script>
  import * as request from "../utils/request";
  import moment from "moment";
  let currentDate = moment().format("YYYY-MM");
  moment.locale("zh-cn");
  moment.updateLocale("zh-cn", {
    meridiem: hour => (hour < 12 ? "AM" : "PM")
  });

  export default {
    data() {
      return {
        weather: {
          text: '',
          temperature: '',
          icon: ''
        },
        date: {},
        monthMenu: [],
        currentMonth: moment().month() + 1,
        signedInMemberCount: null
      };
    },
    computed: {
      selectedStatusData() {
        return this.partyStatusList[this.selectedStatus] || {};
      }
    },
    methods: {
      goToSignIn() {
        if (window && window.process && window.process.type) {
          this.qrcode = true;
        } else {
          this.$router.push('/baodao')
        }
      },
      updateDateTime() {
        this.date = {
          ll: moment().format('LL'),
          dddd: moment().format('dddd'),
          L: moment().format('HH'),
          T: moment().format('mm'),
          A: moment().format('A'),
          M: moment().format('M'),
        };
        moment.locale('en');
        this.date.MMMM = moment().format('MMMM');
        moment.locale("zh-cn");
      }
    },
    async mounted() {
      this.weather = await request.getWeather();
      setInterval(async () => {
        this.weather = await request.getWeather();
      }, 300000);

      const getSignedInMemberCount = async () => {
        const { count = 0 } = await request.getSignedInMemberCount();
        this.signedInMemberCount = count;
      };
      getSignedInMemberCount();
      setInterval(getSignedInMemberCount, 10000);

      this.updateDateTime();
      setInterval(() => {
        this.updateDateTime();
      }, 1000);
    }
  };
</script>

<style lang="less">
  .banner {
    height: 44.4vw;
    background: url('~@/assets/images/index/banner.jpg') top center;
    background-size: 100%;
    .banner-title {
      height: 15vw;
      background: url('~@/assets/images/index/banner-title.png') 85% center no-repeat;
      background-size: 65%;
    }
  }

  .top-text {
    display: flex;
    justify-content: space-between;
    padding: 3vw;
    font-size: 2vw;
    font-weight: bold;
    .time {
      font-size: 5vw;
      font-weight: normal;
      .a {
        font-size: 1.5vw;
      }
    }
    .city-weather {
      text-align: right;
      .left {
        display: inline-block;
        .weather {
          font-size: 3.5vw;
          margin-top: 1vw;
        }
      }
      .weather-icon {
        float: right;
        display: inline-block;
        margin-top: 2vw;
        margin-left: 3vw;
        width: 5.5vw;
      }
    }
  }

  .menu {
    display: flex;
    flex-wrap: wrap;
    > div {
      background-size: 100%;
      width: 33.333vw;
      height: 33.333vw;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      font-size: 4vw;
      font-weight: bold;
      color: #fff;
      padding: 2vw;
      &.col-2 {
        width: 66.667vw;
      }
    }
    .baodao {
      background-image: url('~@/assets/images/index/baodao.png');
      .content {
        line-height: 1.2;
        text-align: right;
        .count {
          font-size: 7vw;
          font-weight: normal;
        }
        .unit {
          font-size: 3vw;
        }
      }
    }
    .caidan {
      background-image: url('~@/assets/images/index/caidan.png');
      .content {
        text-align: center;
        line-height: 7vw;
        padding-right: 3vw;
        .month-cn {
          font-size: 14vw;
          .unit {
            font-size: 4vw;
          }
        }
        .month-en {
          font-size: 4vw;
          font-weight: normal;
        }
      }
    }
    .fuwu {
      background-image: url('~@/assets/images/index/fuwu.png');
    }
    .dangxiao {
      background-image: url('~@/assets/images/index/dangxiao.png');
    }
    .daolan {
      background-image: url('~@/assets/images/index/daolan.png');
    }
    .dongtai {
      background-image: url('~@/assets/images/index/dongtai.png');
    }
    .fengcai {
      background-image: url('~@/assets/images/index/fengcai.png');
    }
    .shici {
      background-image: url('~@/assets/images/index/shici.png');
    }
    .yuyue {
      background-image: url('~@/assets/images/index/yuyue.png');
    }
    .zhuti {
      background-image: url('~@/assets/images/index/zhuti.png');
    }
  }

  .contact {
    font-size: 2.3vw;
    color: #333;
    padding: 1.5vw 3vw;
    line-height: 4vw;
  }

  .contact p {
    padding-left: 1.5vw;
    font-size: 2vw;
    font-weight: bold;
  }

  .contact p i {
    font-size: 2.5vw;
    margin-right: 1vw;
    width: 2.5vw;
    text-align: center;
  }

  .contact p span {
    color: #888;
  }

  .blink {
    -webkit-animation: 1s linear infinite condemned_blink_effect;
    animation: 1s linear infinite condemned_blink_effect;
  }

  @-webkit-keyframes condemned_blink_effect {
    0% {
      visibility: hidden;
    }
    50% {
      visibility: hidden;
    }
    100% {
      visibility: visible;
    }
  }

  @keyframes condemned_blink_effect {
    0% {
      visibility: hidden;
    }
    50% {
      visibility: hidden;
    }
    100% {
      visibility: visible;
    }
  }
</style>
