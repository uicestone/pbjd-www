import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/root",
      name: "root",
      component: require("@/views/root").default
    }, {
      path: "/quntuan",
      name: "quntuan",
      component: require("@/views/quntuan").default,
      meta: {
        homeName: "root"
      }
    }, {
      path: "/home",
      name: "home",
      component: require("@/views/home").default,
      meta: {
        homeName: "root"
      }
    },
    {
      path: "/shequ",
      name: "shequ",
      component: require("@/views/shequ").default,
      meta: {
        homeName: "root"
      }
    },
    {
      path: "/shici",
      name: "shici",
      component: require("@/views/shici").default,
      meta: {
        homeName: "root"
      }
    },
    {
      path: "/shuji",
      name: "shuji",
      component: require("@/views/shuji").default,
      meta: {
        homeName: "root"
      }
    },
    {
      path: "/baodao",
      name: "baodao",
      component: require("@/views/baodao").default,
      meta: {
        homeName: "root"
      }
    },
    {
      path: "/caidan",
      name: "caidan",
      component: require("@/views/caidan").default,
      meta: {
        homeName: "root"
      }
    },
    {
      path: "/dangdaibiao",
      name: "dangdaibiao",
      component: require("@/views/dangdaibiao").default,
      meta: {
        homeName: "root"
      }
    },
    {
      path: "/dangri",
      name: "dangri",
      component: require("@/views/dangri").default,
      meta: {
        homeName: "root"
      }
    },
    {
      path: "/gongyi",
      name: "gongyi",
      component: require("@/views/gongyi").default,
      meta: {
        homeName: "root"
      }
    },
    {
      path: "/fengcai",
      name: "fengcai",
      component: require("@/views/fengcai").default,
      meta: {
        homeName: "root"
      }
    },
    {
      path: "/baoming",
      name: "baoming",
      component: require("@/views/baoming").default,
      meta: {
        homeName: "root"
      }
    },
    {
      path: "/yuyue",
      name: "yuyue",
      component: require("@/views/yuyue").default,
      meta: {
        homeName: "root"
      }
    },
    {
      path: "/geren",
      name: "geren",
      component: require("@/views/geren").default,
      meta: {
        homeName: "root"
      }
    },
    {
      path: "/",
      name: "/",
      component: require("@/views/root").default
    },
    {
      path: "*",
      redirect: "/"
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});