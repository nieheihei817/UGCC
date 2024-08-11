<script setup>
import lightBox from "../passageComp/lightBox.vue"
import CircularProgressIndicator from '../passageComp/CircularProgressIndicator.vue';
</script>

<template>
  <div>
    <title>无供应问题————解决方案</title>
  <div id="content">
  <span id="flag">#</span><h1>“无供应”问题解决方法</h1>

    <circular-progress-indicator></circular-progress-indicator>
  <p>如图，你可能在游玩时遇到过以下问题</p>
    <lightBox path="https://pic.imgdb.cn/item/66499a1bd9c307b7e9ee2713.jpg">
      <template v-slot:image>
        <img src="https://pic.imgdb.cn/item/66499a1bd9c307b7e9ee2713.jpg">
      </template>
      <template v-slot:des><span>"这个监牢不可以访问食堂"</span></template>

    </lightBox>


    <lightBox path="https://pic.imgdb.cn/item/66499b41d9c307b7e9ef9c44.jpg">
      <template v-slot:image>
        <img src="https://pic.imgdb.cn/item/66499b41d9c307b7e9ef9c44.jpg">
      </template>
      <template v-slot:des><span>＂没有任何囚犯被分配在这个食堂吃饭＂</span></template>
    </lightBox>
    <p>通常情况下，造成此类问题的原因是<span style="font-style: oblique">食堂与厨房/牢房的供应链接断开</span>，如果你依次点击菜单中的＂后勤＂，供应后，你会发现如下情况</p>
    <lightBox path="https://pic.imgdb.cn/item/66499d49d9c307b7e9f2d453.jpg">
      <template v-slot:image>
        <img src="https://pic.imgdb.cn/item/66499d49d9c307b7e9f2d453.jpg">
      </template>
      <template v-slot:des>未链接的餐厅</template>
    </lightBox>
    <p>如图，所有食堂与监区的链接线都消失了，代表此时食堂并没有向任何一个牢房供餐，食堂没有正常工作

      此时，请点击<span style="font-style: oblique">“食物分配”</span>，再点击<span style="font-style: oblique">绿色叉子图标</span>后选择<span style="font-style: oblique">“链接”</span>，再点击对应监区来建立食堂对该监区的食物供应</p>
    <lightBox path="https://pic.imgdb.cn/item/66499e9cd9c307b7e9f4ba62.jpg">
      <template v-slot:image>
        <img src="https://pic.imgdb.cn/item/66499e9cd9c307b7e9f4ba62.jpg">
      </template>
      <template v-slot:des>如图所示，出现红线即代表连接正确</template>
    </lightBox>
    <lightBox path="https://pic.imgdb.cn/item/66499f51d9c307b7e9f5c7cd.jpg">
      <img src="https://pic.imgdb.cn/item/66499f51d9c307b7e9f5c7cd.jpg">
    </lightBox>

    <p>再重复此操作，直到将食堂与所有监区建立食物供应，此时问题即可解决</p>
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