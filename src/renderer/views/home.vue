<template>
  <body>
		<div class="main page3">
			<div class="topDiv">
				<img src="~@/assets/images/index/banner.png" width="100%">
				<div class="top-text">
					<div class="fl dateDiv">
						<div class="ymd">{{date.ll}} {{date.dddd}}</div>
						<div class="time">
							<span class="hm">{{date.L}}</span>  
							<span class="hm blink" style="margin-right: 2px ">:</span>
							<span class="hm">{{date.T}} </span>  
							{{date.A}}
						</div>
					</div>
					<div class="fr city-weather" style="display: flex; align-items: center">
						<div>
							<div class="city">嘉定，上海</div>
							<div class="weather">
								<span class="text">{{weather.text}}</span>
								<span class="wendu">{{weather.temperature}}℃</span>
							</div>
						</div>
						<img :src="weather.icon" style="width: 100px; object-fit: contain"/>													
					</div>
				</div>
			</div>
			<div class="main-con">
				<div class="main-con1">
					<div class="fl leftDiv">
						<div class="baodao" @click="showQrcode">
							<div class="num">
								报到人数<span class="f69">441</span><span class="f35">人</span>
							</div>
						</div>
						<div class="shici" @click="$router.push('/shici')">
							<div class="bgc">
								<img src="~@/assets/images/index/shici.png"/>
								<span>誓词教育</span>
							</div>
						</div>
					</div>
					<div class="fr rightDiv">
						<div class="dt-title">
							<div class="fl"><img src="~@/assets/images/index/dt-icon.png"/><span>党建动态</span></div>
							<!-- <div class="dt-page fr">
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
						<div class="dt-list">
							<ul>
								<a v-for="(item,index) in partyStatusList" @click="selectedStatus = index" :key="index">
									<li class="">
										<span class="fl">{{item.title}}</span>
										<span class="fr">{{item.createdAt | MM("YYYY-MM-DD") }} <i class="fa fa-angle-right"></i></span>
									</li>
								</a>
							</ul>
						</div>
					</div>
				</div>
				<div class="main-con2">
					<div class="fl leftDiv">
						<div class="gyx">
							<div class="gyx-title" @click="$router.push('/gongyi')"><img src="~@/assets/images/index/xin.png"/><span>公益行</span></div>
							<div class="lunbo">
								<!-- <img src="~@/assets/images/index/gyx-img.jpg"/> -->
								<swiper :options="swiperOption" ref="GongyixingSwiper" @slideChange="onSlideChange('GongyixingSwiper')">
									<swiper-slide v-for="(item,index) in gonyixingList" :key="index">
										<img class="img" :src="item.url" width="100%" height="100%" @click="$router.push('/gongyi')">
									</swiper-slide>
								</swiper>
								<div class="lb-page">
									<ul>
										<li><img src="~@/assets/images/index/left-arrow1.png" @click="prevSwiper('GongyixingSwiper')"/></li>
											<li v-for="(item,index) in gonyixingList" :class="{active: currenGongyixingIndex == index}" :key="index"><span></span></li>										
										<li><img src="~@/assets/images/index/right-arrow1.png" @click="nextSwiper('GongyixingSwiper')"/></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div class="fr caidan">
						<div class="fl yuedu">
							<div class="yue-top">
								<img src="~@/assets/images/index/caidan.png"/><span>月度菜单</span>
							</div>
							<div class="yue-num">
								<span class="f101">6</span>月
							</div>
							<!-- <div class="yue-btn">
								<span class="first"><i class="fa fa-chevron-left"></i>上月</span>
								<span class="second">下月<i class="fa fa-chevron-right"></i></span>		
							</div> -->
						</div>
						<div class="fl cd-list">
							<ul @click="$router.push('/caidan')">
								<li v-for="(item, index) in monthMenu" :key="index">
									<div class="fl index">{{index+ 1}}</div>
									<div class="fl text">
										<div class="title">{{item.title}}</div>
										<div class="tag-time">
											<span class="fl">{{item.town}}</span>
											<span class="fr">{{item.date}}</span>
										</div>
									</div>
								</li>
							</ul>
							<div class="xiaIcon">
								<!-- <i class="fa fa-chevron-down"></i> -->
							</div>
							
						</div>
					</div>
				</div>
				<div class="main-con3">
					<ul>
						<router-link to="/shuji">
							<li class="li1">
								<div>
									<img src="~@/assets/images/index/icon1.png"/>
									<span>书记工作室</span>
								</div>
							</li>
						</router-link>
						<router-link to="/dangri">
							<li class="li2">
								<div>
									<img src="~@/assets/images/index/icon2.png"/>
									<span>主题党日</span>
								</div>
							</li>
						</router-link>
						<a @click="wating">
							<li class="li3">
								<div>
									<img src="~@/assets/images/index/icon3.png"/>
									<span>两学一做</span>
								</div>
							</li>
						</a>
						<router-link to="/dangdaibiao">
							<li class="li4">
								<div>
									<img src="~@/assets/images/index/icon4.png"/>
									<span>党代表工作室</span>
								</div>
							</li>
						</router-link>
						<router-link to="/shequ">
							<li class="li5">
								<div>
									<img src="~@/assets/images/index/icon5.png"/>
									<span>社区党校</span>
								</div>
							</li>
						</router-link>
						<router-link to="/fengcai">
							<li class="li6">
								<div>
									<img src="~@/assets/images/index/icon6.png"/>
									<span>风采展示</span>
								</div>
							</li>
						</router-link>
					</ul>
					<div class="text">
						嘉定区党建服务中心
					</div>
				</div>
				<Modal
					v-model="qrcode"
					class-name="vertical-center-modal">
					<img src="~@/assets/images/qrcode.jpg" width="100%" height="100%"/>
			</Modal>
			</div>

			<div class="pop" v-if="selectedStatus > -1">
				<span class="back" @click="selectedStatus = -1"><i class="fa fa-chevron-left" aria-hidden="true"></i><font>返回</font></span>
				<div class="content">
					<div class="textDiv" v-html="selectedStatusData.content">
						</div>
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

