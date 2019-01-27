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
        room: {},
        building: null
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

        this.form['room_number'] = this.room.number;
        if (layer.match(/^form/)) {
          this.clearForm();
          this.form['会议室/培训室'] = this.room.title;
          this.form['room_number'] = this.room.number;
          this.getRoomDetail();
        }
        if (layer === 'form-hongting') {
          this.form['会议室/培训室'] = '红厅';
          this.form['type'] = '场馆预约';
        }
        if (layer === 'form') {
          this.form['type'] = '场馆预约';
        }
        if (layer === 'form-canguan') {
          this.form['type'] = '参观预约';
        }
      },
      async setFloor(floor) {
        this.floor = floor;
        this.rooms = await request.getRooms(this.floor);
      },
      async setRoom(index) {
        this.room = this.rooms[index];
      },
      async getRoomDetail() {
        this.room = await request.getRoom(this.room.number);
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
          to: moment().startOf('day').add(7, 'days').toDate(),
          from: moment().startOf('day').add(7, 'days').add(3, 'months').toDate(),
          dates: this.room.fullDates ? this.room.fullDates.map(d => moment(d).toDate()) : [],
          days: (this.room.number === '101' || this.room.number === '0') ? [0, 6] : []
        };
      },
      appointmentDate() {
        if (!this.form['预约日期']) {
          return;
        }
        return moment(this.form['预约日期']).format('YYYY-MM-DD');
      }
    },
    async mounted() {
      handleLoading();
      this.building = await request.getRoom(0);
    }
  }
