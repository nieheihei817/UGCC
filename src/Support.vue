<script setup>
const zanzhu = ()=>{
  window.location.href = `https://afdian.com/a/ugcca`
}
import mainMusicPlayer from "./mainMusicPlayer.vue";
</script>

<template>

  <div id="supportOuterBox" >
    <div id="supportTitle" class="bounce-animation">
      <h2>✨</h2>
      <h1>支 持 者 榜</h1>
      <h2>✨</h2>
    </div>

    <ul id="supportLst">
      <li>
        <img src="https://pic.imgdb.cn/item/66e6a16bd9c307b7e97d7c7d.jpg">
        <div class = "info">
          <h2>11</h2>
          <p>本月投喂:10￥</p>
        </div>
      </li>
      <li>
        <img src="https://pic.imgdb.cn/item/66e6a92fd9c307b7e98b3ad4.jpg">
        <div class = "info">
          <h2>TSL_天之T☭</h2>
          <p>本月投喂:10￥</p>
        </div>
      </li>
      <li>
        <img src="https://pic.imgdb.cn/item/66e6a954d9c307b7e98b592d.png">
        <div class = "info">
          <h2>1145141919810</h2>
          <p>本月投喂:5￥</p>
        </div>
      </li>
    </ul>

    <h3 style="margin: auto;width: fit-content;color: whitesmoke">注：同金额投喂排名不分先后</h3>
    <p id="des">UGCC联盟由衷感谢以上所有支持者，并向你们致以最高的敬意。正是因为有了这些热爱者对我们的鼓励与陪伴，我们才能在如今为大家不断提供优质内容和服务！</p>
    <button id="zanzhu" @click.stop="zanzhu">赞助一下</button>
    <main-music-player></main-music-player>

  </div>
</template>

<style scoped lang="scss">
#supportTitle{
  display: flex;
  h2{
    font-size: 1.8em;
  }
  h1{
    font-size: 2em;
    font-weight: bold;
    background: linear-gradient(45deg,#00dbde,#fc00ff ); /* 渐变背景 */
    -webkit-background-clip: text; /* 背景裁剪到文字 */
    -webkit-text-fill-color: transparent; /* 使文字填充透明 */
    background-clip: text; /* 支持非 Webkit 浏览器 */
    color: transparent; /* 使文字颜色透明 */
  }
  margin: 8% auto 4%;
  width: fit-content;

}
#supportOuterBox{
  background-image: url("https://pic.imgdb.cn/item/66e6aaf1d9c307b7e98cb16d.png");
  background-attachment: fixed;
  background-position: center center; /* 背景图片居中对齐 */
  background-size: cover;
  background-repeat: no-repeat;
  border: 0.1px solid transparent;
  min-height: 100vh;
}
#supportLst{
  width: 90%;
  margin: auto;
  padding: 5%;
  li{
    p{
      font-size: 1.2em;
    }
    margin-bottom: 5%;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.1); /* 半透明背景 */
    backdrop-filter: blur(10px); /* 毛玻璃效果 */
    -webkit-backdrop-filter: blur(10px); /* 兼容 Safari */
    border-radius: 15px; /* 圆角 */
    padding: 4%;
    width: 90%;
    color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 阴影效果 */
    border: 1px solid rgba(255, 255, 255, 0.2); /* 边框效果 */
    h2{
      font-weight: bold;
      background: linear-gradient(45deg, #00c3ff, #ffff1c); /* 渐变背景 */
      -webkit-background-clip: text; /* 背景裁剪到文字 */
      -webkit-text-fill-color: transparent; /* 使文字填充透明 */
      background-clip: text; /* 支持非 Webkit 浏览器 */
      color: transparent; /* 使文字颜色透明 */
    }
    img{
      width: 24%;
      border-radius: 50%;
    }
    .info{
      margin-left: 5%;
      width: 85%;
    }
  }
}
#des{
  color: #c0ebd7;
  font-weight: bold;
  font-size: 1.2em;
  margin-top: 5vh;
  margin-left: auto;
  margin-right: auto;
  width: 80vw;
}
.bounce-animation {
  animation: bounce 1s infinite;
  animation-timing-function: ease-in-out;
}

@keyframes bounce {
  0% { transform: translateY(0); }
  25% { transform: translateY(-25px); }
  50% { transform: translateY(0); }
  75% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}
#zanzhu{
  margin: auto;
  border:none;
  outline: none;
  width: 6rem;
  height: 2.5rem;
  border-radius: 5rem;
  background: linear-gradient(
          135deg, /* 角度 */
          #348F50,
          #56B4D3
  );
  color: white;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .5s;
}
#zanzhu:active{
  width: 4rem;
  background-color: gray;
  color: transparent;
}
</style>