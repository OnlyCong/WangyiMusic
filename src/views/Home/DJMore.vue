<template>
    <div class="list clearfix">
        <div class="header">
            <router-link to="/" tag="span">&lt;</router-link>
        </div>
        <div class="item" v-for="(item, index) in DjList" :key="index" :class="{ 'clear-padding': index%3 !== 1}">
            <div class="img-warpper">
                <img :src="item.picUrl" alt="">
            </div>
            <div class="main">{{ item.name }}</div>
            <div class="gray">{{ cutString(item.desc) }}</div>
        </div>
        <div ref="more" class="header">{{ more }}</div>
    </div>
</div>
</template>

<script>
    export default{
        name:"DJMore",
        data(){
            return {
                DjList:[],
                hasMore: false,
                more: '加载更多'
            }
        },
        mounted() {
            this.http();
            //触发加载更多事件
            let timer = null;//加入定时器节流与防抖
            const currentHeight = document.documentElement.clientHeight;//当前视口高度
            // console.log(currentHeight)
            window.addEventListener('scroll', () => {
                if (this.$refs.more) {
                    let scrollHeight = this.$refs.more.getBoundingClientRect().top;//div距浏览器窗口顶端的距离
                    if (timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(() => {
                        if (currentHeight > scrollHeight){
                            this.more = '没有更多数据了!' 
                        }
                    }, 300)
                }   
            })
        },
        methods:{
            cutString(str){
                if(str.length > 8){
                    return str.substring(0,10)+'...'
                } else return str
            },
            http(){
                this.$api.getDjCatetory({type: this.$route.params.id}).then(res => {
                    console.log(res)
                    this.DjList = res.djRadios
                    this.hasMore = res.hasMore
                })
            }
            
        }
    }
</script>

<style scoped>
    .header {
        width: 100%;
        background: #fff;
        overflow: hidden;
        text-align: center;
        clear: both;
    }
    .header span {
        display: block;
        float: left;
        line-height: 40px;
    }
    .header h3 {
        display: inline-block;
        line-height: 40px;
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