<script setup>
import music from "/music(1) 00_00_08-.mp3"
import {ref} from "vue";
const mu = ref(null)
const handleclick = ()=>{
  mu.value.play()
}
</script>

<template>
  <div>
  <div id="content">
    <h1>向伟大的抗癌斗士致敬</h1>
    <div class="container">
      <img src="https://pic.imgdb.cn/item/6649bcfcd9c307b7e91b1498.jpg">
    </div>

    <p>近期，我们得知了一个不幸的消息，我们的联盟管理员之一————<span style="font-style: italic">“LingChen凌辰”</span>在早些时候患上了<mark>胃癌</mark>，且目前已发展至<mark>晚期</mark></p>
    <p>对于她的不幸遭遇我们深表同情与关心，目前她在进行了<mark>一段时间的化疗后</mark>，病情<mark>仍然未见好转</mark>，反而更加严重，她本人也已开始接受进一步治疗</p>
    <p>这是一个相当漫长痛苦且耗费金钱的过程，但尽管如此，她却并不畏病魔，顽强地与其斗争，并展现出了常人所难以表现的强大乐观心态</p>
    <p>联盟想对你说的是：
      <p style="font-style: italic;color: skyblue">
        凌辰，你不是在一个人孤身奋战，也请不要过于担心病痛的折磨。虽然我们因互联网的限制而远隔千里，甚至素未谋面，但我们永远会支持你，如果你有任何需要，我们也将尽自己最大所能为你提供援助，并号召外界一同来帮助你
        对抗病魔。一切都会好起来的，黑暗的尽头必然是明亮的曙光，凡是杀不死你的，必将让你变得更加强大！
      </p>
      <p style="font-style: italic;color: skyblue">
        <span id="comeon">加油，凌辰！</span>且听那千百余人在为你呐喊助威，我们与你同在，小小疾病又怎会击垮你顽强的意志！我们相信你一定能好起来的！！
        我们等你凯旋归来，彼时我们将欢声笑语，共同畅谈，重新回到你在联盟的那段美好时光！
      </p>
    </p>
    <p style="font-style: oblique">
      死神，你莫骄傲，尽管有人将你看得<br><br>

      如何强大，如何可怖，你呀，名不符实;<br><br>

      你自以为已经把芸芸众生毁灭，<br><br>

      可怜的死神，他们没死，你至今还杀不死我;<br><br>

      休憩和睡眠，其实就是你的写照，<br><br>

      你是命运，时机，君主和狂徒的奴隶，<br><br>

      你与毒药，战争和病魔同流合污，<br><br>

      鸦片与巫术也能灵验地进行蛊惑，<br><br>

      而且效果更佳，你又何必颐指气使?<br><br>

      　人们小憩一会，精神便得以永远清朗，<br><br>

      　便再不会有死亡，死神你自己将死亡。<br><br>
      ————《神圣十四行诗》
    </p>
    <p style="color: #2ebf91">最后，谨代表捏嘿嘿，我想送你一首歌，希望它能陪伴你战胜病魔，并使你振作起来！加油，凌辰，我们相信你！！</p>
    <audio :src="music" ref="mu"></audio>
    <button @click="handleclick">点此播放</button>
    <p style="font-size: 0.8em;font-style: oblique">
      if you live for somethin'<br>
      如果你活的有所理想<br><br>
      You're not alone my friend<br>
      你就不会孤独，朋友<br><br>
      So fill up your cup and lift your lighter<br>
      所以通过苦难磨练你自己吧，高举火把<br><br>
      A toast to life<br>
      为了生活干杯<br><br>
      They say what don't kill me can make me stronger<br>
      他们说杀我不死，令我更强<br><br>
      So two drinks a night should help me live longer<br>
      所以一夜喝两杯酒会帮我长寿<br><br>
      I blow some smoke to give my lungs a test<br>
      我吸烟仅仅是为了锻炼我的肺<br><br>
      Because why tip-toe through life to arrive safely at death<br>
      为什么一生要小心翼翼，为了得以善终吗<br><br>
      I'm on a journey yeah I'm on a roll<br>
      我充满渴望，我势如破竹<br><br>
      Sometimes I gotta close my eyes just to open my soul<br>
      有时我闭上双眼，敞开我的魂魄<br><br>
      And tonight is the night I gotta feeling I'm about to act a fool<br>
      今晚是时候了，我会细细品味扮演一位愚人<br><br>
      So if you go fix some drinks me and Usher 'bout to break some rules<br>
      所以如果你为我调一杯饮料Usher我便会干点出格的趣事<br><br>
      That's somewhere and gone  but the world is moving slow<br>
      目的地很明确但世界在不断运动<br><br>
      I was born for the fast life<br>
      我的人生生来完美<br><br>
      I go for broke  a lesson I can't afford<br>
      我追求一切不会在此堕落<br><br>
      But for what it's worth I'm ready to pay<br>
      但是为了更加有意义我已经准备好继续进行<br><br>
      For the rest of my life<br>
      我的余生<br><br>
      For the rest of my life<br>
      我的余生<br><br>
      If I got one life to live  I'mma party 'til I'm dead<br>
      如果我能度过一生，我会将聚会进行到底<br><br>
      What the hell is a life worth living if it's not on the edge<br>
      如果生活不处于叛逆的边缘活着有什么意思<br><br>
      Trying to keep my balance  I'm twisted so just in case I fall<br>
      试着维持劳逸结合，我之所以舞动是为了防止沦落<br><br>
      Written on my tombstone should say "Women  W**d  and Alcohol"<br>
      在我的墓碑上刻下，女人在抽烟喝酒方面赢了<br><br>
      That's somewhere and gone  but the world is moving slow<br>
      目的地很明确但世界在不断运动<br><br>
      I was born for the fast life<br>
      我的人生生来完美<br><br>
      I go for broke  a lesson I can't afford<br>
      我追求一切不会在此堕落<br><br>
      But for what it's worth I'm ready to pay<br>
      但是为了更加有意义我已经准备好继续进行<br><br>
      For the rest of my life<br>
      我的余生<br><br>
      For the rest of my life<br>
      我的余生<br><br>
      If you live for somethin'<br>
      如果你活的有所理想<br><br>
      You're not alone my friend<br>
      你就不会孤独，朋友<br><br>
      So fill up your cup and lift your lighter<br>
      所以通过苦难磨练你自己吧，高举火把<br><br>
      A toast to life<br>
      为了生活干杯<br><br>
      I'm stuck in this moment  freeze the hands of time<br>
      我在此刻沉沦，定格忙碌的生活节奏<br><br>
      Cause I feel inner peace when I'm out of my mind<br>
      因为我在神游天外时能感受到内心的平静<br><br>
      And you can call me crazy  but I like to roll the dice<br>
      你可以把我当做疯子但我喜欢掌握自己的命运之骰<br><br>
      So I'm willing to bet that I'mma be crazy for the rest of my life<br>
      所以我祈求我会在余生疯狂一把，我的余生<br><br>
      For the rest of my life<br>
      我的余生<br><br>
      For the rest of my life<br>
      我的余生<br><br>
    </p>
  </div>
  </div>
</template>

<style scoped>
#content {
  margin-left: 6vw;
  margin-right: 5vw;
}
@keyframes flag {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
#comeon{
  animation: flag infinite alternate 1s;
  color: red;
  font-size: 2em;
}
.container{
  display: inline-block;
  margin-bottom: 3vh;
}
.container img{
  display: inline-block;
  margin-top: 5%;
  margin-left: 26vw;
  width: 30vw;
  height: 30vw;
  border-radius: 50%;
  box-shadow:
      3px 3px 10px 0px hsl(300deg, 100%,50%), /* 渐变颜色1，右下角 */
      3px -3px 10px 0px hsl(200deg,100%,50%), /* 渐变颜色2，右上角 */
      -3px -3px 10px 0px hsl(100deg, 100%,50%), /* 渐变颜色3，左上角 */
      -3px 3px 10px 0px hsl(0deg, 100%,50%); /* 渐变颜色4，左下角 */

}
</style>