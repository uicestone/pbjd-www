<script>
import { handleLoading } from "../utils/utils";
import * as request from "../utils/request";

export default {
  data() {
    return {
      currentSelect: -1,
      dadaList: []
    };
  },
  computed: {
    currentSelectData() {
      return this.dadaList[this.currentSelect] || {};
    }
  },
  async mounted() {
    handleLoading();
    this.dadaList = await request.getPosts({
      query: {
        category: "社区党校",
        limit: 12,
        order: 'asc'
      }
    });
  }
};
</script>

<template>
  	<body>
		<div class="main page7">
			<div class="header">
				<img src="~@/assets/images/shequ.png"/>
				<a @click ="$router.go(-1)" class="back"><i class="fa fa-chevron-left"></i> 返回</a>
			</div>
			<div class="list">
				<div class="list-text">
					<ul>
						<li :class="{first: index == currentSelect}" v-for="(item,index) in dadaList"   :key="index" @click="currentSelect = index">{{item.title}}</li>
						<!-- <li class="first">区级党课</li>
						<li>安亭镇</li>
						<li>嘉定新城（马陆镇）</li>
						<li>南翔镇</li>
						<li>江桥镇</li>
						<li>徐行镇</li>
						<li>外冈镇</li>
						<li>华亭镇</li> -->
					</ul>
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
			</div>
			<div class="pop" v-if="currentSelect > -1">
				<span class="back" @click="currentSelect = -1"><i class="fa fa-chevron-left" aria-hidden="true"></i><font>返回</font></span>
				<div class="content">
					<div class="textDiv" v-html="currentSelectData.content">
						<!-- <div>
							<span class="fl">教师姓名：</span>	
							<div class="fl">何慧蓉</div>
						</div>
						<div>
							<span class="fl">职&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;务：</span>	
							<div class="fl">市党代表，公安嘉定分局交警支队高速公路大队教导员</div>
						</div>
						<div>
							<span class="fl">讲课题目：</span>
							<div class="fl">《坚守，在路上》</div>
						</div>
						<div class="intro">
							<span>内容简介：</span>
							<p>
								何慧蓉以“坚守，在路上”为主题，以“交通违法行为大整治”为切入点展开论述，通过一个个生动鲜活的事例，分享她对于整治工作的心得体会。
							</p>
							<p>
								党课从三个方面分析了整治过程中出现的有关问题，包括百姓的不理解不配合，交警内心的负面情绪以及如何建立工作长效机制，从而提出了相应的对策：一是要加强宣传培训，提升居民意识、建立群众基础；二是要及时与民警开展谈心，调整考核方式，激发交警的获得感；三是要努力维持整治成果，积极推进智能化交通管理建设，解决难点问题，改善市民交通出行环境。
							</p>
							<p>
								最后提出动员，希望广大市民能够积极参与交通管理，增进警民沟通交流，努力形成“全民动”的态势。
							</p> -->
						</div>
						<!-- <img src="~@/assets/images/img1.jpg"/>
						<img src="~@/assets/images/img1.jpg"/> -->
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
