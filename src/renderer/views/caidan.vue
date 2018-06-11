<script>
import { handleLoading } from "../utils/utils";
import * as request from "../utils/request";
import moment from "moment";
let currentDate = moment().format("YYYY-MM");

export default {
  data() {
    return {
      currentSelect: -1,
      dataList: []
    };
  },
  computed: {
    currentSelectData() {
      return this.dataList[this.currentSelect] || {};
    }
  },
  async mounted() {
    handleLoading();
    let cachedMonthMenu = await request.getPosts({
      query: {
        category: "月度菜单",
        limit: 12,
        month: currentDate
      }
    });
    this.dataList = cachedMonthMenu.sort((a, b) => {
      return moment(a.date) < moment(b.date) ? -1 : 1;
    });
  }
};
</script>

<template>
  <body>
		<div class="main page9">
			<div class="header">
				<a @click="$router.go(-1)" href="###" class="fl back"><i class="fa fa-chevron-left"></i> 返回</a>
				<span><img src="~@/assets/images/index/caidan.png"/>月度菜单</span>
			</div>
			<div class="list">
				<div class="list-text">
					<div class="text-top">
						<span class="fl">6月</span>
						<span class="fr">June</span>
					</div>
					<img src="~@/assets/images/cal.png"/>
					<div class="list-page">
						<ul>
							<li><img src="~@/assets/images/index/left-arrow.png"/></li>
							<li class="active"><span></span></li>
							<li><span></span></li>
							<li><span></span></li>
							<li><span></span></li>
							<li><img src="~@/assets/images/index/right-arrow.png"/></li>
						</ul>
					</div>
				</div>
				<div  v-for="(item,index) in dataList"  class="content">
					<div class="con-top">
						<div class="date"><span>{{item.date | MM("M.D")}}</span></div>
						<div class="title">
							<img src="~@/assets/images/index/icon2.png"/>
							{{item.title}}
						</div>
						<h3>“联西的六靠精神”书记工作室导师讲堂</h3>
					</div>
					<div class="activity" v-html="item.content"></div>
					<div class="activity">
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
