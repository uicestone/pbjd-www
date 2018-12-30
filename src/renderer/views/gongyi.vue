<script>
import { handleLoading } from "../utils/utils";
import * as request from "../utils/request";

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
      customDatas: {
        春风: {
          popImage: "static/images/chun.png",
          popColor: "#bfe2eb"
        },
        夏花: {
          popImage: "static/images/xia.png",
          popColor: "#cde3af"
        },
        秋收: {
          popImage: "static/images/qiu.png",
          popColor: "#fbe66c"
        },
        冬暖: {
          popImage: "static/images/dong.png",
          popColor: "#e6e6e6"
        }
      },
      zhutidangriRaw: [],
      zhutidangriEntity: {},
      zhutidangriList: {},
      selectedList: "",
      selectedDetail: 0
    };
  },
  computed: {
    selectListData() {
      const selectEntity = this.zhutidangriList[this.selectedList] || [];
      return selectEntity.map(entity => this.zhutidangriEntity[entity]);
    },
    currentCutomData() {
      return this.customDatas[this.selectedList] || {};
    },
    selectDetailData() {
      return this.selectListData[this.selectedDetail] || {};
    }
  },
  async mounted() {
    handleLoading();
    this.zhutidangriRaw = await request.getAttachments({
      query: {
        category: "公益行",
        limit: -1
      }
    });
    this.zhutidangriRaw.forEach(i => {
      const { id, categories } = i;
      const [category] = categories;
      if (!this.zhutidangriList[category]) {
        this.$set(this.zhutidangriList, category, []);
      }
      this.zhutidangriList[category].push(id);
      this.zhutidangriEntity[id] = i;
    });
  },
  methods: {
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
		<div class="main page1">
			<img src="~@/assets/images/gongyi-banner.png" width="100%">
			<div class="header">
				<a @click="$router.go(-1)" class="back"><i class="fa fa-chevron-left"></i> 返回</a>
			</div>
			<div class="imgBox">
				<div class="imag">
          <img src="~@/assets/images/chun.png" @click="selectedList ='春风'">
          <img src="~@/assets/images/xia.png" @click="selectedList ='夏花'">
          <img src="~@/assets/images/qiu.png" @click="selectedList ='秋收'">
          <img src="~@/assets/images/dong.png" @click="selectedList ='冬暖'">
      </div>
			</div>
	    <div class="popBox" v-if="selectedList">
        <div class="pop pop1">
          <div :style="{background: currentCutomData.popColor, padding: '10px' }">
            <img :src="currentCutomData.popImage" style="width: 3rem; margin: 0 auto">            
          </div>
        <div class="content">
        <div class="roll">
        <div  class="swiper-container swiper-no-swiping swiper-containerA">
            <swiper :options="swiperOption" ref="swiper" @slideChange="onSlideChange('swiper')">
                <swiper-slide v-for="(item,index) in selectListData" :key="index">
                    <img class="img" :src="item.url" width="100%" height="100%">   
                    <p>{{selectDetailData.title}}</p>                           
                </swiper-slide>
            </swiper>
        </div>
          <!-- Add Pagination -->
          <div class="swiper-button-next swiper-button-nexta" @click="nextSwiper('swiper')"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>
          <div class="swiper-button-prev swiper-button-preva" @click="prevSwiper('swiper')"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>								    
                    </div>
              </div>
        </div>
        <i class="fa fa-close close" aria-hidden="true" @click="selectedList=null"></i>
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
