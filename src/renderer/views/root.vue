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
    .bg-bottom
    .entries
      router-link.entry(to="/home")
        img(src="~@/assets/images/root-link-p.svg")
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
  .bg-bottom
    position absolute
    bottom 0
    left 0
    width 100vw
    height 25vh
    background url('~@/assets/images/root-bg-bottom.png') bottom repeat-x
    background-size contain
    animation move 30s linear infinite
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
@keyframes move
  0%
    background-position 0vw 100%
  100%
    background-position 100vw 100%
</style>
