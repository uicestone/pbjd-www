<script>
  import Datepicker from 'vuejs-datepicker';
  import moment from 'moment';
  import {zh} from 'vuejs-datepicker/dist/locale';
  import { handleLoading } from "../utils/utils";
  import * as request from "../utils/request";

  export default {
    components: {
      Datepicker
    },
    data() {
      return {
        showing: 'menu',
        showed: [],
        form: {},
        zh,
        submitModal: false,
        floor: null,
        rooms: [],
        room: null,
      };
    },
    methods: {
      submit() {
        this.submitModal = true;
        request.submitAppointment(this.form);
      },
      clearForm() {
        this.form = {};
        this.submitModal = false;
      },
      show(layer) {
        if (this.showing) {
          this.showed.push(this.showing);
        }
        this.showing = layer;
        if (layer === 'form-hongting') {
          this.form['会议室/培训室'] = '红厅';
        }
      },
      async setFloor(floor) {
        this.floor = floor;
        this.rooms = await request.getRooms(this.floor);
      },
      setRoom(index) {
        this.room = this.rooms[index];
        if (this.room.title && this.room.title !== '红厅') {
          this.form['会议室/培训室'] = this.room.title;
        }
      },
      back() {
        if (this.showed.length) {
          this.showing = this.showed.pop();
        } else {
          this.$router.back();
        }
      }
    },
    computed: {
      floorImage() {
        return `${__dirname}/../assets/images/index/${this.floor}F.png`;
      },
      disabledDatesProp() {
        return {
          to: moment().add(1, 'day').toDate(),
          from: moment().add(7, 'days').toDate()
        };
      }
    },
    mounted() {
      handleLoading();
    }
  }
