<template>
    <div>
        <span>榜单</span>
        <!--播放器-->
    <div class="music-bar">
        <div class="music-bar-btns">
          <div class="pointer" type="prev" :size="36" title="上一曲 Ctrl + Left">then</div>
          <div class="control-play pointer" title="播放暂停 Ctrl + Space">
            <div>播放</div>
          </div>
          <div class="pointer" type="next" title="下一曲 Ctrl + Right">next</div>
        </div>
        <div class="music-music">
          <div class="music-bar-info">
            <template>
              歌名
              <span>歌手</span>
            </template>
            <!-- <template>欢迎使用mmPlayer在线音乐播放器</template> -->
          </div>
          <div class="music-bar-time"></div>
          <div class="music-progress">_________</div>
        </div>
  
        <!-- 播放模式 -->
        <div class="icon-color pointer mode">播放</div>
  
        <!-- 评论 -->
        <div class="icon-color pointer comment" type="comment">评论</div>
  
        <!-- 音量控制 -->
        <div class="music-bar-volume" title="音量加减 [Ctrl + Up / Down]">
          volume
        </div>
      </div>
  
      <!--遮罩-->
      <div class="mmPlayer-bg" :style="{ backgroundImage: '@/assets/img/png' }"></div>
      <div class="mmPlayer-mask"></div>
    </div>
    </div>
</template>

<script>
    export default {
        name: 'Topic',
    }
</script>

<style lang="less" scoped>
.music-bar {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 15px 0;
    color: #fff;
    &.disable {
      pointer-events: none;
      opacity: 0.6;
    }
    .icon-color {
      color: #fff;
    }
    .music-bar-btns {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 180px;
      .control-play {
        .flex-center;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        color: #fff;
        background-color: rgba(255, 255, 255, 0.3);
      }
    }

    .flex-center;
    .btn-prev {
      width: 19px;
      min-width: 19px;
      height: 20px;
      background-position: 0 -30px;
    }
    .btn-play {
      width: 21px;
      min-width: 21px;
      height: 29px;
      margin: 0 50px;
      background-position: 0 0;
      &.btn-play-pause {
        background-position: -30px 0;
      }
    }
    .btn-next {
      width: 19px;
      min-width: 19px;
      height: 20px;
      background-position: 0 -52px;
    }
    .music-music {
      position: relative;
      width: 100%;
      flex: 1;
      box-sizing: border-box;
      padding-left: 40px;
      font-size: @font_size_small;
      color: @text_color_active;
      .music-bar-info {
        height: 15px;
        padding-right: 80px;
        line-height: 15px;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .music-bar-time {
        position: absolute;
        top: 0;
        right: 5px;
      }
    }
    .mode,
    .comment,
    .music-bar-volume {
      margin-left: 20px;
    }

    // 音量控制
    .volume-wrapper {
      margin-left: 20px;
      width: 150px;
    }
  }

  /*遮罩*/
  .mmPlayer-mask,
  .mmPlayer-bg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  .mmPlayer-mask {
    z-index: -1;
    background-color: @mask_color;
  }

  .mmPlayer-bg {
    z-index: -2;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(12px);
    opacity: 0.7;
    transition: all 0.8s;
    transform: scale(1.1);
  }

  @media (min-width: 960px) {
    .close-lyric {
      display: none;
    }
  }

  //当屏幕小于960时
  @media (max-width: 960px) {
    .music-right {
      display: none;
      &.show {
        display: block;
        margin-left: 0;
        width: 100%;
      }
    }
  }
  //当屏幕小于768时
  @media (max-width: 768px) {
    padding: 75px 15px 5px 15px;

    .music-bar {
      padding-top: 10px;
      .music-bar-info span,
      .music-bar-volume .mmProgress {
        display: none;
      }
    }
  }
  //当屏幕小于520时
  @media (max-width: 520px) {
    .music-bar {
      position: relative;
      flex-direction: column;
      .music-bar-btns {
        width: 60%;
        margin-top: 10px;
        order: 2;
      }
      .music-music {
        padding-left: 0;
        order: 1;
      }
      .mode,
      .comment {
        position: absolute;
        bottom: 20px;
        margin: 0;
      }
      .mode {
        left: 5px;
      }
      .comment {
        right: 5px;
      }
      .music-bar-volume {
        display: none;
      }
  }
}
</style>