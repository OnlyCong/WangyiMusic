<template>
    <div>
        <MusicListView id="3779629" :musiclist="newmusic"></MusicListView>
    </div>
</template>

<script>
    import MusicListView from "./MusicListView"
    export default {
        name: 'MusicList',
        data(){
            return{
                newmusic: [],
            }
        },
        components: {
            MusicListView,
        },
        created(){
            this.$api.getMusicList({
                id:3779629,
                limit: 6,
                offset: 0
            }).then(res => {
                this.newmusic = res.songs
            })
        }
    }
</script>

<style lang="less" scoped></style>