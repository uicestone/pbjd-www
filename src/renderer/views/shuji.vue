<script>
import { handleLoading } from "../utils/utils";
import * as request from "../utils/request";

export default {
  data() {
    return {
      currentSelect: -1,
      shujiList: []
    };
  },
  computed: {
    currentSelectData() {
      return this.shujiList[this.currentSelect] || {};
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
		<div class="main page4">
			<div class="header">
				<a @click="$router.go(-1)" class="fl back"><i class="fa fa-chevron-left"></i> 返回</a>
				<span><img src="~@/assets/images/index/icon1.png"/>书记工作室</span>
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
                 <i class="fa fa-close close" aria-hidden="true" @click="currentSelect = -1"></i>
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
