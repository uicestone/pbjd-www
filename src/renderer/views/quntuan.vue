<script>
export default {
  data() {
    return {
      scaleItems: {}
    };
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    scale(item) {
      this.$set(this.scaleItems, item, true);
      setTimeout(() => {
        this.$set(this.scaleItems, item, false);
      }, 1000)
    }
  }
};
</script>

<template lang="pug">
  .main.page-quntuan
    .entries
      a.entry(v-for="index in 8" :class="{['qt'+(index)]:true,scale:scaleItems['entry-'+index]}" @click="scale('entry-'+index)")
        img(:src="'static/images/qt-item-'+index+'.svg'")
</template>

<style lang="stylus" scoped>
.main.page-quntuan
  opacity 1
  height 100vh
  background url('~@/assets/images/quntuan-bg.png')
  background-size cover
  display flex
  align-items center
  .entries
    width 100vw
    padding 8vh 8vw 16vh
    display flex
    justify-content space-around
    align-items center
    flex-wrap wrap
    .entry
      width 50%
      margin 2vh 0
      text-align center
      background url('~@/assets/images/quntuan-item-bg.png') no-repeat 50%
      background-size contain
      height 30vw
      display flex
      align-items center
      img
        height 60%
        margin auto
        padding 0 1% 4% 0
      &.qt2 img
        height 47%
@keyframes scale
  0%
    transform scale(1)
  50%
    transform scale(1.3)
  100%
    transform scale(1)
.scale
  animation scale 0.3s ease-in-out
</style>
