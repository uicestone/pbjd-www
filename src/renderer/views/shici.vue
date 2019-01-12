<script>
import { handleLoading } from "../utils/utils";
import * as request from "../utils/request";

export default {
  data() {
    return {
      showTab: 1,
      steps: [
        "正衣冠，列队有序进入宣誓厅（室）；",
        "主持人宣布仪式开始，奏唱《中华人民共和国国歌》；",
        "领誓人带领全体党员面向党旗宣誓（有条件的，参加宣誓的党员在“宣誓人”环节依次报名）；",
        "奏《国际歌》；",
        "主持人宣布仪式结束。"
      ],
      songs: [],
      pageSong: null,
      totalPagesSong: 1,
      currentPlayIndex: null,
      movies: [],
      pageMovie: null,
      totalPagesMovie: 1
    };
  },
  watch: {
    pageSong() {
      this.getSongs();
    },
    pageMovie() {
      this.getMovies();
    }
  },
  mounted() {
    this.pageSong = 1;
    this.pageMovie = 1;
  },
  methods: {
    back() {
      this.$router.back();
    },
    switchTab(tab) {
      this.showTab = tab;
    },
    async getSongs() {
      this.songs = await request.getAttachments({query: {category: '红色歌曲', limit: 6, page: this.pageSong}, options: {cacheable: false}});
      this.totalPagesSong = this.songs._totalPages;
    },
    async getMovies() {
      this.movies = await request.getAttachments({query: {category: '红色电影', limit: 8, page: this.pageMovie}, options: {cacheable: false}})
      this.totalPagesMovie = this.movies._totalPages;
    },
    playVideo(movie) {
      const player = this.$refs[`movie-${movie.id}`][0];
      if (!movie.playing) {
        this.$set(movie, 'playing', true);
        player.play();
        return;
      }
      this.$set(movie, 'playing', false);
      player.pause();
      player.currentTime = 0;
    },
    playAudio(song) {
      const player = this.$refs.audio;
      if (song.url === decodeURIComponent(player.src)) {
        player.pause();
        player.currentTime = 0;
        this.$set(song, 'playing', false);
        player.src = '';
        return;
      }
      this.songs.forEach(song => this.$set(song, 'playing', false));
      this.$set(song, 'playing', true);
      player.src = song.url;
      player.play();
    }
  }
};
</script>

<template>
  <div class="main view-shici" >
    <div class="header">
      <a class="fl back" @click="back()"><i class="fa fa-angle-left"></i>返回</a>
      <span><img src="~@/assets/images/icons/shici.png"/>誓词教育</span>
    </div>
    <div class="body">
      <div class="tabs">
        <div class="tab-1" @click="switchTab(1)" :class="{active: showTab==1}">
          <i class="fa fa-list"></i>
          <span class="title">宣誓流程</span>
        </div>
        <div class="tab-2" @click="switchTab(2)" :class="{active: showTab==2}">
          <i class="fa fa-video-camera"></i>
          <span class="title">红色电影</span>
        </div>
        <div class="tab-3" @click="switchTab(3)" :class="{active: showTab==3}">
          <i class="fa fa-music"></i>
          <span class="title">红色歌曲</span>
        </div>
      </div>
      <div v-if="showTab===1">
        <ul class="steps">
          <li v-for="(step, index) in steps">
            <span class="index">
              <span class="number">{{ index + 1}}</span>
            </span>
            <p class="text">{{ step }}</p>
          </li>
        </ul>
      </div>
      <div v-if="showTab===2">
        <ul class="movies">
          <li v-for="movie in movies" :class="{playing: movie.playing}" @click="playVideo(movie)">
            <video :src="movie.url" :ref="`movie-${movie.id}`"></video>
            <i v-if="!movie.playing" class="play fa fa-play-circle-o"></i>
            <p class="title">{{ movie.title }}</p>
          </li>
        </ul>
        <div class="pagination">
          <ul>
            <li class="prev" @click="pageMovie--" :class="{disabled:pageMovie==1}"><i class="fa fa-chevron-circle-left"></i></li>
            <li class="page-dot" :class="{active:i==pageMovie}" v-for="(i, index ) in totalPagesMovie"></li>
            <li class="next" @click="pageMovie++" :class="{disabled:pageMovie>=totalPagesMovie}"><i class="fa fa-chevron-circle-right"></i></li>
          </ul>
        </div>
      </div>
      <div v-if="showTab===3">
        <ul class="songs">
          <li v-for="song in songs" @click="playAudio(song)" :class="{playing: song.playing}">
            <span class="title">{{ song.title }}</span>
            <i class="fa" :class="{'fa-play-circle-o': !song.playing, 'fa-volume-up': song.playing}"></i>
          </li>
        </ul>
        <div class="pagination">
          <ul>
            <li class="prev" @click="pageSong--" :class="{disabled:pageSong==1}"><i class="fa fa-chevron-circle-left"></i></li>
            <li class="page-dot" :class="{active:i==pageSong}" v-for="(i, index ) in totalPagesSong"></li>
            <li class="next" @click="pageSong++" :class="{disabled:pageSong>=totalPagesSong}"><i class="fa fa-chevron-circle-right"></i></li>
          </ul>
        </div>
      </div>
    </div>
    <audio ref="audio" style="display: none"/>    
  </div>
