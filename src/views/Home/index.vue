<template>
  <div class="home">
    <MusicList></MusicList>
    <MusicTabs></MusicTabs>
  </div>
</template>

<script>
// @ is an alias to /src
import MusicList from './MusicList.vue'
import MusicTabs from './MusicTabs.vue'
export default {
  name: 'Home',
  components: {
    MusicList,
    MusicTabs
  },
}
</script>

<style></style>