
<script>
import { handleLoading } from "../utils/utils";
import * as request from "../utils/request";

export default {
  data() {
    
    const zhutidangriList = {};
    this.$parent.towns.forEach(town => {
      zhutidangriList[town] = [];
    });

    return {
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      },
      zhutidangriRaw: [],
      zhutidangriEntity: {},
      zhutidangriList,
      selectedList: "",
      selectedDetail: ""
    };
  },
  computed: {
    selectListData() {
      const selectEntity = this.zhutidangriList[this.selectedList] || [];
      return selectEntity.map(entity => this.zhutidangriEntity[entity]);
    },
    selectDetailData() {
      return this.selectListData[this.selectedDetail] || {};
    }
  },
  async mounted() {
    handleLoading();
    this.zhutidangriRaw = await request.getAttachments({
      query: {
        category: "主题党日",
        limit: -1
      }
    });
    this.zhutidangriRaw.forEach(i => {
      const { id, categories } = i;
      const category = categories.find(i => i !== "主题党日");
      if (!this.zhutidangriList[category]) {
        this.$set(this.zhutidangriList, category, []);
      }
      this.zhutidangriList[category].push(id);
      this.zhutidangriEntity[id] = i;
    });
  },
  methods: {
    back() {
      if (this.selectedList) {
        return (this.selectedList = "");
      }
      this.$router.go(-1);
    },
    prevSwiper(swiper) {
      this.$refs[swiper].swiper.slidePrev();
    },
    nextSwiper(swiper) {
      this.$refs[swiper].swiper.slideNext();
    },
    onSlideChange(swiper) {
      this.selectedDetail = this.$refs[swiper].swiper.activeIndex;
    }
  }
};
</script>

<template>
  	<body>
		<div class="main page8">
			<div class="header">
				<a  @click="back" class="fl back"><i class="fa fa-chevron-left"></i> 返回</a>
				<span><img src="~@/assets/images/index/icon2.png"/>主题党日</span>
			</div>
			<div class="list">
				<div class="list-text">
					<ul v-if="!selectedList">
						<li v-for="(item, key) in zhutidangriList" @click="selectedList = key" :key="key">
							{{key}}
						</li>
					</ul>
					<!-- <ul v-if="selectedList">
						<li v-for="(item, key) in selectListData" @click="selectedDetail = item.id">
							{{item.title}}
						</li>
					</ul> -->
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
			<div class="pop" v-if="selectedList">
				<span class="back"  @click="selectedList=null "><i class="fa fa-chevron-left" aria-hidden="true"></i><font>返回</font></span>
          	  	<div class="title">{{selectedList}}</div>
          	  	<div class="content">
      	   	     	<div class="roll">
					    <div class="swiper-container swiper-no-swiping swiper-containerA">
					        <swiper :options="swiperOption" ref="swiper" @slideChange="onSlideChange('swiper')">
										<swiper-slide v-for="(item,index) in selectListData" :key="index">
												<img class="img" :src="item.url" width="100%" height="100%">    
      	   	      			<p>{{item.title}}</p>												      
										</swiper-slide>
								</swiper>
					    </div>
				        <!-- Add Pagination -->
				        <div class="swiper-button-next" @click="nextSwiper('swiper')"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>
				        <div class="swiper-button-prev" @click="prevSwiper('swiper')"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>								    
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
