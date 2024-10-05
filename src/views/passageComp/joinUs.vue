<script setup>
const toQQ = ()=>{
  window.location.href = `http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=L5YbP5lR9_e0Hgqu-TVZblv5bCVQW_cQ&authKey=4055Aq918nyTZpxqVZvo4p%2BxYcjAU7WgXOMYhVw0%2F8niow4vIwB9htXZ0mvffD2C&noverify=0&group_code=1150715981`
}
</script>

<template>
    <div id="joinBox">
      <h1>📋获取编写文档权限</h1>
      <p>您是否也想成为我们的一员，与我们共同编写并完善游戏文档？😎您可以加入我们的<span style="color:skyblue" @click="toQQ">官方群聊</span>来获取更多信息！💻</p>
    </div>
</template>

<style scoped>
#joinBox{
  width: 85%;
  min-height: 20vh;
  background-color: whitesmoke;
  margin: auto auto 10%;
  border-radius: 10%;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  h1{
    font-size: 1.5em;
    margin-left: 5%;
    margin-top: 5%;
  }
  p{
    width: 80%;
    margin: auto auto 5%;
  }
}
</style>