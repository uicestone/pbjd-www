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
        category: "风采展示",
        limit: 12
      }
    });
  }
};
</script>

<template>
  <body>
		<div class="main page5">
			<div class="header">
				<a @click="$router.go(-1)" class="fl back"><i class="fa fa-chevron-left"></i> 返回</a>
				<span><img src="~@/assets/images/index/icon6.png"/>风采展示</span>
			</div>
			<div class="list">
				<div class="tagDiv">
					<span><img src="~@/assets/images/fengcai.png"/>疁城之星</span>
					<img src="~@/assets/images/line.jpg" alt="" />
				</div>
				<div class="list-text">
					<ul>
						 <li @click="currentSelect = index" v-for="(item,index) in dadaList" :key="index">
							 <span class="title">
								 {{item.title}}</span><span class="fr">{{item.createdAt}}
								</span>
						</li>
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
