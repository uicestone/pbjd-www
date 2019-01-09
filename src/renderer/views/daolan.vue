<script>
  import * as request from "../utils/request";

  export default {
    data() {
      return {
        floor: null,
        items: [],
        item: null,
      };
    },
    watch: {
      floor(v) {
        this.getItems();
      }
    },
    methods: {
      selectFloor(floor) {
        this.floor = floor;
      },
      async getItems() {
        if (!this.floor) return;
        this.items = await request.getRooms(this.floor);
      },
      back() {
        if (this.item) {
          this.item = null;
        } else if (this.floor) {
          this.floor = null;
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
  <div class="main view-daolan">
    <div class="header">
      <a class="fl back" @click="back()"><i class="fa fa-angle-left"></i>返回</a>
      <span><img src="~@/assets/images/icons/daolan.png"/>场馆导览</span>
    </div>
    <div v-if="!floor" class="floors">
      <ul class="list">
        <li v-for="floor in ['1', '2', '3']" @click="selectFloor(floor)" class="list-item floor">{{ floor }}F</li>
      </ul>
    </div>
    <div v-if="floor && !item" class="items">
      <ul class="list">
        <li class="list-item active floor">{{ floor }}F</li>
        <li class="list-item" v-for="item in items" @click="showDetail(item)">
          <div class="title">{{ item.title }}</div>
        </li>
      </ul>
    </div>
    <div v-if="item" class="detail">
      <h1>{{ item.title }}</h1>
      <div v-if="item.posterUrl" class="poster"><img :src="item.posterUrl"></div>
      <div v-html="item.content"></div>
    </div>
  </div>
</template>

<style lang="less">
  .view-daolan {
    .header {
      background-color: #d5ac50;
    }
    .list {
      height: calc(100vh - 15vw);
      background-color: #ececec;
      padding-left: 2vw;
      padding-right: 2vw;
      overflow-y: auto;
    }
    .list-item {
      margin-top: 3vw;
      font-size: 5vw;
      padding: 4.935vw 3.5vw;
      line-height: 1;
      font-family: fantasy;
      text-align: center;
      font-weight: normal;
      background-color: #bcbbb8;
      background-image: url('~@/assets/images/mask-list-item.png');
      background-size: cover;
      position: relative;
      &.active {
        background-color: #d5ac50;
        color: white;
      }
      &.floor {
        font-size: 10.8vw;
        padding-top: 2vw;
        padding-bottom: 2vw;
      }
    }
    .rooms {
      
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
        border-bottom: 1px solid #d5ac50;
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
        border: 0.5vw #d5ac50 solid;
      }
    }
  }
</style>