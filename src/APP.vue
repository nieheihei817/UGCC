<template>
  <div>
    <div>hi</div>
    <router-view></router-view>
    <ul>
      <router-link to="/films/NowPlaying" custom v-slot="{isActive,navigate}" active-class="nhhActive">
        <li :class="isActive?'nhhActive':''" @click="navigate">here</li>               <!-- 定制router-link最终会变为的标签 -->
      </router-link>
    </ul>
    <button @click="handleClick">tap here</button>  <!-- 编程式导航 -->
    <div>{{now}}</div>
  </div>

</template>

<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue"
const router = useRouter()
const now = ref("")
const handleClick = ()=>{
  router.push("/films/NowPlaying")
}
</script>

<style scoped>
.nhhActive{
  color: #be1e1e;
}
</style>