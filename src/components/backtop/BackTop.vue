<template>
    <div class="th-back-top">
        <span class="bg-back2top2" v-show="show" @click="backtop"></span>
    </div>
</template>

<script>
    export default{
        name: 'BackTop',
        data(){
            return {
                show: false,
            }
        },
        created(){
            let winHeight = document.documentElement.clientHeight
            window.addEventListener('scroll', () => {
                let scrollHeight = document.documentElement.scrollTop
                if (scrollHeight > winHeight) this.show = true 
                else this.show = false
            })
        },
        methods:{
            backtop(){
                document.documentElement.scrollTop = 0
            }
        }
    }
</script>

<style scoped>
.th-back-top {
    position: fixed;
    right: 15px;
    bottom: 104px;
    height: 39px;
    width: 80px;
    z-index: 0;
    opacity: 0.8;
    text-align: right;
}

.bg-back2top2 {
    display: inline-block;
    background: url(https://pic.616pic.com/ys_bnew_img/00/07/07/iTstvNAUgL.jpg)
        no-repeat 0 0;
    -webkit-background-size: 39px 39px;
    background-size: 39px 39px;
    width: 39px;
    height: 39px;
}
</style>