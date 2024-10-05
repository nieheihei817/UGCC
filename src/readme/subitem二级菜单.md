# subitem二级菜单

## 调用示例

```vue
<subitem class="subitem" :message="Dev">
        <template #title class="title" style="font-size: 4.8vw">开发文档</template>
        <template #item class="item">
          <div>testItem</div>
          <router-link to="/Prison/Tips/1" class="custom-link" @click="hideMenu">无供应问题</router-link>
        </template>
</subitem>
```



## :message

***subitem***在被调用时要求传入一个字符串格式的路径变量，其内容必须与***index.js***中所设置的路由名一致。作用是识别当前路径是否包含变量中的路径，以此来决定此二级菜单是否为选中展开状态(如下图)

![](https://pic.imgdb.cn/item/66b99a7bd9c307b7e99264de.png)

## #title

此具名插槽接收一个template模版作为该二级菜单的显示内容（标题），template中应为文字



## #item

此具名插槽内可写入多个***router-link***作为下拉选项进行路由跳转，同时应将点击事件绑定为hideMenu，以保证跳转后侧边菜单隐藏。需要注意的是，虽然理论上该插槽可以写入其他类型的标签作为下拉选项，但不建议这么做，可能会导致用法混淆
