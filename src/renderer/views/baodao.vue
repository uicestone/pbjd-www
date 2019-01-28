<script>
import { handleLoading } from "../utils/utils";
import * as request from "../utils/request";

export default {
  data() {
    return {
      profile: {
        sex: null,
        mobile: localStorage.token && localStorage.token.split(' ')[0]
      }
    };
  },
  mounted() {
    handleLoading();
    this.getProfile();
  },
  methods: {
    submit(e) {
      e.preventDefault();
      request.request('sign-in', {
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
    },
    async getProfile() {
      Object.assign(this.profile, await request.getMySignIn());
    }
  }
};
</script>

<template>
    <body>
    <div class="main page">
      <div class="header">
        <a class="fl back" @click="goBack"><i class="fa fa-angle-left"></i> 党员报到</a>
      </div>
      <form @submit="submit">
      <div class="formDiv">
        <div class="inputDiv">
          <span class="fl">姓名*</span>
          <input type="text" v-model="profile.name" placeholder="您的真实姓名" required />
        </div>
        <div class="inputDiv">
          <span class="fl">手机*</span>
          <input type="text" v-model="profile.mobile" placeholder="手机号码" required />
        </div>
        <div class="inputDiv">
          <span class="fl">身份证</span>
          <input type="text" v-model="profile.idCard" placeholder="用以核实您的身份" />
        </div>
        <div class="inputDiv">
          <span class="fl">性别</span>
          <div class="sexDiv">
            <span class="sex" @click="profile.sex='男'" :class="{check:profile.sex=='男'}">男</span>
            <span class="sex" @click="profile.sex='女'" :class="{check:profile.sex=='女'}">女</span>
          </div>
        </div>
        <div class="inputDiv">
          <span class="fl">单位</span>
          <input type="text" v-model="profile.unit" placeholder="您所在的工作单位"/>
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
        <input type="submit" :value="profile.name?'确认提交':'报到'" class="btn"/>
      </div>
      </form>
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


<style>
</style>
