<script>
  import * as request from "../utils/request";
  import moment from 'moment';

  export default {
    data() {
      const years = [];
      for (let year = 2018; year <= (new Date()).getFullYear(); year++) {
        years.push(year);
      }
      return {
        years,
        year: null,
        month: null,
        items: [],
        item: null,
        page: null,
        month: null,
        totalPages: 0
      };
    },
    watch: {
      month() {
        this.getItems();
      },
      page(page) {
        this.getItems();
      }
    },
    methods: {
      async getItems() {
        if (!this.year || !this.month) return;
        this.items = await request.getPosts({query: {category: '主题党日', page: this.page, month: `${this.year}${this.month}`, limit: 7}, options: {cacheable: false}});
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
        } else if (this.month) {
          this.month = null;
        } else if (this.year) {
          this.year = null;
        } else {
          this.$router.back();
        }
      },
      showDetail(item) {
        this.item = item;
      },
      monthName(month) {
        moment.locale('en');
        return moment().set('month', month-1).format('MMMM')
      }
    },
    mounted() {
      this.page = 1;
    }
  }
</script>

<template>
  <div class="main view-dangri">
    <div class="header">
      <a class="fl back" @click="back()"><i class="fa fa-angle-left"></i>返回</a>
      <span><img src="~@/assets/images/icons/dangri.png"/>主题党日</span>
    </div>
    <div class="year-list" v-if="!month">
      <ul>
        <li v-for="(y, index) in years" @click="year=y" v-if="y===year || !year" class="year-list-item" :class="{active:index===years.length-1||y===year}">
          <span class="accidental-presidency">{{ y }}</span>
        </li>
        <li class="month-list" v-if="year">
          <ul>
            <li v-for="m in 12" @click="month=m.toString().padStart(2, '0')"><span class="number"><span class="accidental-presidency">{{ m }}</span></span><span class="name"><span class="accidental-presidency">{{ monthName(m) }}</span></span></li>
          </ul>
        </li>
      </ul>
    </div>
    <div v-if="month" class="content">
      <div class="year-list-item active">
        <div class="year-month-number"><span class="accidental-presidency">{{ year }}.{{ month }}</span></div>
        <div class="month-name"><span class="accidental-presidency">{{ monthName(month) }}</span></div>
      </div>
      <ul>
        <li v-for="item in items" @click="showDetail(item)">
          <div class="title">{{ item.title }}</div>
          <i class="arrow fa fa-angle-right"></i>
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
  .view-dangri {
    .header {
      background-color: #694d85;
    }
    .year-list-item {
      background-color: #fff;
      margin-top: 3vw;
      font-size: 10.7vw;
      padding: 2vw 3.5vw;
      line-height: 1;
      font-family: "Accidental Presidency";
      text-align: center;
      font-weight: normal;
      background-color: #bcbbb8;
      background-image: url('~@/assets/images/mask-list-item.png');
      background-size: cover;
      position: relative;
      &.active {
        background-color: #694d85;
        color: white;
      }
    }
    .year-list {
      height: 100vh;
      background-color: #ececec;
      padding-left: 2vw;
      padding-right: 2vw;
      overflow-y: auto;
      > ul {
        > li {
          &.month-list {
            background-image: none;
            padding: 0;
            font-family: "Accidental Presidency";
            background-color: #bcbbb8;
            margin-top: 3vw;
            ul {
              display: flex;
              flex-wrap: wrap;
              li {
                display: flex;
                justify-content: space-between;
                flex-basis: 25%;
                font-size: 1vw;
                height: 24vw;
                background-image: url('~@/assets/images/mask-square.png');
                background-size: cover;
                color: #694d85;
                padding: 1.5vw;
                &.active {
                  color: white;
                  background-color: #694d85; 
                }
                .number {
                  align-self: flex-start;
                  font-size: 8vw;
                }
                .name {
                  align-self: flex-end;
                  font-size: 3vw;
                }
              }
            }
          }
        }
      }
    }
    .content {
      height: 93vh;
      background-color: #ececec;
      padding-left: 2vw;
      padding-right: 2vw;
      overflow-y: auto;
      .year-list-item {
        padding: 1.4vw 3.5vw;
        .year-month-number {
          font-size: 8vw;
        }
        .month-name {
          font-size: 3vw;
          margin-top: 1vw;
        }
      }
      ul {
        li {
          background-color: #fff;
          margin-top: 3vw;
          font-size: 4vw;
          font-weight: bold;
          padding: 3.5vw;
          line-height: 1;
          .title {
            text-overflow: ellipsis;
            white-space: pre;
            word-wrap: break-word;
            overflow: hidden;
            display: inline-block;
            width: 85vw;
          }
          .arrow {
            float: right;
            font-size: 5vw;
          }
          .date {
            display: inline-block;
            width: 50vw;
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
          color: #694d85;
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
            &.active {
              background-color: #694d85;
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
        border-bottom: 1px solid #694d85;
      }
      p {
        font-size: 3.5vw;
        margin-bottom: 0.5em;
      }
      img {
        width: 100%;
        height: auto;
        border: 0.5vw #694d85 solid;
      }
    }
    .accidental-presidency {
      display: inline-block;
      transform: scale(1.2);
    }
  }
</style>