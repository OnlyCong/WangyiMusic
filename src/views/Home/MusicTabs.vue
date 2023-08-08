<template>
    <div class="tabs">
        <tabs :defaultActiveKey="defaultActiveKey" @callback="setActiveKey">
            <tab :label="title[index].title" :index="(index+1).toString()" v-for="(item, index) in djDatas" :key="index">
              <div class="panel hotsongs on">
                <ul class="list">
                    <li class="song url" v-for="(element, num) in item.djRadios" :key="num">
                        <div class="poster">
                            <img :src="element.picUrl" alt />
                        </div>
                        <div class="info">
                            <div class="name">{{ element.desc }}</div>
                            <div class="author">{{ element.name }}</div>
                        </div>
                    </li>
                </ul>
                <router-link tag="div" 
                :to="{name:'DJMore', params:{id:title[index].id}}"
                class="more-songs">
                {{ title[index].title }}加载更多
                </router-link>
                <!-- :to="`/DjMore/${title[index].id}`"一样的效果 -->
              </div>
            </tab>
        </tabs>
    </div>
</template>

<script>
    import axios from '@/utils/request.js'
    export default{
        name: "MusicTabs",
        data(){
            return {
            defaultActiveKey:'1',
            djDatas: [],
            title:[
                {
                    id:2,
                    title:'情感故事'
                },

                {
                    id:3,
                    title:'情感调频'
                },
                {
                    id:5,
                    title:'人文历史'
                }
            ]
            }
        },
        mounted(){
            //合并网络请求
            const that = this
            function getDj1(){
                return that.$api.getDjCatetory({type:2});
            }
            function getDj2(){
                return that.$api.getDjCatetory({type:3});
            }
            function getDj3(){
                return that.$api.getDjCatetory({type:5});
            }
            axios.all([getDj1(), getDj2(), getDj3()]).then(
                axios.spread((dj2, dj3, dj5) => {
                    console.log(dj5)
                    this.djDatas.push(dj2, dj3,dj5)
            }))
        },
        methods:{
            setActiveKey(index){
            this.defaultActiveKey = index
            }
        }
    }
</script>

<style scoped>
    .tabs {
        padding: 10px;
        background: #fff;
    }
    .musictop {
        background: #fff;
        padding: 10px;
    }

    .panel {
        border-top: 1px solid #eee;
        position: relative;
        top: -1px;
        display: block;
        background: #fff;
    }

    .list {
        padding-top: 0;
        height: 450px;
    }

    .panel .list li {
        height: 60px;
        border-bottom: 1px solid #eee;
        padding-left: 0;
        display: flex;
        padding-top: 10px;
    }

    .panel .list li .poster {
        position: relative;
        width: 45px;
        margin-right: 8px;
    }

    .panel .list li .poster img {
        border: 1px solid #eee;
    }
    .info {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .info .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        color: #333;
    }

    .info .author {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        color: #999;
        margin-top: 2px;
    }

    .more-songs {
        color: #999;
        margin-top: 9px;
        font-size: 12px;
        text-align: center;
        height: 32px;
        line-height: 32px;
    }
</style>