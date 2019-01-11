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
      listDataRaw: [],
      dataEntity: {},
      dataList: {},
      selectedList: "",
      selectedDetail: 0,
      events: []
    };
  },
  computed: {
    selectListData() {
      const selectEntity = this.dataList[this.selectedList] || [];
      return selectEntity.map(entity => this.dataEntity[entity]);
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
    this.listDataRaw = await request.getPosts({
      query: {
        category: "公益行",
        limit: -1
      }
    });
    this.listDataRaw.forEach(i => {
      const { id, categories } = i;
      const [category] = categories;
      if (!this.dataList[category]) {
        this.$set(this.dataList, category, []);
      }
      this.dataList[category].push(id);
      this.dataEntity[id] = i;
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
    },
    back() {
      if (this.selectedList) {
        this.selectedList = '';
      } else {
        this.$router.go(-1);
      }
    }
  },
  watch: {
    async selectedDetail(val) {
      if (!val) return;
      this.events = await request.getPosts({
        query: {
          gongyi: val,
        }
      });
    }
  }
};
</script>

<template>
  <body>
		<div class="main page1">
			<div class="header">
				<a @click="back" class="back"><i class="fa fa-chevron-left"></i> 返回</a>
        <img src="~@/assets/images/gongyi-banner.png" width="100%">
			</div>
			<div class="imgBox" :class="{fixed:selectedList}">
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
            <ul>
              <li v-for="itemId in dataList[selectedList]" @click="selectedDetail=itemId">{{ dataEntity[itemId].title }}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="detail" v-if="selectedDetail">
        <div class="header">
          <a class="back" @click.stop="selectedDetail=0"><i class="fa fa-chevron-left"></i> 返回</a>
          <span>
            <img src="~@/assets/images/index/icon3.png"/>
            公益行
          </span>
        </div>
        <div class="content">
          <div class="thumbnail"><img class="" :src="dataEntity[selectedDetail].posterUrl"/></div>
          <h2>{{ dataEntity[selectedDetail].title }}</h2>
          <div v-html="dataEntity[selectedDetail].content"></div>
          <div v-for="event in events" :key="event.id" class="event-block">
            <div class="event-top">
              <!-- <div class="date"><span>{{event.date | MM("M.D")}}</span></div> -->
              <div class="title">
                <img src="~@/assets/images/index/icon2.png"/>
                {{event.title}}
              </div>
            </div>
            <div class="event-content" v-html="event.content"></div>
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
