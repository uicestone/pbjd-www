<script>
export default {
  data() {
    return {

    };
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    
  }
};
</script>

<template lang="pug">
  .main.page-root
    .entries
      router-link.entry(to="/home")
        img(src="~@/assets/images/root-link-pb.svg")
        .entry-name 嘉定区<br>党建服务中心
      router-link.entry(to="/quntuan")
        img(src="~@/assets/images/root-link-qt.svg")
        .entry-name 嘉定区<br>群团服务中心
</template>

<style lang="stylus" scoped>
.main.page-root
  opacity 1
  height 100vh
  background url('~@/assets/images/root-bg.png')
  background-size cover
  display flex
  align-items center
  .entries
    width 100vw
    display flex
    justify-content space-around
    align-items center
    padding 0 5vw 13vh
    .entry
      text-align center
      img
        height 28vw
        margin auto
      .entry-name
        color #584a43
        font-size 6.67vw
        font-weight bold
        line-height 1.1
        margin-top 2vh

</style>
