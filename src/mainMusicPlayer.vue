<template>
  <div class="page">
    <Head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato&display=swap" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css" />
    </Head>
    <h2 style="color:rgb(252, 249, 251);margin-top: 50%">刷累了吧，来听首歌？</h2>
    <MusicPlayer />
  </div>
</template>

<script>
import MusicPlayer from "./musicPlayer.vue";
export default {
  components: {
    MusicPlayer,
  },
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page {
  height: 40vh;
  width: fit-content;
  margin-right:auto;
  margin-left: auto;
  font-family: 'Lato', sans-serif;
}
</style>