<script>
import { handleLoading } from "../utils/utils";
import * as request from "../utils/request";
import moment from "moment";
import { setTimeout, setInterval } from "timers";
let currentDate = moment().format("YYYY-MM");
moment.locale("zh-cn");
moment.updateLocale("zh-cn", {
  meridiem: hour => (hour < 12 ? "AM" : "PM")
});

export default {
  data() {
    return {
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      },
      qrcode: false,
      weather: {},
      date: {},
      partyStatusList: [],
      monthMenu: [],
      gonyixingList: [],
      selectedStatus: -1,
      currenGongyixingIndex: 0
    };
  },
  computed: {
    selectedStatusData() {
      return this.partyStatusList[this.selectedStatus] || {};
    }
  },
  methods: {
    prevSwiper(swiper) {
      this.$refs[swiper].swiper.slidePrev();
    },
    nextSwiper(swiper) {
      this.$refs[swiper].swiper.slideNext();
    },
    onSlideChange(swiper) {
      this.currenGongyixingIndex = this.$refs[swiper].swiper.activeIndex;
    },
    showQrcode() {
      this.qrcode = true;
    },
    wating() {
      alert("两学一做内容即将上线");
    }
  },
  async mounted() {
    handleLoading();
    this.partyStatusList = await request.getPosts({
      query: {
        category: "党建动态",
        limit: 4
      }
    });
    let cachedMonthMenu = await request.getPosts({
      query: {
        category: "月度菜单",
        limit: 4,
        month: currentDate
      }
    });
    this.monthMenu = cachedMonthMenu.sort((a, b) => {
      return moment(a.date) < moment(b.date) ? -1 : 1;
    });
    this.gonyixingList = await request.getAttachments({
      query: {
        category: "公益行",
        limit: 4
      }
    });
    this.weather = await request.getWeather();
    setInterval(async () => {
      this.weather = await request.getWeather();
    }, 300000);

    this.date = {
      ll: moment().format("LL"),
      dddd: moment().format("dddd"),
      L: moment().format("HH"),
      T: moment().format("MM"),
      A: moment().format("A")
    };
    setInterval(async () => {
      this.date = {
        ll: moment().format("LL"),
        dddd: moment().format("dddd"),
        L: moment().format("HH"),
        T: moment().format("MM"),
        A: moment().format("A")
      };
    }, 60000);
  }
};
</script>

<style lang="stylus">
.vertical-center-modal
	display flex
	align-items center
	justify-content center
	.ivu-modal
		top 0
.ivu-icon-ios-close-empty, .ivu-modal-footer
	display none
</style>
