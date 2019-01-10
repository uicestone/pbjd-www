<script>
  import * as request from "../utils/request";

  export default {
    data() {
      return {
        items: [],
        item: null,
        page: null,
        totalPages: 0
      };
    },
    watch: {
      page(page) {
        this.getItems();
      }
    },
    methods: {
      async getItems() {
        this.items = await request.getPosts({query: {category: '风采展示', page: this.page, limit: 16}, options: {cacheable: false}});
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
        } else {
          this.$router.back();
        }
      },
      showDetail(item) {
        this.item = item;
      },
      randomThumbBackColor() {
        const colors = ['#3f6a79', '#4e8687', '#6ba0a4', '#70bcc0'];
        return colors[Math.round(Math.random() * 1E10 % 3)];
      }
    },
    mounted() {
      this.page = 1;
    }
  }
</script>

<template>
  <div class="main view-fengcai">
    <div class="header">
      <a class="fl back" @click="back()"><i class="fa fa-angle-left"></i>返回</a>
      <span><img src="~@/assets/images/icons/fengcai.png"/>风采展示</span>
    </div>
    <div class="content">
      <ul>
        <li v-for="item in items" @click="showDetail(item)">
          <div class="thumbnail" :style="{background:randomThumbBackColor()}"><img :src="item.posterUrl"/></div>
          <div class="title">{{ item.title }}</div>
        </li>
      </ul>
    </div>
    <div class="pagination">
      <ul>
        <li class="prev" @click="prev" :class="{disabled:page==1}"><i class="fa fa-chevron-circle-left"></i></li>
        <li class="page-dot" :class="{active:i==page}" v-for="(i, index ) in totalPages"></li>
        <li class="next" @click="next" :class="{disabled:page>=totalPages}"><i class="fa fa-chevron-circle-right"></i></li>
      </ul>
    </div>
    <div v-if="this.item" class="detail">
      <h1>{{ this.item.title }}</h1>
      <div v-html="this.item.content"></div>
    </div>
  </div>
</template>

<style lang="less">
  .view-fengcai {
    .header {
      background-color: #37a299;
    }
    .content {
      height: 93vh;
      padding-top: 20vw;
      background-color: #ececec;
      padding-left: 5vw;
      padding-right: 5vw;
      overflow-y: auto;
      ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        li {
          flex-basis: 25%;
          display: flex;
          flex-direction: column;
          padding: 0 1.5vw 3vw;
          .thumbnail {
            // background: #3f6a79;
            height: 23.5vw;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 100%;
              max-height: 100%;
              object-fit: cover;
            }
          }
          .title {
            display: flex;
            justify-content: center;
            font-size: 3.3vw;
            font-weight: bold;
            margin-top: 1vw;
          }
        }
      }
    }
    .pagination {
      background-color: #ececec;
      height: 7vh;
      text-align: center;
      font-size: 5vw;
      padding-top: 2vh;
      ul {
        li {
          display: inline-block;
          color: #37a299;
          &.disabled {
            color: #d4d3d2;
          }
          &.page-dot {
            background-color: #d4d3d2;
            width: 1.5vw;
            height: 1.5vw;
            margin: auto 0.5vw;
            border-radius: 0.75vw;
            margin-bottom: 0.75vw;
            vertical-align: middle;
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
      }
      img {
        width: 100%;
        height: auto;
        border: 0.5vw #37a299 solid;
      }
    }
  }
</style>