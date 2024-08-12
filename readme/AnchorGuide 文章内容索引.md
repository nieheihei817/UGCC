# AnchorGuide 文章内容索引



## 调用示例

```vue
      <AnchorGuide @click="handleAnchor">
        <div data-hash="tiaojian">触发条件</div>
        <div data-hash="solve">解决方法</div>
      </AnchorGuide>

<!-- 以下内容为对应的锚点位置 -->
<p id="tiaojian">当发生大规模暴动或伤亡事件导致局面失去控制时，您将会收到来自首席执行官（CEO）的致电，并收到最后通牒。</p>
<h2 id="solve">解决方法</h2>
```



组件接收数个带有data-hash参数的div作为文章索引，使用户能够快速找到对应内容

## data-hash

此参数接收字符串格式的元素id作为定位锚点



## 效果图

![](https://pic.imgdb.cn/item/66b9a405d9c307b7e99a5f8f.png)

展开状态：

![](https://pic.imgdb.cn/item/66b9a432d9c307b7e99a9294.png)