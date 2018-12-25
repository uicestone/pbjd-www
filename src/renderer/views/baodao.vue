<script>
import { handleLoading } from "../utils/utils";
import { request } from "../utils/request";

export default {
  data() {
    return {
      profile: {
        sex: null
      }
    };
  },
  mounted() {
    handleLoading();
  },
  methods: {
    submit(e) {
      e.preventDefault();
      request('sign-in', {
        method:'POST', 
        body:JSON.stringify(this.profile)
      }).then(result => {
        if (result._ok) {
          alert('党员报到成功！');
          this.goBack();
        }
      });
    },
    goBack() {
      if (history.length <= 1) {
        window.close();
        if (window.WeixinJSBridge) {
          window.WeixinJSBridge.invoke('closeWindow');            
        }
      }
      history.back();
    }
  }
};
</script>

<template>
  <div class="main view-baodao">
    <div class="header">
      <a class="fl back" @click="goBack">
        <i class="fa fa-angle-left"></i>
        返回
      </a>
    </div>
    <form @submit="submit">
    <div class="formDiv">
      <div class="inputDiv">
        <span class="fl">姓名*</span>
        <input type="text" v-model="profile.name" placeholder="您的真实姓名" required />
      </div>
      <div class="inputDiv">
        <span class="fl">身份证</span>
        <input type="text" v-model="profile.idCard" placeholder="用以核实您的身份" />
      </div>
      <div class="inputDiv">
        <span class="fl">手机*</span>
        <input type="text" v-model="profile.mobile" placeholder="手机号码" required />
      </div>
      <div class="inputDiv">
        <span class="fl">单位</span>
        <input type="text" v-model="profile.unit" placeholder="您所在的工作单位"/>
      </div>
      <div class="inputDiv">
        <span class="fl">性别</span>
        <div class="sexDiv">
          <span class="sex" @click="profile.sex='男'" :class="{check:profile.sex=='男'}">男</span>
          <span class="sex" @click="profile.sex='女'" :class="{check:profile.sex=='女'}">女</span>
        </div>
      </div>
      <div class="inputDiv">
        <span class="fl">所在党组织</span>
        <input type="text" v-model="profile.organization" placeholder="您所在的党组织" class="zuzhi"/>
        <!-- <i class="fa fa-angle-right fr"></i> -->
      </div>
      <div class="inputDiv">
        <span class="fl">居住地</span>
        <input type="text" v-model="profile.residence" placeholder="您所居住的地方"/>
      </div>
      <div class="inputDiv">
        <span class="fl">特长</span>
        <input type="text" v-model="profile.speciality" placeholder="您所擅长的工作、领域" class="techang"/>
        <!-- <i class="fa fa-angle-right fr"></i> -->
      </div>
    </div>
    <div class="btnDiv">
      <input type="submit" value="报到" class="btn"/>
    </div>
    </form>
  </div>
</template>


<style lang="less">

.view-baodao {
  .header {
    background: #c54a43;
  }
  .formDiv {
    padding: 3vw;
    padding-bottom: 1.7vw;
    height: calc(100vh - 15vw);
    background-color: #ececec;
    .inputDiv {
      width: 100%;
      background: #fff;
      margin-bottom: 3vw;
      border-radius: 1vw;
      height: 15vw;
      line-height: 15vw;
      >span {
        display: inline-block;
        width: 22vw;
        font-size: 4vw;
        text-align: right;
        color: #151515;
      }
      input {
        width: 65vw;
        height: 15vw;
        line-height: 15vw;
        float: left;
        padding-left: 2vw;
        margin-left: 2vw;
        font-size: 4vw;
        border: 0;
        background: transparent;
      }
      input::-moz-placeholder {
        color: #909090;
        height: 15vw;
        line-height: 15vw;
        font-size: 4vw;
      }
      input::-ms-input-placeholder {
        color: #909090;
        height: 15vw;
        line-height: 15vw;
        font-size: 4vw;
      }
      input::-webkit-input-placeholder {
        color: #909090;
        height: 15vw;
        line-height: 15vw;
        font-size: 4vw;
      }
      i {
        margin-right: 25vw;
        font-size: 6vw;
        line-height: 15vw;
        color: #222;
      }
      >div {
        float: left;
        height: 15vw;
        line-height: 15vw;
        overflow: hidden;
        padding-left: 2vw;
        margin-left: 2vw;
        span {
          font-size: 4vw;
          float: left;
          display: inline-block;
          width: 16.5vw;
          height: 9vw;
          line-height: 9vw;
          text-align: center;
          border-radius: 1vw;
          position: relative;
          top: 20.5%;
          border: 1px solid #909090;
          margin-right: 2vw;
          color: #909090;
          &.check {
            color: #b42628;
            border: 0;
            background: url('~@/assets/images/sex-bg.png') no-repeat center center;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  .btnDiv {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    height: 16vw;
    line-height: 16vw;
    input {
      border-radius: 2vw;
      width: 80%;
      height: 12vw;
      line-height: 12vw;
      background: #c54a43;
      background-size: 100% 100%;
      color: #fff;
      border: 0;
      font-size: 4vw;
      vertical-align: middle;
      margin-top: -2.5vw;
      letter-spacing: 2vw;
    }
  }
}
</style>