</script>
<template>
  <body>
    <div class="main page-yuyue">
      <div class="header">
        <a @click.prevent="back()" class="fl back"><i class="fa fa-chevron-left"></i> 返回</a>
        <b><img src="~@/assets/images/index/icon7.png"/>活动预约</b>
      </div>
      <div v-if="showing=='menu'" class="content yuyue-menu">
        <div class="item" @click="show('floor')">场馆预约</div>
        <div class="item" @click="show('canguan')">预约参观党群服务中心</div>
        <div class="item" @click="show('traffic')">周边交通停车提示</div>
      </div>
      <div v-if="showing=='floor'" class="content yuyue-menu floor">
        <div class="item" @click="setFloor(1);show('floor-detail')">1F</div>
        <div class="item" @click="setFloor(2);show('floor-detail')">2F</div>
        <div class="item" @click="setFloor(3);show('floor-detail')">3F</div>
        <div class="item" @click="setFloor(4);show('floor-detail')">4F</div>
      </div>
      <div v-if="showing=='floor-detail'" class="content">
        <div class="floor-name">{{floor}}F</div>
        <img class="floor-map" v-if="floor==1" src="@/assets/images/index/1F.png"/>
        <img class="floor-map" v-if="floor==2" src="@/assets/images/index/2F.png"/>
        <img class="floor-map" v-if="floor==3" src="@/assets/images/index/3F.png"/>
        <img class="floor-map" v-if="floor==4" src="@/assets/images/index/4F.png"/>
        <div class="rooms">
          <div v-for="(room, index) in rooms" class="room" @click="show('room-detail');setRoom(index)">
            <span class="icon" :style="{background:room.color}"></span>
            <span class="room-name">{{ room.title }}</span>
            <i class="fa fa-chevron-right"></i>
          </div>
        </div>
      </div>
      <div v-if="showing=='room-detail'" class="room-detail content">
        <h2>{{ room.title }}</h2>
        <img class="feature" :src="room.thumbnail">
        <div v-html="room.content"></div>
        <div class="hint" v-if="room.hint">
          <span class="icon">
            温馨提示
          </span>
          <span class="hint-text">{{ room.hint }}</span>
        </div>
        <button v-if="room.open" class="btn-block blue" @click="form.type='场馆预约';show('form'+(room.number==101?'-hongting':''))">预约</button>
      </div>
      <div v-if="showing=='form-hongting'" class="content form hongting">
        <h2>场馆预约登记表</h2>
        <div class="item">
          <label>单位名称</label>
          <input v-model="form['单位名称']" placeholder="单位名称" />
        </div>
        <div class="item">
          <label>预约日期</label>
          <datepicker v-model="form['预约日期']" :language="zh" format="yyyy-MM-dd" :disabledDates="disabledDatesProp" />
        </div>
        <div class="item">
          <label>预约时间</label>
          <select v-model="form['预约时间']">
            <option value="09:00">09:00~10:00</option>
            <option value="10:00">10:00~11:00</option>
            <option value="13:00">13:00~14:00</option>
            <option value="14:00">14:00~15:00</option>
            <option value="15:00">15:00~16:00</option>
          </select>
        </div>
        <div class="item">
          <label>联系人</label>
          <input v-model="form['联系人']" placeholder="联系人" />
        </div>
        <div class="item">
          <label>联系电话</label>
          <input v-model="form['联系电话']" placeholder="电话" />
        </div>
        <div class="item">
          <label>参加人数</label>
          <input v-model="form['参加人数']" placeholder="参加人数" />
        </div>
        <button class="btn-block blue" @click="submit()">提交</button>
        <div class="modal" v-if="submitModal">
          <div class="message blue" @click="clearForm();back()">您已提交成功，正在审核中，工作人员会尽快与您联系。</div>
        </div>
      </div>
      <div v-if="showing=='form'" class="content form hongting">
        <h2>场馆预约登记表</h2>
        <div class="item">
          <label>单位名称</label>
          <input v-model="form['单位名称']" placeholder="单位名称" />
        </div>
        <div class="item">
          <label>活动名称</label>
          <input v-model="form['活动名称']" placeholder="名称" />
        </div>
        <div class="item">
          <label>预约日期</label>
          <datepicker v-model="form['预约日期']" :language="zh" format="yyyy-MM-dd" :disabledDates="disabledDatesProp" />
        </div>
        <div class="item">
          <label>预约时间</label>
          <select v-model="form['预约时间']">
            <option value="上午">上午</option>
            <option value="下午">下午</option>
            <option value="全天">全天</option>
          </select>
        </div>
        <div class="item">
          <label>参加人数</label>
          <input v-model="form['参加人数']" placeholder="人数" />
        </div>
        <div class="item">
          <label>联系人</label>
          <input v-model="form['联系人']" placeholder="联系人" />
        </div>
        <div class="item">
          <label>联系电话</label>
          <input v-model="form['联系电话']" placeholder="电话" />
        </div>
        <div class="item">
          <label>会议室/培训室</label>
          <input v-model="form['会议室/培训室']" placeholder="会议室/培训室" />
        </div>
        <div class="item">
          <label style="position:relative;top:-0.5rem">备注</label>
          <textarea v-model="form['备注']" placeholder="备注"></textarea> 
        </div>
        <button class="btn-block blue" @click="submit()">提交</button>
        <div class="modal" v-if="submitModal">
          <div class="message blue" @click="clearForm();back()">您已提交成功，正在审核中，工作人员会尽快与您联系。</div>
        </div>
      </div>
      <div v-if="showing=='form-canguan'" class="content form">
        <h2>参观预约登记表</h2>
        <div class="item">
          <label>单位名称</label>
          <input v-model="form['单位名称']" placeholder="单位名称" />
        </div>
        <div class="item">
          <label>预约日期</label>
          <datepicker v-model="form['预约日期']" :language="zh" format="yyyy-MM-dd" :disabledDates="disabledDatesProp" />
        </div>
        <div class="item">
          <label>预约时间</label>
          <select v-model="form['预约时间']">
            <option value="09:00">09:00~10:00</option>
            <option value="10:00">10:00~11:00</option>
            <option value="13:00">13:00~14:00</option>
            <option value="14:00">14:00~15:00</option>
            <option value="15:00">15:00~16:00</option>
          </select>
        </div>
        <div class="item">
          <label>联系人</label>
          <input v-model="form['联系人']" placeholder="联系人" />
        </div>
        <div class="item">
          <label>联系电话</label>
          <input v-model="form['联系电话']" placeholder="电话" />
        </div>
        <div class="item">
          <label>参加人数</label>
          <input v-model="form['参加人数']" placeholder="人数" />
        </div>
        <button class="btn-block blue" @click="submit()">提交</button>
        <div class="modal" v-if="submitModal">
          <div class="message blue" @click="clearForm();back()">您已提交成功，正在审核中，工作人员会尽快与您联系。</div>
        </div>
      </div>
      <div v-if="showing=='traffic'" class="content traffic">
        <h2>周边交通停车提示</h2>
        <div>
          <img src="~@/assets/images/index/traffic.png"/>
        </div>
        <div class="hints">
          <p>洪德楼：嘉定区洪德路50号（近沪宜公路）</p>
          <p>周边公交：嘉定9路、嘉定14路、沪唐专线、嘉定64路（洪德路沪宜公路站），嘉定65路（沪宜公路洪德路站）</p>
          <p>停车提示：“保利天琴宇”地下停车场</p>
        </div>
      </div>
      <div v-if="showing=='canguan'" class="content canguan">
        <img src="~@/assets/images/index/红厅.png"/>
        <h2>参观党群服务中心</h2>
        <h3><i class="fa fa-file-text"></i>活动简介</h3>
        <p>邀请安亭镇书记工作室导师、联西村党总支书记唐祝平为辖区青年党员、后备干部生动讲述联西村三十年的发展历程以及标志性事件、人物、故事等，通过参观党建服务站及交流分享，让党员更直观的了解改革开放以来新农村发生的巨大变化和历史缩影，激励党员积极发挥先锋模范作用。</p>
        <button class="btn-block blue" @click="form.type='参观预约';show('form-canguan')">预约</button>
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

