<script>
  import * as request from "../utils/request";

  export default {
    data() {
      return {
        level: null,
        items: [],
        item: null,
        page: null,
        totalPages: 0
      };
    },
    watch: {
      level(v) {
        this.getItems();
      },
      page(page) {
        this.getItems();
      }
    },
    methods: {
      selectLevel(level) {
        this.level = level;
      },
      async getItems() {
        if (!this.level) return;
        this.items = await request.getPosts({query: {category: `三级党群服务体系+${this.level}`, page: this.page, limit: 6}, options: {cacheable: false}});
        this.totalPages = this.items._totalPages;
      },
      prev() {
        this.page --;
      },
      next() {
        this.page ++;
      },
      back() {
        if (this.item) {
          this.item = null;
        } else if (this.level) {
          this.level = null;
        } else {
          this.$router.back();
        }
      },
      showDetail(item) {
        this.item = item;
      }
    },
    mounted() {
      this.page = 1;
    }
  }
</script>

<template>
  <div class="main view-fuwu">
    <div class="header">
      <a class="fl back" @click="back()"><i class="fa fa-angle-left"></i>返回</a>
      <span><img src="~@/assets/images/icons/fuwu.png"/>三级党群服务体系</span>
    </div>
    <div v-if="!level" class="levels">
      <ul class="list">
        <li v-for="level in ['党群服务中心', '党群服务站', '党群服务点']" @click="selectLevel(level)" class="list-item">{{ level }}</li>
      </ul>
    </div>
    <div v-if="level" class="items">
      <ul>
        <li v-for="item in items" @click="showDetail(item)" :style="{backgroundImage: `url(${item.posterUrl})`}">
          <div class="title">{{ item.title }}</div>
        </li>
      </ul>
      <div class="pagination">
        <ul>
          <li class="prev" @click="prev" :class="{disabled:page==1}"><i class="fa fa-chevron-circle-left"></i></li>
          <li class="page-dot" :class="{active:i==page}" v-for="(i, index ) in totalPages"></li>
          <li class="next" @click="next" :class="{disabled:page>=totalPages}"><i class="fa fa-chevron-circle-right"></i></li>
        </ul>
      </div>
    </div>
    <div v-if="item" class="detail">
      <div class="poster"><img :src="item.posterUrl"></div>
      <div v-html="item.content"></div>
    </div>
  </div>
</template>

<style lang="less">
  .view-fuwu {
    .header {
      background-color: #37a299;
    }
    .list {
      height: 100vh;
      background-color: #ececec;
      padding-left: 2vw;
      padding-right: 2vw;
      overflow-y: auto;
    }
    .list-item {
      margin-top: 3vw;
      font-size: 5vw;
      padding: 5vw 3.5vw;
      line-height: 1;
      font-family: fantasy;
      text-align: center;
      font-weight: normal;
      background-color: #bcbbb8;
      background-image: url('~@/assets/images/mask-list-item.png');
      background-size: cover;
      position: relative;
      &.active {
        background-color: #37a299;
        color: white;
      }
    }
    .items {
      height: 93vh;
      > ul {
        display: flex;
        flex-wrap: wrap;
        padding: 4vw;
        align-content: flex-start;
        background-color: #ececec;
        > li {
          flex-basis: 50%;
          height: 46vw;
          background-size: cover;
          position: relative;
          margin-bottom: 5vw;
          &:before {
            content: '';
            position: absolute;
            left: 0; top: 0; right: 0; bottom: 0;
            background-image: url('~@/assets/images/mask-fuwu.png');
            background-size: cover;
          }
          .title {
            position: absolute;
            bottom: -3vw;
            color: white;
            font-weight: bold;
            width: 100%;
            text-align: center;
            background: #37a299;
            font-size: 2.4vw;
          }
        }
      }
    }
    .pagination {
      background-color: #ececec;
      height: 6vh;
      text-align: center;
      font-size: 5vw;
      padding-top: 1vh;
      position: fixed;
      width: 100%;
      z-index: 99999;
      bottom: 0;
      ul {
        li {
          display: inline-block;
          color: #37a299;
          &.disabled {
            color: #d4d3d2;
          }
          &.page-dot {
            vertical-align: middle;
            background-color: #d4d3d2;
            width: 1.5vw;
            height: 1.5vw;
            margin: auto 0.5vw;
            border-radius: 0.75vw;
            margin-bottom: 0.75vw;
            &.active {
              background-color: #37a299;
            }
          }
        }
      }
    }
    .detail {
      position: absolute;
      top: 15vw; left: 0; right: 0; bottom: 0;
      background: white;
      padding: 4vw 4vw 0;
      h1 {
        font-size: 5vw;
        margin-bottom: 2vw;
        padding-bottom: 2vw;
        border-bottom: 1px solid #37a299;
      }
      p {
        font-size: 3.5vw;
        margin-bottom: 0.5em;
        text-indent: 2em;
        img {
          margin-left: -2em;
        }
      }
      img {
        width: 100%;
        height: auto;
        border: 0.5vw #37a299 solid;
      }
    }
  }
</style>