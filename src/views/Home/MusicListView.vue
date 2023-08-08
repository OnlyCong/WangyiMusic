<template>
    <div class="collection-block">
        <div class="block-padding">
            <div class="title">
                <h3>新歌榜</h3>
                <router-link :to="`/more/${id}`">更多</router-link>
            </div>
            <div class="list clearfix">
                <router-link tag="div" 
                :to="`/play/${item.id}/${item.name}/${item.ar[0].name}/${setUrl(item.al.picUrl)}`" 
                class="item" v-for="(item,index) in musiclist" 
                :key="index" 
                :class="{ 'clear-padding': index%3 !== 1 }">
                    <div class="img-warpper">
                        <img :src="item.al.picUrl" alt="">
                    </div>
                    <div class="main">{{ item.name }}</div>
                    <div class="gray">{{ item.ar[0].name }}</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MusicListView',
        props: {
            musiclist: {
                type: Array,
                default: () => [],
            },
            id:{
                type:String,
                defaults: 1
            }
        },
        methods:{
            setUrl(url){
                if(url){
                    return encodeURIComponent(url)//转码url(路由传参、前后端交互)
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .collection-block {
    background-color: #f8f8f8;
    padding: 5px 0;
    }

    .block-padding {
        padding: 10px 17px;
        background-color: #fff;
    }

    .title {
        display: flex;
        margin: 14px 0 18px;
    }

    .title ::-webkit-scrollbar {
        background-color:#fff
    }

    .title h3 {
        flex: 1 1 0%;
        display: block;
        font-weight: 700;
        font-size: 20px;
    }

    .list {
        width: 100%;
    }

    .list .item {
        float: left;
        width: 31.33%;
        padding: 0 10px;
        margin-bottom: 10px;
    }

    .clear-padding {
        padding: 0 !important;
    }

    .main {
        margin-top: 4px;
        font-size: 12px;
    }

    .gray {
        font-size: 12px;
        color: #999;
    }

    .btn-more {
        font-size: 12px;
        text-align: right;
        color: #333;
    }
</style>