</script>
<template>
  <body class="yuyue-view">
    <div class="main page-yuyue">
      <div class="header">
        <a @click.prevent="back()" class="fl back"><i class="fa fa-chevron-left"></i> 返回</a>
        <b><img src="~@/assets/images/index/icon7.png"/>活动预约</b>
      </div>
      <div v-if="showing=='menu'" class="content yuyue-menu">
        <div class="item" @click="show('floor')">场馆预约</div>
        <div class="item" @click="show('canguan');room=building">预约参观党群服务中心</div>
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
          <div v-for="(room, index) in rooms" class="room" @click="setRoom(index);show('room-detail')">
            <span class="icon" :style="{background:room.color}"></span>
            <span class="room-name">{{ room.title }}</span>
            <i class="fa fa-chevron-right"></i>
          </div>
        </div>
      </div>
      <div v-if="showing=='room-detail'" class="room-detail content">
        <h2>{{ room.title }}</h2>
        <img v-if="room.thumbnail" class="feature" :src="room.thumbnail">
        <div v-html="room.content"></div>
        <div class="hint" v-if="room.hint">
          <span class="icon">
            温馨提示
          </span>
          <span class="hint-text">{{ room.hint }}</span>
        </div>
        <button v-if="room.open" class="btn-block blue" @click="show('form'+(room.number==101?'-hongting':''))">预约</button>
      </div>
      <div v-if="showing=='form-hongting'" class="content form hongting">
        <form @submit.prevent="submit()">
        <h2>场馆预约登记表</h2>
        <div class="item">
          <label>单位名称</label>
          <input v-model="form['单位名称']" placeholder="单位名称" required/>
        </div>
        <div class="item">
          <label>预约日期</label>
          <datepicker v-model="form['预约日期']" placeholder="预约日期" :language="zh" format="yyyy-MM-dd" :disabledDates="disabledDatesProp" required/>
        </div>
        <div class="item">
          <label>预约时间</label>
          <select v-model="form['预约时间']" required>
            <option v-if="form['预约日期']" v-for="(timeSlot, index) in ['09:00~10:00', '10:00~11:00', '13:00~14:00', '14:00~15:00', '15:00~16:00']" :value="timeSlot" :selected="!index" :disabled="room.appointments && room.appointments[appointmentDate] && room.appointments[appointmentDate].indexOf(timeSlot)>-1">{{ timeSlot }}</option>
          </select>
        </div>
        <div class="item">
          <label>联系人</label>
          <input v-model="form['联系人']" placeholder="联系人" required/>
        </div>
        <div class="item">
          <label>联系电话</label>
          <input v-model="form['联系电话']" placeholder="电话" required/>
        </div>
        <div class="item">
          <label>参加人数</label>
          <input v-model="form['参加人数']" placeholder="参加人数" required/>
        </div>
        <button type="submit" class="btn-block blue">提交</button>
        <div class="modal" v-if="submitModal" @click="back()">
          <div class="message blue">您已提交成功，正在审核中，工作人员会尽快与您联系。</div>
        </div>
        </form>
      </div>
      <div v-if="showing=='form'" class="content form hongting">
        <form @submit.prevent="submit()">
        <h2>场馆预约登记表</h2>
        <div class="item">
          <label>单位名称</label>
          <input v-model="form['单位名称']" placeholder="单位名称" required/>
        </div>
        <div class="item">
          <label>活动名称</label>
          <input v-model="form['活动名称']" placeholder="名称" required/>
        </div>
        <div class="item">
          <label>预约日期</label>
          <datepicker v-model="form['预约日期']" placeholder="预约日期" :language="zh" format="yyyy-MM-dd" :disabledDates="disabledDatesProp" required/>
        </div>
        <div class="item">
          <label>预约时间</label>
          <select v-model="form['预约时间']" required>
            <option v-if="form['预约日期']" v-for="(timeSlot, index) in ['上午', '下午']" :value="timeSlot" :selected="!index" :disabled="room.appointments && room.appointments[appointmentDate] && room.appointments[appointmentDate].indexOf(timeSlot)>-1">{{ timeSlot }}</option>
            <option v-if="form['预约日期']" value="全天" :disabled="room.appointments && room.appointments[appointmentDate] && room.appointments[appointmentDate].length">全天</option>
          </select>
        </div>
        <div class="item">
          <label>参加人数</label>
          <input v-model="form['参加人数']" placeholder="人数" required/>
        </div>
        <div class="item">
          <label>联系人</label>
          <input v-model="form['联系人']" placeholder="联系人" required/>
        </div>
        <div class="item">
          <label>联系电话</label>
          <input v-model="form['联系电话']" placeholder="电话" required/>
        </div>
        <div class="item">
          <label>会议室/培训室</label>
          <input v-model="form['会议室/培训室']" placeholder="会议室/培训室" required/>
          <input type="hidden" v-model="form['room_number']" />
        </div>
        <div class="item">
          <label>备注</label>
          <textarea v-model="form['备注']" placeholder="备注"></textarea> 
        </div>
        <div class="fapiao">
          <h3>开票信息</h3>
          <div class="item">
            <input v-model="form['开票信息_公司名称']" placeholder="公司名称" required/>
          </div>
          <div class="item">
            <input v-model="form['开票信息_税号']" placeholder="税号" required/>
          </div>
          <div class="item">
            <input v-model="form['开票信息_账号']" placeholder="账号" required/>
          </div>
          <div class="item">
            <input v-model="form['开票信息_开户银行']" placeholder="开户银行" required/>
          </div>
          <div class="item">
            <input v-model="form['开票信息_单位地址']" placeholder="单位地址" required/>
          </div>
        </div>
        <button type="submit" class="btn-block blue">提交</button>
        <div class="modal" v-if="submitModal" @click="back()">
          <div class="message blue">您已提交成功，正在审核中，工作人员会尽快与您联系。</div>
        </div>
        </form>
      </div>
      <div v-if="showing=='form-canguan'" class="content form">
        <form @submit.prevent="submit()">
        <h2>参观预约登记表</h2>
        <div class="item">
          <label>单位名称</label>
          <input v-model="form['单位名称']" placeholder="单位名称" required/>
        </div>
        <div class="item">
          <label>预约日期</label>
          <datepicker v-model="form['预约日期']" placeholder="预约日期" :language="zh" format="yyyy-MM-dd" :disabledDates="disabledDatesProp" required/>
        </div>
        <div class="item">
          <label>预约时间</label>
          <select v-model="form['预约时间']" required>
            <option v-if="form['预约日期']" v-for="timeSlot in ['09:00~10:00', '10:00~11:00', '13:00~14:00', '14:00~15:00', '15:00~16:00']" :value="timeSlot" selected :disabled="room.appointments && room.appointments[appointmentDate] && room.appointments[appointmentDate].indexOf(timeSlot)>-1">{{ timeSlot }}</option>
          </select>
        </div>
        <div class="item">
          <label>联系人</label>
          <input v-model="form['联系人']" placeholder="联系人" required/>
        </div>
        <div class="item">
          <label>联系电话</label>
          <input v-model="form['联系电话']" placeholder="电话" required/>
        </div>
        <div class="item">
          <label>参加人数</label>
          <input v-model="form['参加人数']" placeholder="人数" required/>
        </div>
        <button type="submit" class="btn-block blue">提交</button>
        <div class="modal" v-if="submitModal" @click="back()">
          <div class="message blue">您已提交成功，正在审核中，工作人员会尽快与您联系。</div>
        </div>
        </form>
      </div>
      <div v-if="showing=='traffic'" class="content traffic">
        <h2>周边交通停车提示</h2>
        <div>
          <img src="~@/assets/images/index/traffic.png"/>
        </div>
        <div class="hints">
          <p>洪德楼：嘉定区洪德路50号（近沪宜公路）</p>
          <p>周边公交：嘉定9路、嘉定14路、沪唐专线、嘉定64路，嘉定65路</p>
        </div>
      </div>
      <div v-if="showing=='canguan'" class="content canguan">
        <img :src="room.thumbnail"/>
        <h2>{{ room.title }}</h2>
        <h3><i class="fa fa-file-text"></i>活动简介</h3>
        <div v-html="room.content"></div>
        <button class="btn-block blue" @click="show('form-canguan')">预约</button>
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

<style lang="less">
.yuyue-view {
  .content {
    padding: 0.7rem;
    height: calc(100vh - 1.6rem);
    overflow-y: auto;
    padding-bottom: 1.5rem !important;
    img {
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
    p {
      font-size: 0.4rem;
      text-align: justify;
      margin-bottom: 1em;
    }
    .hint {
      border: black 1px solid;
      color: white;
      font-size: 0.35rem;
      font-weight: normal;
      height: 1.5rem;
      line-height: 1.5rem;
      box-sizing: content-box;
      margin: 0 auto 0.3rem;
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
      margin-right: 0.2rem;
      width: 33%;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
    }
    ::placeholder {
      color: #c8c8c8;
    }
    input, select, textarea {
      outline: none;
      font-family: inherit;
      width: 62%;
      background: none;
      border: none;
      vertical-align: middle;
    }
    select {
      margin-left: -0.11rem;
      -webkit-appearance: none;
    }
    textarea {
      outline: none;
      width: 62%;
    }
    .vdp-datepicker {
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
    .vdp-datepicker__calendar {
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
  .fapiao {
    h3 {
      font-size: 0.45rem;
      text-align: center;
      margin-bottom: 0.1rem;
      margin-top: 0.5rem;
    }
    .item {
      padding: 0.1rem 0.3rem;
      min-height: 1rem;
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
}
</style>