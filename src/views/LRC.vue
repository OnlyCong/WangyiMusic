<template>
    <div class="lrcContainer">
        <div class="lrc" ref="lrc">
            <p :class="{'active':currentTime > allkeys[index] && currentTime < allkeys[index+1]}"
            v-for="(item, key, index) in wordData" 
            :key="index" class="lrc-p">
                <span>{{ item }}{{ scrollLRC(index) }}</span>
            </p>
        </div>        
    </div>
</template>

<script>
    export default{
        name:"LRC",
        data(){
            return{
                wordData:'',
                allkeys:[],
            }
        },
        props:{
            id:{
                type:[String,Number],
                required: true
            },
            currentTime:{
                type:Number,
                default:0
            }
        },
        mounted(){
            this.$api.getLRC({id:this.id}).then(res => {
                this.wordData = res.lrc.lyric
                this.filterLRC(this.wordData)
            })
        },
        methods:{
            filterLRC(val){
                if (!val) return;
                const wordlist = {};
                const word = val.split('\n')
                const reg = /\[\d*:\d*(\.|:)\d*]/g
                for (let i=0; i<word.length; i++){
                    const timerRegArr = word[i].match(reg)
                    if (!timerRegArr) continue;
                    //获取歌词
                    const content = word[i].replace(timerRegArr,'')
                    //获取时间
                    const min = parseInt(timerRegArr[0].match(/\[\d*/i).toString().slice(1));
                    const sec = parseInt(timerRegArr[0].match(/\:\d*/i).toString().slice(1)) 
                    const time = min * 60 + sec
                    wordlist[time] = content
                }
                this.wordData = wordlist
                this.getAllKeys(wordlist)
            },//数据过滤
            getAllKeys(arr){
                for (let key in arr) this.allkeys.push(key)
            },
            scrollLRC(index){
                if (this.currentTime > this.allkeys[index] && this.currentTime < this.allkeys[index+1]) {
                    this.$refs.lrc.style.top = -(30 * (index - 2)) + 'px'
                }
            }
        }
    }
</script>

<style scoped>
.active {
    color: red;
}

.lrcContainer {
    width: 100%;
    height: 150px;
    overflow: scroll;
    position: relative;
}

.lrc {
    width: 100%;
    position: absolute;
    top: 0;
}

.lrc-p {
    height: 30px;
    line-height: 30px;
}

.up30 {
    margin-top: -30px;
}
</style>