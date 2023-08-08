<template>
    <!-- <div>        
        <div class="header">
            <router-link to="/" tag="span">&lt;</router-link>
            <h3>更多歌曲</h3>
        </div>
        <div class="list clearfix">
            <router-link tag="div" 
            :to="`/play/${item.id}/${item.name}/${item.ar[0].name}/${setUrl(item.al.picUrl)}`" 
            class="item" v-for="(item,index) in moreDatas" 
            :key="index" 
            :class="{ 'clear-padding': index%3 !== 1 }">
                <div class="img-warpper">
                    <img :src="item.al.picUrl" alt="">
                </div>
                <div class="main">{{ cutString(item.name) }}</div>
                <div class="gray">{{ item.ar[0].name }}</div>
            </router-link>
        </div>
        <div class="header" ref="loadmore">正在加载中...</div>
    </div> -->
    
    <div class="music-list flex-col">
        <template>
            <div class="list-item list-header">
                <!-- <router-link to="/" tag="span">&lt;</router-link> -->
                <span @click="$router.back()">&lt;</span>
                <span class="list-name">歌曲</span>
                <span class="list-artist">歌手</span>
                <span class="list-time">删除</span>
            </div>
            <div ref="listContent" class="list-content" @scroll="listScroll($event)">
                <!-- <router-link tag="div" 
                :to="`/play/${item.id}/${item.name}/${item.ar[0].name}/${setUrl(item.al.picUrl)}`" 
                class="list-item"
                v-for="(item, index) in moreDatas" 
                :key="index">
                <span class="list-num">{{ index+1 }}</span>
                    <div class="list-name">
                        <span>{{ item.name }}</span>
                    </div>
                    <span class="list-artist">{{ item.ar[0].name }}</span>
                    <span class="list-time">X</span>
                </router-link> -->

                <div class="list-item" v-for="(item, index) in moreDatas" :key="item.id" @click="play(item.id, index)">
                    <span class="list-num" 
                    :class="{active: isActive === index}" 
                    v-text="isActive === index ? '' : index+1"></span>
                    <div class="list-name">
                        <span>{{ item.name }}</span>
                    </div>
                    <span class="list-artist">{{ item.ar[0].name }}</span>
                    <span class="list-time">X</span>
                </div>
                <div ref="loadmore"  class="more">加载更多...</div>
                <!-- <div class="audioplay"> -->
                <router-link tag="div"
                :to="urldress"
                class="audioplay">
                  <img src="@/assets/img.png" alt="" v-if="!currentItem">
                  <img :src="imgurl" alt v-else />
                  <img src="@/assets/pre.png" alt="" class="pre" @click.stop="pre">
                  <div class="bigger">
                    <div v-if="!currentItem" style="height: 20px; margin: 5px 20px;">暂无播放</div>
                    <div v-else style="height: 20px; margin: 5px 20px;">
                      {{ currentItem.name + '  /  ' + currentItem.ar[0].name }}
                    </div>
                    <audio ref="musicplayer" :src="mp3Url" controls autoplay style="width: 100%; height: 30px;" @ended="next()"></audio>
                  </div>
                  <img src="@/assets/next.png" alt="" class="pre" @click.stop="next">
                </router-link>
                <!-- </div> -->
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'More',
        data(){
            return {
                moreDatas:[],
                offset: 0,
                mp3Url: '',
                isActive: -1,
                currentItem: null,
                urldress: '',
            }
        },
        filters: {
            format(value) {
                let minute = Math.floor(value / 60)
                let second = Math.floor(value % 60)
                return `${addZero(minute)}:${addZero(second)}`
            }
        },
        mounted(){
            this.http();
            console.log(this.moreDatas)
        },
        methods:{
            http(offset){
                this.$api.getMusicList({
                    id: this.$route.params.id,
                    limit: 20,
                    offset: this.offset
                }).then(res => {
                    if (res.songs.length) {
                        this.moreDatas.push(...res.songs);
                    this.offset += 20;
                    } else {
                        this.$refs.loadmore.innerHTML = '别拽了，没有数据了!'
                    }
                })
            },
            listScroll(e){
              const {scrollTop, scrollHeight, offsetHeight } = e.target
                if (scrollTop + offsetHeight >= scrollHeight) {
                  this.http();
                }
            },//触发加载更多事件
            play(itemId, index){
              this.$api.getPlayer({id: itemId}).then(res => {
                this.mp3Url = res.data[0].url;
              })
              this.isActive = index
              this.currentItem = this.moreDatas[index]
              this.imgurl = this.currentItem.al.picUrl
              this.urldress = `/play/${this.currentItem.id}/${this.currentItem.name}/${this.currentItem.ar[0].name}/${this.setUrl(this.currentItem.al.picUrl)}`
            },
            // goOn(){
            //   this.$refs.musicplayer.addEventListener('ened', () => {
            //     if (this.$refs.musicplayer.ended) this.next();
            //   })
            // },
            pre(){
              if (this.isActive < 0) {
                alert('当前无音乐');
                return;
              }
              this.isActive--;
              this.currentItem = this.moreDatas[this.isActive]
              let preid = this.currentItem.id;
              this.play(preid, this.isActive);
            },
            next(){
              this.isActive++;
              if (this.isActive >= this.moreDatas.length) this.isActive = 0;
              this.currentItem = this.moreDatas[this.isActive]
              let nextid = this.currentItem.id;
              this.play(nextid, this.isActive);
            },
            setUrl(url){
                if(url){
                    return encodeURIComponent(url)//转码url(路由传参、前后端交互)
                }
            },
            geturl(){
              if(this.currentItem) return this.currentItem.al.picUrl
            },
        }
    }