<style lang="less" scoped>
  .content {
    padding: 0.7rem;
    height: calc(100vh - 1.6rem);
    overflow-y: auto;
    padding-bottom: 1.5rem !important;
    /deep/ img {
      width: 100%;
    }
    h2 {
      color: #888;
      font-size: 0.5rem;
      text-align: center;
      margin-top: -0.3rem;
      font-weight: normal;
      margin-bottom: 0.15rem;
    }
  }
  .yuyue-menu {
    .item {
      background: #edeeed;
      color: #51a7dc;
      margin-bottom: 0.5rem;
      font-size: 0.65rem;
      font-weight: bold;
      text-align: center;
      height: 2.4rem;
      line-height: 2.4rem;
    }
    &.floor {
      .item {
        font-size: 1.7rem;
        font-weight: 300;
      }
    }
  }
  .floor-name {
    color: #51a7dc;
    font-size: 1rem;
    font-weight: bold;
    text-align: right;
    margin-top: -0.5rem;
  }
  .rooms {
    margin-top: 0.5rem;
    .room {
      box-sizing: content-box;
      border: #8c8c8c 0.01rem solid;
      margin-bottom: 0.3rem;
      font-size: 0.35rem;
      font-weight: normal;
      height: 1.5rem;
      line-height: 1.5rem;
      .room-name {
        position: relative;
        top: -0.62rem;
        margin-left: 0.3rem;
      }
      i {
        float: right;
        margin-top: 0.6rem;
        margin-right: 0.2rem;
      }
    }
    .icon {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      border-right: #8c8c8c 1px solid;
    }
  }
  .room-detail {
    img.feature {
      margin-bottom: 0.3rem;
    }
    /deep/ p {
      font-size: 0.4rem;
      text-align: justify;
      margin-bottom: 1em;
    }
    .hint {
      border: black 1px solid;
      color: white;
      margin-bottom: 0.3rem;
      font-size: 0.35rem;
      font-weight: normal;
      height: 1.5rem;
      line-height: 1.5rem;
      .hint-text {
        display: inline-block;
        color: black;
        width: calc(100% - 1.7rem);
        line-height: 1.5;
        margin-left: 0.1rem;
        font-size: 0.3rem;
        vertical-align: top;
        margin-top: 0.28rem;
      }
      i {
        float: right;
        margin-top: 0.6rem;
        margin-right: 0.2rem;
      }
      .icon {
        background: #a09f9b;
        padding: 0.22rem;
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        border-right: black 1px solid;
        word-wrap: break-word;
        font-size: 0.5rem;
        text-align: center;
        line-height: 1;
      }
    }
  }
  .canguan {
    img {
      width: calc(100% + 0.6rem);
      margin-left: -0.3rem;
    }
    h2 {
      color: #51504e;
      margin-top: 1rem;
      font-weight: bold;
      font-size: 0.5rem;
    }
    h3 {
      i {
        margin-right: 0.2rem;
      }
      color: #51a7dc;
      font-size: 0.36rem;
      margin-bottom: 0.3rem;
    }
    p {
      font-size: 0.29rem;
      text-indent: 2em;
      color: #000;
    }
  }
  .btn-block {
    margin: 0.2rem auto 0;
    display: block;
    left: 0.7rem;
    right: 0.7rem;
    width: calc(100% - 1.4rem);
    bottom: 0.2rem;
    border: none;
    height: 1.3rem;
    color: white;
    font-size: 0.55rem;
    font-weight: bold;
    line-height: 1;
    border-radius: 0.2rem;
    outline: none;
    position: fixed;
  }
  .form {
    background: #f7f8f8;
    padding: .6rem;
    .item {
      border: #ddd 1px solid;
      padding: 0.3rem;
      background: white;
      font-size: 0.45rem;
      margin-bottom: 0.25rem;
      min-height: 1.4rem;
    }
    label {
      font-weight: bold;
      margin-right: 0.3rem;
      width: 33%;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
    }
    ::placeholder {
      color: #c8c8c8;
    }
    /deep/ input, select, textarea {
      outline: none;
      font-family: inherit;
      width: 62%;
      background: none;
      border: none;
      vertical-align: middle;
    }
    select {
      margin-left: -0.11rem;
    }
    textarea {
      outline: none;
      width: 62%;
    }
    /deep/ .vdp-datepicker {
      display: inline-block;
      .vdp-datepicker__calendar {
        width: 8rem;
        header {
          line-height: 1rem;
          .prev:after, .next:after {
            border-width: 0.2rem;
          }
        }
        .cell {
          height: 1rem;
          line-height: 1rem;
        }
      }
    }
    /deep/ .vdp-datepicker__calendar {
      left: -2.2rem !important;
    }
    .modal {
      background: rgba(127, 127, 127, 0.5);
      position: absolute;
      top: 0;
      height: 100vh;
      left: 0;
      right: 0;
    }

    .modal .message {
      position: absolute;
      top: 50%;
      height: 2.7rem;
      margin-top: -2rem;
      left: 5vw;
      width: 90vw;
      padding: 0.5rem;
      font-size: 0.65rem;
      color: white;
      font-weight: bold;
      border-radius: 0.4rem;
      text-align: center;
      line-height: 1.3;
    }
  }
  .traffic {
    .hints {
      margin-top: 0.5rem;
      p {
        margin-bottom: 0.7rem;
        font-size: 0.3rem;
      }
    }
  }
  .orange {
    background-color: #e79b32;
  }
  .red {
    background-color: #952320;
  }
  .blue {
    background-color: #51a7dc;
  }
  .green {
    background-color: #84c5cf;
  }

</style>