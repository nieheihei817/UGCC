<script setup>
import lightBox from "./views/passageComp/lightBox.vue"
import CircularProgressIndicator from './views/passageComp/CircularProgressIndicator.vue';
import tipBlue from "./views/passageComp/tipBlue.vue"
import tipRed from "./views/passageComp/tipRed.vue"
import {handleAnchor} from "./views/passageComp/script/maodian.js"
import AnchorGuide from "./views/passageComp/AnchorGuide.vue";
import joinUs from './views/passageComp/joinUs.vue'
</script>

<template>
  <div>
    <title>文档编辑器使用教程</title>
    <div id="content">
      <span id="flag">#</span><h1>文档编辑器使用教程</h1>
      <AnchorGuide @click="handleAnchor">
        <div data-hash="UGCCEditor">UGCC编辑器</div>
        <div data-hash="layout">布局介绍</div>
        <div data-hash="toolbar">工具栏</div>
        <div data-hash="edit">编辑区</div>
        <div data-hash="setting">设置区</div>
      </AnchorGuide>
      <tipBlue style="margin-top: 10%">
        <h2 id="solve">注意</h2>
        <li id="UGCCEditor">此文档是为本站编辑者编写的教程，玩家无需阅读此文档</li>
      </tipBlue>
      <h3>UGCC富文本编辑器</h3>
      <p>作为文档开发者，您需要了解并熟练使用本站的富文本编辑器，以创作您的文章。由于QUILL的部分缺陷，本站的编辑器已改为基于<mark>WangEditor</mark>开发，拥有更好的写作体验且支持高度定制，下面我将详细讲解该编辑器的基本功能及使用方法。</p>
      <h3 id="layout">布局介绍</h3>
      <lightBox path="https://pic.imgdb.cn/item/66cc5252d9c307b7e97481a3.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66cc5252d9c307b7e97481a3.png">
        </template>
        <template v-slot:des>请务必注意您的分区！</template>
      </lightBox>
      <p>当您点击“发布文章”后，您会看到上述界面。您需要<mark>事先确定文章所属的分区</mark>,并进行正确的选择。该选项将决定您的文章在网站内的哪一栏目下显示。错误的分区将导致您的文章<mark>被管理员删除！</mark></p>
      <lightBox path="https://pic.imgdb.cn/item/66d12777d9c307b7e90ad3e3.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66d12777d9c307b7e90ad3e3.png">
        </template>
        <template v-slot:des>富文本编辑器</template>
      </lightBox>
      <p>当您选择完毕后，就会进入上述图片的编辑器界面，编辑器从上至下依次分为三大区域，分别是<mark>工具栏</mark>，<mark>编辑区</mark>，<mark>设置区</mark>。单击编辑区域，看见光标即代表您可以进行写作</p>
      <h3 id="toolbar">工具栏</h3>
      <tip-red>
        <h2>非常重要</h2>
        <li>请避免使用华为浏览器，QQ浏览器，百度等浏览器进行编辑，它们的默认选中菜单无法被禁用，可能会在编辑过程中导致一系列不可预料的错误。</li>
      </tip-red>
      <lightBox path="https://pic.imgdb.cn/item/66d127acd9c307b7e90b5d78.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66d127acd9c307b7e90b5d78.png">
        </template>
        <template v-slot:des>工具栏</template>
      </lightBox>
      <p>我将从左至右，从上至下逐一介绍每个工具的用途。如果要将工具的效果套用在文本中，您需要<mark>选中文本</mark>，然后单击工具栏上的图标。如果您使用过word，那么会很容易上手</p>
      <tip-red>
        <h2>非常重要</h2>
        <li>请不要忘记填写编辑器上方的标题，如果没有将无法提交。并且其内部不能含有诸如<>这类非法字符（防止脚本注入攻击）</li>
      </tip-red>
      <p><mark>H1标题（一级标题）</mark>：用于文章内部的章节标题</p>
      <lightBox path="https://pic.imgdb.cn/item/66cc5bead9c307b7e9822e7b.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66cc5bead9c307b7e9822e7b.png">
        </template>
        <template v-slot:des>一级标题</template>
      </lightBox>
      <p><mark>引用块</mark>：提供语义化的引用样式块</p>
      <lightBox path="https://pic.imgdb.cn/item/66cc6307d9c307b7e98d3fd3.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66cc6307d9c307b7e98d3fd3.png">
        </template>
        <template v-slot:des>引用块</template>
      </lightBox>
      <p><mark>加粗</mark>：将所选文本加粗</p>
      <lightBox path="https://pic.imgdb.cn/item/66cc55ced9c307b7e97c6f36.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66cc55ced9c307b7e97c6f36.png">
        </template>
        <template v-slot:des>加粗效果</template>
      </lightBox>

      <p><mark>下划线</mark>：在所选文本下方添加下划线</p>
      <lightBox path="https://pic.imgdb.cn/item/66cc5684d9c307b7e97dd36b.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66cc5684d9c307b7e97dd36b.png">
        </template>
        <template v-slot:des>下划线效果</template>
      </lightBox>

      <p><mark>斜体</mark>：将所选文本斜体</p>
      <lightBox path="https://pic.imgdb.cn/item/66cc563cd9c307b7e97d9919.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66cc563cd9c307b7e97d9919.png">
        </template>
        <template v-slot:des>斜体效果</template>
      </lightBox>

      <p><mark>删除线</mark>：使一条删除线从中间贯穿文本</p>
      <lightBox path="https://pic.imgdb.cn/item/66cc56c9d9c307b7e97e0b94.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66cc56c9d9c307b7e97e0b94.png">
        </template>
        <template v-slot:des>删除线</template>
      </lightBox>

      <p><mark>上下角标</mark>：主要用于数学/物理公式的表示</p>
      <lightBox path="https://pic.imgdb.cn/item/66cc5b2fd9c307b7e981af91.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66cc5b2fd9c307b7e981af91.png">
        </template>
        <template v-slot:des>下角标与上角标</template>
      </lightBox>
      <p><mark>设置文字背景颜色</mark>：可以达到类似于荧光笔的效果</p>
      <lightBox path="https://pic.imgdb.cn/item/66cc618dd9c307b7e988a91b.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66cc618dd9c307b7e988a91b.png">
        </template>
        <template v-slot:des>彩色背景的文字</template>
      </lightBox>
      <p><mark>字号</mark>：改变字体大小</p>
      <lightBox path="https://pic.imgdb.cn/item/66cc575cd9c307b7e97eb6c2.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66cc575cd9c307b7e97eb6c2.png">
        </template>
        <template v-slot:des>HUGE与normal</template>
      </lightBox>
      <tip-red>
        <h2>注意</h2>
        <li>其不能代替h1,h2的语义</li>
      </tip-red>
      <p><mark>字体</mark>：改变字体</p>
      <lightBox path="https://pic.imgdb.cn/item/66cc57b6d9c307b7e97efe26.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66cc57b6d9c307b7e97efe26.png">
        </template>
        <template v-slot:des>不同的预设字体</template>
      </lightBox>
      <p><mark>对齐</mark>：改变文章段落对齐方式</p>
      <tip-red>
        <h2>注意</h2>
        <li>其只能作为编辑时的参考，最终渲染出的文章样式会有所差异</li>
      </tip-red>
      <lightBox path="https://pic.imgdb.cn/item/66cc5992d9c307b7e9806986.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66cc5992d9c307b7e9806986.png">
        </template>
        <template v-slot:des>从上至下依次为左对齐，居中对齐，右对齐，默认对齐</template>
      </lightBox>
      <p><mark>无序列表</mark>：以实心圆开头逐项列出的无序列表，换行自动补全实心圆</p>
      <lightBox path="https://pic.imgdb.cn/item/66cc5a28d9c307b7e980db3e.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66cc5a28d9c307b7e980db3e.png">
        </template>
        <template v-slot:des>无序列表</template>
      </lightBox>
      <p><mark>有序列表</mark>：以数字开头逐项列出的有序列表，换行自动补全数字</p>
      <lightBox path="https://pic.imgdb.cn/item/66cc59d3d9c307b7e9809b44.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66cc59d3d9c307b7e9809b44.png">
        </template>
        <template v-slot:des>有序列表</template>
      </lightBox>

      <p><mark>左/右缩进</mark>：快速向左/右打出四个空格以缩进文本</p>

        <p><mark>超链接文本</mark>：选中文本后使用，输入链接后该文本可被点击，将当前页面跳转至一个新的链接</p>
        <lightBox path="https://pic.imgdb.cn/item/66cc5e4ad9c307b7e983e000.png">
          <template v-slot:image>
            <img src="https://pic.imgdb.cn/item/66cc5e4ad9c307b7e983e000.png">
          </template>
          <template v-slot:des>超链接文本</template>
      </lightBox>
      <p><mark>插入图片</mark>：在当前光标的位置插入一张图片，同时设置图片的描述（如果有的话）</p>
      <tipBlue style="margin-top: 10%">
        <h2 id="solve">提示</h2>
        <li>如果您需要设置图片的描述，请点击铅笔图标，在“图片描述”输入框内输入对应内容即可。如果您不做任何操作，那么默认会使用该图片的文件名，若你不想让图片有任何描述，请记得删除默认描述！！</li>
        <li>如果在第一次插入描述（点击铅笔图标）时无法弹出窗口，可尝试提交文章后进入“修改文章界面”，点击编辑器中的图片后再次插入</li>
      </tipBlue>
      <lightBox path="https://pic.imgdb.cn/item/66cc5f5fd9c307b7e984936f.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66cc5f5fd9c307b7e984936f.png">
        </template>
        <template v-slot:des>编辑表格</template>
      </lightBox>


      <p><mark>插入表格</mark>：在当前光标的位置插入表格，您可以自行设置表格的行列数</p>
      <lightBox path="https://pic.imgdb.cn/item/66e6835bd9c307b7e95498a4.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66e6835bd9c307b7e95498a4.png">
        </template>
        <template v-slot:des>选择表格行列</template>
      </lightBox>
      <lightBox path="https://pic.imgdb.cn/item/66e683e4d9c307b7e955144a.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66e683e4d9c307b7e955144a.png">
        </template>
        <template v-slot:des>编辑表格</template>
      </lightBox>
      <lightBox path="https://pic.imgdb.cn/item/66e68460d9c307b7e9557fbc.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66e68460d9c307b7e9557fbc.png">
        </template>
        <template v-slot:des>渲染出的样式（在文章中实际显示的样式）</template>
      </lightBox>



      <p><mark>插入视频</mark>：功能尚不完善，您应该避免使用！</p>
      <p><mark>改变文字颜色</mark>：新版编辑器提供70种不同的文本颜色来帮您构建彩色文字</p>
      <lightBox path="https://pic.imgdb.cn/item/66cc6090d9c307b7e9867f24.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66cc6090d9c307b7e9867f24.png">
        </template>
        <template v-slot:des>彩色文字</template>
      </lightBox>
      <lightBox path="https://pic.imgdb.cn/item/66d129a4d9c307b7e911adef.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66d129a4d9c307b7e911adef.png">
        </template>
        <template v-slot:des>调色盘</template>
      </lightBox>

      <p><mark>代码块</mark>：支持多种主流编程语言的代码块，提供语法高亮</p>
      <lightBox path="https://pic.imgdb.cn/item/66cc627ad9c307b7e98b9c1a.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66cc627ad9c307b7e98b9c1a.png">
        </template>
        <template v-slot:des>代码块</template>
      </lightBox>

      <p id="edit"><del><mark>数学表达式</mark>:编写数学公式</del><br>该功能已被禁用</p>
      <h3>编辑区</h3>
      <p>该区域用于编辑文章内容，您的光标所指位置即为当前工具效果会应用到的位置。</p>
      <lightBox id="setting" path="https://pic.imgdb.cn/item/66cc6479d9c307b7e98f9405.png">
        <template v-slot:image>
          <img src="https://pic.imgdb.cn/item/66cc6479d9c307b7e98f9405.png">
        </template>
        <template v-slot:des>编辑区</template>
      </lightBox>
      <h3>设置区</h3>
      <p>该区域负责提交文章信息，包括标题、描述、图片等，以及文章内容。</p>

      <p>而当一切准备就绪且检查无误后，您可以点击"提交"按钮将您的文章发布至服务器，我们将把您的文章展示在对应栏目下。发布成功后，您可以在“管理文章”选项中找到并管理您的文章，您需要注意以下几点：</p>
      <tip-red>
        <h2>非常重要</h2>
        <li>本网站中的文章修改功能是不可逆的，请确保您的修改正确且做好了备份工作。修改后您的文章ID将保持不变</li>
        <li>如果您想删除文章，您可以点击删除按钮，但请注意，删除操作也是不可逆的！</li>
        <li>您的一切行为都会记录在网站日志中，请不要试图破坏网站正常功能或撰写恶意文章。如有必要，我们将封禁您的账户，并把相关日志和证据移交至公安机关进行报案</li>
      </tip-red>
      <p>最后，我（捏嘿嘿）代表UGCC联盟网站制作组及游戏开发组预祝您创作顺利，并感谢您对圈子作出的贡献！</p>
      <join-us></join-us>
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
h3{
  font-size: 1.5em;
  margin-top: 1%;
  margin-bottom: 5%;
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