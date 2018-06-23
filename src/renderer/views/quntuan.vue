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
  .main.page-quntuan
    .entries
      a.entry.qt1
        img(src="~@/assets/images/qt-item-1.svg")
      a.entry.qt2
        img(src="~@/assets/images/qt-item-2.svg")
      a.entry.qt3
        img(src="~@/assets/images/qt-item-3.svg")
      a.entry.qt4
        img(src="~@/assets/images/qt-item-4.svg")
      a.entry.qt5
        img(src="~@/assets/images/qt-item-5.svg")
      a.entry.qt6
        img(src="~@/assets/images/qt-item-6.svg")
      a.entry.qt7
        img(src="~@/assets/images/qt-item-7.svg")
      a.entry.qt8
        img(src="~@/assets/images/qt-item-8.svg")
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
        height 18vw
        margin auto
        padding 0 0.5vw 1.5vw 0
      &.qt2 img
        height 15vw
</style>
