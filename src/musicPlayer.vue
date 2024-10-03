<template>
  <div :class="['musicContainer', { isPlay }]">
    <div class="musicInfo">
      <div class="musicTitle">{{ curMusic.title }}</div>
      <div class="progressContainer" ref="progressContainer" @click="setProgress">
        <div class="progress" :style="{ width: curProgress }"></div>
      </div>
    </div>
    <div class="musicCover">
      <img :src="curMusic.cover" alt="" />
    </div>
    <div class="musicControls">
      <div class="actionBtn" @click="changeSong('pre')">
        <i class="fas fa-backward"></i>
      </div>
      <div :class="['actionBtn', 'actionBtnBig']" @click="playSong">
        <i :class="`fas ${isPlay ? 'fa-pause' : 'fa-play'}`"></i>
      </div>
      <div class="actionBtn" @click="changeSong('next')">
        <i class="fas fa-forward"></i>
      </div>
    </div>
    <audio ref="audio" :src="curMusic.link" @timeupdate="updateProgress" @ended="changeSong('next')"></audio>
  </div>
</template>

<script>
import lost_umbrella from '../public/music/lost_umbrella.mp3'
import AZURE_SKIES from '../public/music/azure_skies.mp3'
import jtu from '../public/music/jtu.mp3'
import rose from '../public/music/rose.mp3'
const musicList = [
  {
    title: 'LOST UMBRELLA',
    link: lost_umbrella,
    cover: 'https://pic.imgdb.cn/item/66e6c1d9d9c307b7e9ad470e.png'
  },
  {
    title: 'AZURE SKIES',
    link: AZURE_SKIES,
    cover: 'https://pic.imgdb.cn/item/66e6c1f7d9c307b7e9ad5fd1.jpg'
  },
  {
    title: 'JUST THE TWO OF US',
    link: jtu,
    cover: 'https://pic.imgdb.cn/item/66e6be9dd9c307b7e9a4a5a2.png'
  },
  {
    title: 'ROSE',
    link: rose,
    cover: 'https://pic.imgdb.cn/item/66e6c03fd9c307b7e9a9d3c6.png'
  },
]
export default {
  data() {
    return {
      isPlay: false,
      curMusic: {},
      curIndex: 0,
      curProgress: '0%',
    };
  },
  methods: {
    playSong() {
      const audio = this.$refs.audio;
      this.isPlay ? audio.pause() : audio.play()
      this.isPlay = !this.isPlay;
    },
    changeSong(cmd) {
      if (cmd === 'pre') {
        this.curIndex--
        if (this.curIndex < 0) this.curIndex = musicList.length - 1
      }
      else if (cmd === 'next') {
        this.curIndex = (this.curIndex + 1) % musicList.length
      }
      this.curMusic = musicList[this.curIndex]
      if (cmd ==='cur') return

      this.isPlay = true
      this.$nextTick(() => {
        this.$refs.audio.play();
      });
    },
    updateProgress(e) {
      const { duration, currentTime } = e.target;
      const progressPercent = (currentTime / duration) * 100;
      this.curProgress = `${progressPercent}%`;
    },
    setProgress(e) {
      const width = this.$refs.progressContainer.clientWidth;
      const clickX = e.offsetX;
      const duration = this.$refs.audio.duration;
      this.$refs.audio.currentTime = (clickX / width) * duration;
    },
  },
  mounted() {
    this.changeSong('cur');
  },
};
</script>

<style lang="less">
.musicContainer {
  position: relative;
  margin-top: 80px;
  padding: 20px 30px;
  height: 100px;
  width: 95vw;
  background: linear-gradient(45deg,#43cea2,#185a9d);
  border-radius: 15px;
  box-shadow: 0 18px 18px 0 rgba(8, 182, 212, 0.822);
  display: flex;
  z-index: 10;
}

.musicInfo {
  position: absolute;
  top: 0;
  left: 5vw;
  width: 80vw;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px 15px 0 0;
  padding: 10px 10px 10px 150px;
  opacity: 0;
  transform: translateY(0%);
  transition: transform 0.3s ease-in, opacity 0.3s ease-in;

  .musicTitle {
    font-size: 16px;
    line-height: 22px;
  }

  .progressContainer {
    margin: 10px 0;
    height: 4px;
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    cursor: pointer;

    .progress {
      height: 100%;
      width: 0%;
      background-color: #0decfc;
      border-radius: inherit;
      transition: width 0.1s linear;
    }
  }
}

.musicCover {
  position: relative;
  top: -50px;
  width: 110px;
  height: 110px;
  margin-right: 30px;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #fff;
  }

  img {
    height: inherit;
    width: inherit;
    border-radius: 50%;
    object-fit: cover;
    animation: rotate 3s linear infinite;
    animation-play-state: paused;
  }
}

.musicControls {
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  .actionBtn {
    background-color: transparent;
    color: #0decfc;
    cursor: pointer;
    font-size: 20px;
    padding: 10px;
    margin: 0 15px;
  }

  .actionBtnBig {
    color: #0cdae9;
    font-size: 30px;
  }
}

// 播放状态
.musicContainer.isPlay {
  .musicInfo {
    opacity: 1;
    transform: translateY(-100%);
  }

  .musicCover {
    img {
      animation-play-state: running;
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>