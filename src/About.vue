<script setup>
import { onMounted, onUnmounted, ref } from 'vue' // 添加 ref
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ugccLogo from '../public/UGCC.webp'
import starRain from '../public/starRain.webp'
// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger)
import OP from '../public/OP.png'
// 延迟动画初始化
const gameName = ref('') // 添加 gameName ref
const gameIntro = ref('')

onMounted(() => {
    const isMobile = window.innerWidth <= 769;

    ScrollTrigger.create({
        trigger: '.section1',
        start: 'top top',
        end: '+=200% top', // 修改: 将 'bottom top' 保持不变
        pin: true,
        // 设置 toggleActions 为 'restart reverse restart reverse' 以实现反向播放动画
        toggleActions: 'restart reverse restart reverse',
        animation: gsap.timeline({
        })
        .to('.logo', {
            x: isMobile ? '60vw' : '80vw',
            y: isMobile ? '23vh' : '10vh',
            margin: '0',
            scale: 1.8,
            duration: 0.8,
            ease: 'power4.inOut',
        }).to('.logoTitle',{
            opacity:0,
            x: isMobile ? '80vw' : '50vw',
            duration:0.2,
            ease: 'power1.inOut',
        },'-=0.5')
        .to('.slogan',{
            opacity:0,
            x: isMobile ? '-80vw' : '-50vw',
            duration:0.3,
            ease: 'power1.inOut',
        },'-=0.5')
    })
    ScrollTrigger.create({
        trigger: '.section1',
        start: 'top 1%',
        end: '+=200% top', // 修改: 将 'bottom top' 修改为 '+=50% top'
        pin: true,
        scrub: true,
        // 设置 toggleActions 为 'restart reverse restart reverse' 以实现反向播放动画
        toggleActions: 'restart reverse restart reverse',
        animation: gsap.timeline({
        }).to('.feature1',{
            opacity:1,
            y:'-10vh',
            duration:0.5,
            ease: 'power1.inOut',
        }).to('.content1,.starRain',{
            opacity:1,
            y:'-5vh',
            duration:0.5,
            ease: 'power1.inOut',
        },"<0.2").to('.feature1',{
            opacity:0,
            y:'-20vh',
            duration:0.5,
            ease: 'power1.inOut',
        }).to('.content1,.starRain',{
            opacity:0,
            y:'-10vh',
            duration:0.5,
            ease: 'power1.inOut',
        },"<0.2").to('.feature2',{
            opacity:1,
            y:'-10vh',
            duration:'0.5',
            ease: 'power1.inOut',
        }).to('.content2',{
            opacity:1,
            y:'-5vh',
            duration:0.5,
            ease: 'power1.inOut',
        },"<0.2").to('.feature2',{
            opacity:0,
            y:'-20vh',
            duration:0.5,
            ease: 'power1.inOut',
        }).to('.content2',{
            opacity:0,
            y:'-10vh',
            duration:0.5,
            ease: 'power1.inOut',
        },"<0.2")
        // 添加第三个 feature 和 content2 的动画配置
        .to('.feature3',{
            opacity:1,
            y:'-10vh',
            duration:0.5,
            ease: 'power1.inOut',
        }).to('.content3',{
            opacity:1,
            y:'-5vh',
            duration:0.5,
            ease: 'power1.inOut',
        },"<0.2").to('.feature3',{
            opacity:0,
            y:'-20vh',
            duration:0.5,
            ease: 'power1.inOut',
        }).to('.content3',{
            opacity:0,
            y:'-10vh',
            duration:0.5,
            ease: 'power1.inOut',
        },"<0.2")
    })
    ScrollTrigger.create({
        trigger: '.section2',
        start: 'top top',
        end: '+=250% top', // 修改: 将 'bottom top' 保持不变
        pin: true,
        // 设置 toggleActions 为 'restart reverse restart reverse' 以实现反向播放动画
        toggleActions: 'restart reverse restart reverse',
        animation: gsap.timeline({
        }).to('.section2,.section1',{
            backgroundColor:'black',
            left:0
        }).to('.ourGames,.gameName',{
            color:'white'
        }).to('.ourGames span',{
            color:'#6b57ff'
        },'<').to('.gameName',{
            textShadow:'0 8px 10px #6b57ff'
        },'<').to('.ExhibitionArea',{
          boxShadow: '0 0 20px 5px #7F00FF' // 修改: 阴影颜色换成十六进制#6b57ff
        },">0.1"),
        onUpdate: (self) => { // 添加 onUpdate 回调函数
            if (self.progress < 0.33) {
                gameName.value = '监狱建筑师'
                gameIntro.value = '联盟支持的主力游戏，也是联盟内生态规模最大的游戏圈子。玩家需要设计并发展独具个人风格的监狱，并监视并管控你监狱里面每一个犯人的一举一动，面对并解决各类意想不到的事件。'
            } else if (self.progress < 0.66) {
                gameName.value = '112接线员'
                gameIntro.value = '联盟不可或缺的重要活跃社群。在112 Operator中，玩家可以管理全世界任意城市的紧急呼叫中心。派遣救援力量，应答求救电话，直面由天气、交通或者季节变换引发的各种危急状况。帮助城市挺过大大小小的突发事件，比如暴乱、有组织犯罪、恐怖袭击、自然灾害等等。'

            } else {
                gameName.value = '世界征服者'
              gameIntro.value = '《世界征服者4》 是由EasyTech在2017年发布的新一代作品， 采用将军的荣耀与欧陆战争的元素融合而成。并且是EASYTECH第四个采用世界地图的游戏。'

            }
        }
    })
  ScrollTrigger.create({
      trigger: '.section2',
      start: '-=1% top',
      end: 'bottom+=115% top', // 修改: 将 'bottom top' 保持不变
      pin: true,
      scrub: true,
      // 设置 toggleActions 为 'restart reverse restart reverse' 以实现反向播放动画
      toggleActions: 'restart reverse restart reverse',
      animation: gsap.timeline({
      }).fromTo('.ExhibitionArea',{
          x:'0vw'
      },{
          x:'-100vw'
      }).fromTo('.ExhibitionArea',{
        x:'100vw'
      },{
        x:'-100vw',
        backgroundImage: 'url(../public/OP.png)'
      }).fromTo('.ExhibitionArea',{
        x:'100vw'
      },{
        x:'-100vw',
        backgroundImage: 'url(../public/ZFZ.png)'
      })
  })

})

