# lightBox灯箱



## 调用示例

```vue
<lightBox path="https://pic.imgdb.cn/item/66866fa4d9c307b7e9a3e145.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66866fa4d9c307b7e9a3e145.png">
        </template>
        <template v-slot:des>州政府的国民警卫队</template>
</lightBox>
```

## path

该组件接收一个字符串类型的图片url作为灯箱打开时展示大图的路径参数。生产环境中所有path应均为图床返回的在线url，而非本地路径

## #image

该插槽接收一个img标签作为灯箱未被点击时在文中展示的图片，图片src应与path中的url相同

## #des

该插槽接收一个文本作为对图片的描述，生产环境中用户发布的文章中的图片及其描述将由文章渲染函数进行相应处理

