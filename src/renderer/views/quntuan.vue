<script>
import { getPosts } from '../utils/request';

export default {
  data() {
    return {
      scaleItems: {},
      posts: [],
      showingPost: null
    };
  },
  computed: {

  },
  async mounted() {
    this.posts = await getPosts({ query: { category: '群团服务', limit: -1 } });
  },
  methods: {
    scale(item) {
      this.$set(this.scaleItems, item, true);
      setTimeout(() => {
        this.$set(this.scaleItems, item, false);
      }, 1000)
    },
    back() {
      this.$router.go(-1);
    },
    showPost(slug) {
      this.showingPost = this.posts.filter(post => post.slug === slug)[0];
    },
    closePost() {
      const { detail } = this.$refs;
      detail.scrollTop = 0;
      this.showingPost = null;
    }
  }
};
</script>

<template lang="pug">
  .main.page-quntuan
    a.back(v-if="!showingPost" @click="back")
      i.fa.fa-chevron-left
      span 返回
    .entries(:class="{blur:showingPost}")
      a.entry(v-for="index in 8" :class="{['qt'+(index)]:true,scale:scaleItems['entry-'+index]}" @click="scale('entry-'+index);showPost('qt-'+index)")
        img(:src="'static/images/qt-item-'+index+'.svg'" draggable="false")
    .detail(ref="detail" v-if="showingPost" :class="{'fade-in': showingPost}")
      a.back(v-if="showingPost" @click="closePost")
        i.fa.fa-chevron-left
        span 返回
      h1 {{ showingPost.title }}
      .content(v-html="showingPost.content")


</template>

<style lang="stylus">
.main.page-quntuan
  opacity 1
  height 100vh
  background url('~@/assets/images/quntuan-bg.png')
  background-size cover
  display flex
  align-items center
  .entries
    width 100vw
    height 100vh
    padding 5vh 8vw 16vh
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
      &.qt8
        background url('~@/assets/images/quntuan-item-bg-white.png') no-repeat 50%
      img
        height 60%
        margin auto
        padding 0 1% 4% 0
      &.qt2 img
        height 47%
    &.blur
      filter blur(.5vw)
  .detail
    background rgba(111, 77, 46, 0.9)
    position absolute
    top 0
    left 0
    width 100vw
    height 100vh
    padding 10vw
    overflow-y auto
    color white
    font-size 4vw
    text-align justify
    &::-webkit-scrollbar {
      display: none;
    }
    h1
      font-size 2em
      text-align center
      margin-bottom 0.5em
    .content
      p
        text-indent 2em
        margin-bottom 0.5em
      img
        max-width 100%
        margin 0.5em auto
    .back
      color white
      text-shadow 0 0 2vw rgb(111, 77, 46)
  .back
    position fixed
    font-size 4vw
    font-weight bold
    left 3vw
    top 2vw
    color #4d4d4e
@keyframes scale
  0%
    transform scale(1)
  50%
    transform scale(1.3)
  100%
    transform scale(1)
@keyframes fade-in
  0%
    opacity 0
  100%
    opacity 1
.scale
  animation scale 0.3s ease-in-out
.fade-in
  animation fade-in 0.5s ease-in-out
</style>
