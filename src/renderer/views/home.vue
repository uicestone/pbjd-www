<template>
  <body>
		<div class="main page3">
			<div class="topDiv">
				<img src="~@/assets/images/index/banner.png" width="100%">
				<div class="top-text">
					<div class="fl dateDiv">
						<div class="ymd">2018年5月9日 星期三</div>
						<div class="time">
							<span class="hm">14: 44</span> PM
						</div>
					</div>
					<div class="fr city-weather">
						<div class="city">嘉定，上海</div>
						<div class="weather">
							<span class="text">小雨</span>
							<span class="wendu">16℃ - 20℃</span>
						</div>
					</div>
				</div>
			</div>
			<div class="main-con">
				<div class="main-con1">
					<div class="fl leftDiv">
						<div class="baodao">
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
								<a v-for="(item,index) in partyStatusList" @click="selectedStatus = index">
									<li class="">
										<span class="fl">{{item.title}}</span>
										<span class="fr">{{item.createdAt}} <i class="fa fa-angle-right"></i></span>
									</li>
								</a>
							</ul>
						</div>
					</div>
				</div>
				<div class="main-con2">
					<div class="fl leftDiv">
						<div class="gyx">
							<div class="gyx-title"><img src="~@/assets/images/index/xin.png"/><span>公益行</span></div>
							<div class="lunbo">
								<img src="~@/assets/images/index/gyx-img.jpg"/>
								<div class="lb-page">
									<ul>
										<li><img src="~@/assets/images/index/left-arrow1.png"/></li>
										<li class="active"><span></span></li>
										<li><span></span></li>
										<li><span></span></li>
										<li><span></span></li>
										<li><img src="~@/assets/images/index/right-arrow1.png"/></li>
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
								<li v-for="(item, index) in monthMenu">
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
								<i class="fa fa-chevron-down"></i>
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
let currentDate = moment().format("YYYY-MM");

export default {
  data() {
    return {
      partyStatusList: [],
      monthMenu: [],
      gonyixingList: [],
      selectedStatus: -1
    };
  },
  computed: {
    selectedStatusData() {
      return this.partyStatusList[this.selectedStatus] || {};
    }
  },
  methods: {
    wating() {
      alert("施工中...");
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
  }
};
</script>

<style stylus scoped>
</style>