// 添加 onUnmounted 清理 ScrollTrigger 实例
onUnmounted(() => {
    ScrollTrigger.getAll().forEach(st => st.kill())
})
</script>

<template>
  <div class="container">
    <div class="section1">
      <h1 class="logoTitle">UGCC联盟</h1>
      <p class="slogan"><span id="flag">#&nbsp;&nbsp;</span>“致力于服务玩家与各游戏一线模组开发者”</p>
      <img class='logo' :src=ugccLogo>
      <h2 class="feature1"><span>多元</span>——我们涉足的游戏众多</h2>
      <div class="contentFlexBox1">
        <img class='starRain' :src=starRain>
        <p class="content1">无论是模拟经营，还是即时战略，亦或是策略游戏，我们都致力于为玩家打造最完整的游戏生态。</p>
      </div>
      <h2 class="feature2"><span>自主</span>——拥有独立开发团队</h2>
      <div class="contentFlexBox1">
        <p class="content2">我们的所有模组、安装器、网站、论坛亦或是与其相关的周边技术、工具等，均由UGCC技术团队独立开发。我们的所有教程和攻略均由联盟成员贡献</p>
      </div>
      <h2 class="feature3"><span>共享</span>——让成果惠及全部玩家</h2>
      <div class="contentFlexBox3">
        <p class="content3">UGCC联盟承诺，所有我们自主开发的内容，在遵循UGCC开源协议的前提下均可自由修改或基于它们进行二次创作。同时，如果您需要任何支持，请联系我们，我们将会为您提供技术、宣传方面的帮助</p>
      </div>
    </div>

    <div class="section2">
      <h1 class="ourGames">我们<span>涉及</span>的游戏</h1>
      <div class="ExhibitionArea">
      </div>
      <h2 class="gameName">{{ gameName }}</h2>
      <p class="gameIntro">{{gameIntro}}</p>
    </div>

    <div class="section3">
      <h1 class="teamTitle">技术团队与贡献者</h1>
      <h2 class="teamTitleEng">UGCC DEV TEAM</h2>
      <div class="teamContainer">
        <div class="memberCard">
          <img src="../public/nieheihei.jpg">
          <h2>捏嘿嘿</h2>
          <h3 class="littlename">@nieheihei817</h3>
          <p class="describe">本站开发者<br>全改版核心开发者<br>世征TNO模组开发者<br>联盟负责人<br><del>写CSS写到崩溃</del></p>
        </div>
        <div class="memberCard">
          <img src="https://pic.imgdb.cn/item/662c85190ea9cb14030dfb33.jpg">
          <h2>溪辰</h2>
          <h3 class="littlename">@CreekChen</h3>
          <p class="describe">网络安全工程师<br>官网漏洞测试<br>服务端运维<br>联盟资金赞助人</p>
        </div>
        <div class="memberCard">
          <img src="https://pic.imgdb.cn/item/662c86010ea9cb14030fc873.jpg">
          <h2>狐幽鸣酱</h2>
          <h3 class="littlename">@ShitFox8107</h3>
          <p class="describe">优质模组开发者<br>全改版主要开发者<br>联盟B站宣传大使<br>联盟核心成员</p>
        </div>
        <div class="memberCard">
          <img src="https://pic.imgdb.cn/item/662c86b90ea9cb14031316c3.jpg">
          <h2 style="font-size: 1.45em">ArmedImmediatel</h2>
          <h3 class="littlename">@ArmedImmediatel</h3>
          <p class="describe">UGCC安装器开发维护<br>安卓逆向工程<br>世界征服者模组开发者<br>在各个环节发光の小蜜蜂</p>
        </div>
        <div class="memberCard">
          <img src="https://pic1.imgdb.cn/item/678a568cd0e0a243d4f54558.jpg">
          <h2>一只联合国球</h2>
          <h3 class="littlename">@U.N ball</h3>
          <p class="describe">UGCC联盟服务器供应商<br>官网资金赞助人<br>联盟核心成员</p>
        </div>
        <div class="memberCard">
          <img src="https://pic1.imgdb.cn/item/678a599ed0e0a243d4f5461a.jpg">
          <h2>不息的小集</h2>
          <h3 class="littlename">@XIAOJI</h3>
          <p class="describe">官网杰出文章贡献者<br>全改版衍生版本制作人<br>优秀模组贡献者<br>官网测试</p>
        </div>
        <div class="memberCard">
          <img src="https://pic1.imgdb.cn/item/678a5747d0e0a243d4f54594.jpg">
          <h2>折柳zheliu</h2>
          <h3 class="littlename">@zheliu</h3>
          <p class="describe">官网杰出文章贡献者<br>官网资金赞助人<br>官网测试</p>
        </div>
        <div class="memberCard">
          <img src="https://pic1.imgdb.cn/item/678a5855d0e0a243d4f545e3.jpg">
          <h2 >杰基森</h2>
          <h3 class="littlename">@Jackson</h3>
          <p class="describe">112接线员模组开发者<br>112分部负责人</p>
        </div>
        <div class="memberCard">
          <img src="https://pic1.imgdb.cn/item/678a58bbd0e0a243d4f545f5.jpg">
          <h2>散白</h2>
          <h3 class="littlename">@SanBai</h3>
          <p class="describe">官网优秀文章贡献者</p>
        </div>
      </div>

      <div class="community">
        <h1>官方群聊<br>GROUPS</h1>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h1{
  margin-top: 0;
}
@keyframes flag {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
//电脑端
@media (min-width: 769px){
  .logoTitle{
    margin-top: 10vh;
    margin-left: 37vw;
    font-size: 5vw;
  }
  .logo{
    width: 20vw;
    top: 45%;
  }
  .slogan{
    margin: 15vh auto 5vh;
    width: 30vw;
    font-size: 2vw;
  }
  .section1{
    h2{
      font-size: 2em;
      top: 24%;
    }
    .contentFlexBox1{
      font-size: 1.5em;
    }
  }

  .section2{
    .ExhibitionArea{
      width: 18vw;
      height: 18vw;
      right: 40%;
      z-index: -1;
    }
  }

  .section3{
    .teamContainer{
      width:45vw;
    }
  }
}
//移动端
@media (max-width: 769px){
  .logoTitle{
    margin-top: 10vh;
    margin-left: 18vw;
    font-size: 13vw;
  }

  .logo{
    width: 60vw;
    top: 35%;
  }
  .slogan{
    margin: 6vh auto 5vh;
    width: 65vw;
    font-size: 5vw;
  }
  .section1{
    h2{
      font-size: 1.5em;
      top: 25%;
    }
  }
  .section2{
    .ExhibitionArea{
      width: 40vw;
      height: 40vw;
      right: 30%;
    }
  }

  .section3{
    .teamContainer{
      width:88vw;
    }
  }
}
.container{
  overflow-x: hidden;
  overflow-y: hidden;
  .section1{
    height: 100vh;
    position: relative;
    overflow-x: hidden;
    overflow-y: hidden;
    .logoTitle{
      color: transparent;
      /* 应用线性渐变背景到文字 */
      background: linear-gradient(to right, #2ebf91, #8360c3);
      /* 将背景样式应用到文字上 */
      -webkit-background-clip: text;
      background-clip: text;
      position: absolute;
    }
    .logo{
      left: 0;
      right: 0;
      margin: auto; /* 自动计算左右边距，使元素水平居中 */
      display: block;
      z-index: -1;
      position: absolute;
    }
    .slogan{

      font-style: italic;
      text-align: center;
      color: #00668c;
      position: absolute;
      left: 0;
      right: 0;
      top: 15%;
      span{
        font-size: 1.3em;
        animation: flag infinite alternate 1s;

      }
    }
    h2{
      opacity: 0;
      position: absolute;
      margin-left: 5vw;
      color: #00668c;
      span{
        color: transparent;
        font-size: 1.2em;
        /* 应用线性渐变背景到文字 */
        background: linear-gradient(to right, #22c1c3, #fdbb2d);
        /* 将背景样式应用到文字上 */
        -webkit-background-clip: text;
        background-clip: text;
      }
    }
    .contentFlexBox1{
      position: absolute;
      display: flex;
      align-items: center; /* 水平居中对齐 */
      justify-content: center; /* 垂直居中对齐 */
      width: 90vw;
      top: 30vh;
      margin: 0 auto auto;
    }
    .starRain{
      width: 40vw;
      text-align: center;
      opacity: 0;

    }
    .content1{
      color:#556270;
      width: 90vw;
      opacity: 0;
      font-size: 1em;
      margin: 2vh 5vw auto;
      display: inline-block;
      text-align: center;
    }
    .contentFlexBox2{
      position: absolute;
      display: flex;
      align-items: center; /* 水平居中对齐 */
      justify-content: center; /* 垂直居中对齐 */
      width: 90vw;
      top: 20vh;
      margin: 0 auto auto;
    }
    .content2{
      color:#556270;
      width: 90vw;
      opacity: 0;
      font-size: 1.2em;
      margin: 2vh 5vw auto;
      display: inline-block;
      text-align: center;
    }
    .feature2 span{
      color: transparent;
      font-size: 1.2em;
      /* 应用线性渐变背景到文字 */
      background: linear-gradient(to right, #009FFF, #ec2F4B);
      /* 将背景样式应用到文字上 */
      -webkit-background-clip: text;
      background-clip: text;
    }
    .feature3{
      opacity: 0;
      position: absolute;
      top: 25%;
      margin-left: 5vw;
      font-size: 1.5em;
      color: #00668c;
      span{
        color: transparent;
        font-size: 1.2em;
        /* 应用线性渐变背景到文字 */
        background: linear-gradient(to right, #00C9FF, #92FE9D);
        /* 将背景样式应用到文字上 */
        -webkit-background-clip: text;
        background-clip: text;
      }
    }
    .contentFlexBox3{
      position: absolute;
      display: flex;
      align-items: center; /* 水平居中对齐 */
      justify-content: center; /* 垂直居中对齐 */
      width: 90vw;
      top: 30vh;
      margin: 0 auto auto;
    }
    .content3{
      color:#556270;
      width: 90vw;
      opacity: 0;
      font-size: 1.2em;
      margin: 2vh 5vw auto;
      display: inline-block;
      text-align: center;
    }
  }

  .section2{
    height: 100vh;

    position: relative;
    overflow-x: hidden;
    overflow-y: hidden;
    left:0!important;
    .ExhibitionArea{
      background-size: cover;
      background-position: center;
      position: absolute;
      top: 25%;
      opacity: 0.8;
      background-image: url(../public/PA.png);
    }
    .ourGames{
      position: absolute;
      color: #00668c;
      top: 10%;
      left: 5%;
      span{
        color:#00668c;
      }
    }
    .gameName{
      position: absolute;
      z-index: -1;
      top: 45%;
      left: 5%; // 调整为5%，避免布局问题
      font-size: 4em;
    }
    .gameIntro{
      position: absolute;
      color:white;
      top:65%;
      width: 80vw;
      min-height: 20vh;
      left: 5%; // 调整为5%，避免布局问题
      background: rgba(90, 31, 208, .3);
      border: solid 1.5px rgba(90, 31, 208, .5);
      border-radius: 10% 10%;
      padding: 2vh 4vw;
      box-sizing: border-box;
    }
  }
  .section3{

    background:linear-gradient(to top, #6c231c, #0F2027);
    overflow-x: hidden;
    overflow-y: hidden;
    position: relative;
    top:0;
    left:0!important;
    .teamTitle{
      color:beige;
      margin-left: 5%;
      margin-bottom: 0;
      margin-top: 5%;
    }
    .teamTitleEng{
      margin-left: 5%;
      color:beige;
      margin-top: 1%;
      margin-bottom: 10%;
    }
    .teamContainer{
      margin: auto auto;

      .memberCard{
        position: relative;
        display: inline-block;
        border: 1px solid black;
        border-radius: 10px;
        margin-bottom: 10%;
        padding: 2vh 4vw;
        background-image: url("../public/cardBG.png");
        background-size: cover;
        background-color: rgba(243,17,180,.2);
        img{
          width: 30%;
          border-radius: 50%;
        }
        h2{
          position: absolute;
          display: inline-block;
          color: #d88437;
          font-size: 8vw;
          margin-left: 5%;
          margin-top: 8%;
        }
        .littlename{
          display: inline-block;
          position: absolute;
          color: #cccbc8;
          font-size: 4vw;
          margin-left: 5%;
          margin-top: 20%;
        }
        .describe{
          display: inline-block;
          color: #d4eaf7;
          font-size: 1.2em;
          margin-left: 33%;
          margin-bottom: 5%;
        }
      }
    }

    .community{
      h1{
        color:beige;
      }
    }
  }
}
</style>