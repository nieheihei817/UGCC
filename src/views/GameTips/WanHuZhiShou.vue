<script setup>
import lightBox from "../passageComp/lightBox.vue"
import CircularProgressIndicator from '../passageComp/CircularProgressIndicator.vue';
import tipBlue from "../passageComp/tipBlue.vue"
import tipRed from "../passageComp/tipRed.vue"
import {handleAnchor} from "../passageComp/script/maodian.js"
import AnchorGuide from "../passageComp/AnchorGuide.vue";
</script>

<template>
  <div>
    <title>玩忽职守</title>
    <div id="content">
      <span id="flag">#</span><h1>玩忽职守</h1>
      <AnchorGuide @click="handleAnchor">
        <div data-hash="tiaojian">触发条件</div>
        <div data-hash="solve">解决方法</div>
      </AnchorGuide>
      <p id="tiaojian">当发生大规模暴动或伤亡事件导致局面失去控制时，您将会收到来自首席执行官（CEO）的致电，并收到最后通牒。</p>
      <lightBox path="https://imgsa.baidu.com/forum/pic/item/be8e8e3d70cf3bc748e143e0de00baa1cc112a65.jpg">
        <template v-slot:image>
          <img src="https://imgsa.baidu.com/forum/pic/item/be8e8e3d70cf3bc748e143e0de00baa1cc112a65.jpg">
        </template>
        <template v-slot:des>大规模暴动</template>
      </lightBox>
      <tip-red>
        <h2>触发条件</h2>
        <li>监狱内伤亡人数过多</li>
        <li>负债过高</li>
      </tip-red>
      <p>如果您未能在规定时间内控制局势，那么州政府将会介入。其将派遣一支国民警卫队前往您的监狱并对所有正在执行违规行为的囚犯进行<mark>无差别射杀</mark></p>
      <lightBox path="https://pic.imgdb.cn/item/66866fa4d9c307b7e9a3e145.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66866fa4d9c307b7e9a3e145.png">
        </template>
        <template v-slot:des>州政府的国民警卫队</template>
      </lightBox>
      <p>您将被判处“玩忽职守”罪并被送上囚车，然后在监牢中度过余生。如果您是电脑版玩家，那么您将有机会体验一次逃出自己亲手建造的监狱！（逃脱模式被强制启动）</p>
      <tipBlue>
          <h2 id="solve">解决方法</h2>
            <li>在规定时间内完成CEO的要求</li>
            <li>在游戏开始前取消勾选“失败条件”</li>
            <li>避免大规模暴动、瘟疫和负债过多</li>
            <li>在官僚科技树中研究法律辩护(一次性)</li>
      </tipBlue>
      <circular-progress-indicator></circular-progress-indicator>
    </div>
  </div>
</template>

<style scoped>
@keyframes flag {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
ul li{
  font-size: 1.3em;
}
h2{
  margin-top: 0;
  display: inline-block;
}
#content{
  margin-left: 6vw;
  margin-right: 4vw;
}
p{
  font-size: 1.3em;
}
h1{
  display: inline-block;
  font-size: 7vw;
}
img{
  width: 90vw;
  border-radius: 5%;
}
#flag {
  color:#71c4ef;
  font-size: 11vw;
  margin-right: 5vw;
  display: inline-block;
  animation: flag infinite alternate 1s;
}
mark{
  background-color: transparent;
  font-style: italic;
  color: #71c4ef;
  font-size: 1.2em;
}
</style>