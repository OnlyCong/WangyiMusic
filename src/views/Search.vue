<template>
    <div>
        <input type="text" v-model="searchkey">
        <button @click="search">搜索</button>
        <ul>
            <router-link tag="li" 
            :to="{name:'Player',params:{id:item.id,name:item.name,image:encodeURIComponent(item.album.artist.img1v1Url)}}"
            v-for="(item, index) in searchdata" :key="index">{{ item.name + '-----' + item.artists[0].name }}</router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Search',
        data(){
            return {
                searchkey:'',
                searchdata:[]
            }
        },
        mounted(){
            
        },
        methods:{
            search(){
                this.$api.getSearch({keywords: this.searchkey, limit: 15}).then(res => {
                    this.searchdata = res.result.songs
                    console.log(res.result)
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    audio{
        background-color: black;
    }
</style>