</template>

<style lang="less">
  .view-shici {
    overflow: scroll;
    background: #ececec;
    height: 100vh;
    .header {
      background-color: #c54a43;
    }
    .body {
      background: white;
      padding: 0;
      min-height: calc(100vh - 21vw);
      margin: 18vw 3vw 3vw;
      .tabs {
        margin-bottom: 4vw;
        display: flex;
        > div {
          flex-grow: 1;
          background: #bcbbb8;
          height: 31.33vw;
          position: relative;
          color: white;
          font-size: 4vw;
          padding: 2vw;
          &.active {
            background: #c54a43;
            &:before {
              content: '';
              position: absolute;
              bottom: -3vw;
              left: 0;
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 4vw 4vw 0 0;
              border-color: #c54a43 transparent transparent transparent;
            }
          }
          &:after {
            content: '';
            position: absolute;
            top: 0; bottom: 0; left: 0; right: 0;
            background: url('~@/assets/images/mask-square.png');
            background-size: contain;
          }
          i {
            font-size: 8vw;
          }
          .title {
            position: absolute;
            right: 2vw;
            bottom: 2vw;
            font-weight: bold;
          }
        }
        .tab-2.active:before {
          left: 12.5vw;
          border-width: 5vw 4vw 0;
        }
        .tab-3.active:before {
          right: 0;
          left: initial;
          border-width: 0 4vw 4vw 0;
          border-color: transparent #c54a43 transparent transparent;
        }
      }
      .steps {
        font-size: 3.8vw;
        font-weight: bold;
        margin-top: 9vw;
        li {
          position: relative;
          margin-top: 5vw;
          &:last-child {
            padding-bottom: 4vw;
          }
          .index {
            position: relative;
            .number {
              z-index: 1;
              position: absolute;
              color: white;
              left: 1.5vw;
            }
            &:after {
              content: '';
              position: absolute;
              top: 0; left: 0; right: 0; bottom: 0;
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 10vw 9.5vw 0 0;
              border-color: #c54a43 transparent transparent transparent;
            }
          }
          .text {
            padding-left: 7vw;
            border-bottom: 0.25vw solid #c54a43;
            margin-left: 4vw;
            padding-right: 7vw;
            margin-right: 4vw;
          }
        }
      }
      .movies {
        display: flex;
        flex-wrap: wrap;
        li {
          flex-basis: 50%;
          text-align: center;
          margin-bottom: 3vw;
          position: relative;
          &.playing {
            position: absolute;
            left: 0; top: 0; right: 0; bottom: 0;
            z-index: 1;
            background: rgba(0,0,0,0.9);
            video {
              position: absolute;
              left: 3vw;
              width: calc(100% - 6vw);
              height: auto;
              border-radius: 2vw;
              top: 34vh;
            }
          }
          video {
            width: 90%;
            border-radius: 1vw;
            height: 20vw;
            object-fit: cover;
          }
          .play {
            position: absolute;
            left: 20vw;
            top: 6vw;
            font-size: 8vw;
            color: #e4e4e4;
          }
          p {
            line-height: 1.25;
            font-size: 3.5vw;
            font-weight: bold;
          }
        }
      }
      .songs {
        padding: 2vw;
        li {
          font-size: 4vw;
          background: #d4d4d2;
          color: #444444;
          padding: 4vw 5vw;
          margin-bottom: 3vw;
          font-weight: bold;
          &.playing {
            color: white;
            background: #c54a43;
          }
          i {
            float: right;
            font-size: 6.5vw;
          }
        }
      }
    }
    .pagination {
      height: 5vh;
      text-align: center;
      font-size: 5vw;
      width: 100%;
      ul {
        li {
          display: inline-block;
          color: #c54a43;
          &.disabled {
            color: #d4d3d2;
          }
          &.page-dot {
            vertical-align: middle;
            background-color: #d4d3d2;
            width: 1.5vw;
            height: 1.5vw;
            margin: auto 0.5vw;
            border-radius: 0.75vw;
            margin-bottom: 0.75vw;
            &.active {
              background-color: #c54a43;
            }
          }
        }
      }
    }
  }
</style>