</script>

<style lang="less" scoped>
span {
  display: block;
  float: left;
  line-height: 40px;
  margin-left: 15px;
}
.music-list {
  height: 100%;
  color:#fff;
  background: url('@/assets/img.jpg') no-repeat center;
  background-color: hsla(0, 0%, 58%, 0.5);
}

.list-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.8);
  color: @text_color_active;

  .list-name {
    padding-left: 20px;
    user-select: none;
  }
}

.list-content {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 60px;
}

.list-no {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: @text_color;
}

.list-item {
  display: flex;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid hsla(0,0%,100%,.1);
  line-height: 50px;
  overflow: hidden;

  &.list-item-no {
    justify-content: center;
    align-items: center;
  }

  &.on {
    color: #fff;

    .list-num {
      font-size: 0;
      background: url('../../../src/assets/wave.gif') no-repeat center center;
    }
  }

  &:hover {
    .list-name {
      padding-right: 80px;

      .list-menu {
        display: block;
      }
    }
  }

  &:not([class*='list-header']):hover {
    .list-name {
      padding-right: 80px;

      .list-menu {
        display: block;
      }
    }

    .list-time {
      font-size: 24px;

      .list-menu-icon-del {
        display: block;
      }
    }
  }

  .list-num {
    display: block;
    width: 30px;
    margin-right: 10px;
    text-align: center;
  }

  .active{
    background: url('@/assets/wave.gif') no-repeat center center;
  }

  .list-name {
    position: relative;
    flex: 1;
    box-sizing: border-box;

    & > span {
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    small {
      margin-left: 5px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
    }

    /*hover菜单*/

    .list-menu {
      display: none;
      position: absolute;
      top: 50%;
      right: 10px;
      height: 40px;
      font-size: 0;
      transform: translateY(-50%);
    }
  }

  .list-artist,
  .list-album {
    display: block;
    width: 300px;
    .no-wrap();
    @media (max-width: 1440px) {
      width: 200px;
    }
    @media (max-width: 1200px) {
      width: 150px;
    }
  }

  .list-time {
    display: block;
    width: 60px;
    position: relative;
    text-align: center;

    .list-menu-icon-del {
      display: none;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }
}

.list-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  span {
    padding: 5px 20px;
    cursor: pointer;
    user-select: none;
    &:hover {
      color: @text_color_active;
    }
  }
}

@media (max-width: 960px) {
  .list-item .list-name {
    padding-right: 70px;
  }
}

@media (max-width: 768px) {
  .list-item {
    .list-name .list-menu {
      display: block;
    }

    .list-artist,
    .list-album {
      width: 20%;
    }
  }
}

@media (max-width: 640px) {
  .list-item {
    .list-artist {
      width: 80px;
    }

    .list-album,
    .list-time {
      display: none;
    }
  }
}
.more {
        width: 100%;
        overflow: hidden;
        text-align: center;
        clear: both;
    }
  .audioplay {
    display: flex;
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 50px;
  }
  img{
    width: 9%;
    height: 100%;
  }
  .pre{
      border-radius: 32px;
    }
  .bigger{
    width: 73%;
    background-color: #fff;
    color: black;
    border-radius: 12px;
  }

</style>