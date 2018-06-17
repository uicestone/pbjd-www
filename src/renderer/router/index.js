import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/home",
      name: "home",
      component: require("@/views/home").default

    },
    {
      path: "/shequ",
      name: "shequ",
      component: require("@/views/shequ").default,
      meta: {
        homeName: "home"
      }

    },
    {
      path: "/shici",
      name: "shici",
      component: require("@/views/shici").default,
      meta: {
        homeName: "home"
      }

    },
    {
      path: "/shuji",
      name: "shuji",
      component: require("@/views/shuji").default,
      meta: {
        homeName: "home"
      }

    },
    {
      path: "/baodao",
      name: "baodao",
      component: require("@/views/baodao").default,
      meta: {
        homeName: "home"
      }

    },
    {
      path: "/caidan",
      name: "caidan",
      component: require("@/views/caidan").default,
      meta: {
        homeName: "home"
      }

    },
    {
      path: "/dangdaibiao",
      name: "dangdaibiao",
      component: require("@/views/dangdaibiao").default,
      meta: {
        homeName: "home"
      }

    },
    {
      path: "/dangri",
      name: "dangri",
      component: require("@/views/dangri").default,
      meta: {
        homeName: "home"
      }

    },
    {
      path: "/gongyi",
      name: "gongyi",
      component: require("@/views/gongyi").default,
      meta: {
        homeName: "home"
      }

    },
    {
      path: "/fengcai",
      name: "fengcai",
      component: require("@/views/fengcai").default,
      meta: {
        homeName: "home"
      }

    },
    {
      path: "/",
      name: "/",
      component: require("@/views/home").default
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});