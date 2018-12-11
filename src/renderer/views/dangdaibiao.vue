
<script>
import { handleLoading } from "../utils/utils";
import * as request from "../utils/request";

export default {
  data() {

    const dangdaibiaoList = {};
    this.$parent.towns.forEach(town => {
      dangdaibiaoList[town] = [];
    });

    return {
      dangdaibiaoRaw: [],
      dangdaibiaoEntity: {},
      dangdaibiaoList,
      selectedList: "",
      selectedDetail: ""
    };
  },
  computed: {
    selectListData() {
      const selectEntity = this.dangdaibiaoList[this.selectedList] || [];
      return selectEntity.map(entity => this.dangdaibiaoEntity[entity]);
    },
    selectDetailData() {
      return this.dangdaibiaoEntity[this.selectedDetail] || {};
    }
  },
  async mounted() {
    handleLoading();
    this.dangdaibiaoRaw = await request.getPosts({
      query: {
        category: "党代表工作室",
        limit: -1,
        order: 'asc'
      }
    });
    this.dangdaibiaoRaw.forEach(i => {
      const { id, categories } = i;
      const category = categories.find(i => i !== "党代表工作室");
      if (!this.dangdaibiaoList[category]) {
        this.$set(this.dangdaibiaoList, category, []);
      }
      this.dangdaibiaoList[category].push(id);
      this.dangdaibiaoEntity[id] = i;
    });
  },
  methods: {
    back() {
      if (this.selectedList) {
        return (this.selectedList = "");
      }
      this.$router.go(-1);
    },
    init() {
      $(".main").css("opacity", "1");
      $(".pre_load").css("display", "none");
      $(".tab-bar div").click(function() {
        var index = $(this).index();
        $(this)
          .siblings("div")
          .removeClass("curr");
        $(this).addClass("curr");
        $(".chunk")
          .eq(index)
          .siblings(".chunk")
          .hide();
        $(".chunk")
          .eq(index)
          .show();
        for (var i = 0; i < len; i++) {
          mp3[i].pause();
          $(".chunk3 li")
            .eq(i)
            .removeClass("played");
          $(".chunk3 li")
            .eq(i)
            .find("i")
            .removeClass("fa-volume-up");
          $(".chunk3 li")
            .eq(i)
            .find("i")
            .addClass("fa-play-circle-o");
        }
      });

      $(".chunk2 div").click(function() {
        var index = $(this).index();
        $(".pop").show();
      });
      $(".back").click(function() {
        $(".pop").hide();
      });
      var mp3 = document.querySelectorAll("audio");
      var len = mp3.length;

      $(".chunk3 li").click(function() {
        $(this)
          .siblings("li")
          .removeClass("played");
        $(this)
          .siblings("li")
          .find("i")
          .removeClass("fa-volume-up");
        $(this)
          .siblings("li")
          .find("i")
          .addClass("fa-play-circle-o");
        $(this)
          .find("i")
          .addClass("fa-volume-up");
        $(this)
          .find("i")
          .removeClass("fa-play-circle-o");
        $(this).addClass("played");

        if ($(this).find("audio")[0].paused) {
          for (var i = 0; i < len; i++) {
            mp3[i].pause();
          }
          $(this).find("audio")[0].currentTime = 0;
          $(this)
            .find("audio")[0]
            .play();
          console.log($(this).find("audio")[0].paused);
        } else {
          $(this)
            .find("audio")[0]
            .pause();
          console.log($(this).find("audio")[0].paused);
        }
      });
    }
  }
};
</script>

<template>
  	<body>
		<div class="main page6">
			<div class="header">
				<a  @click.prevent="back" class="fl back"><i class="fa fa-chevron-left"></i> 返回</a>
				<span><img src="~@/assets/images/index/icon4.png"/>党代表工作室</span>
			</div>
			<div class="list">
				<div class="list-text" v-bind:class="{'selected-list':selectedList}">
					<ul v-if="!selectedList">
						<li v-for="(item, key) in dangdaibiaoList" :key="key" @click="selectedList = key">
							{{key}}
						</li>
					</ul>
					<ul v-if="selectedList">
						<li v-for="(item, key) in selectListData" :key="key" @click="selectedDetail = item.id">
							{{item.title}}
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
			<div class="pop" v-if="selectedDetail">
				<span class="back"  @click="selectedDetail=null "><i class="fa fa-chevron-left" aria-hidden="true"></i><font>返回</font></span>
				<div class="content">
					<h1 class="title">{{ selectDetailData.title }}</h1>
					<div class="textDiv" v-html="selectDetailData.content">
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
