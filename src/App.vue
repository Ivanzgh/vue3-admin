<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  <button v-for="(item, index) in user" :key="index" @click="clickName(index)">
    {{ index }} : {{ item }}
  </button>
  <h1>{{ name }}</h1>
  <h1>{{ nowDate }}</h1>
  <button @click="getDate">run time</button>

  <div>
    <h1 v-if="loading">loading</h1>
    <img v-if="loaded" :src="result.imgUrl" alt="" />
  </div>

  <h1>鼠标位置：{{ x }} - {{ y }}</h1>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { nowDate, getDate } from "./hooks/useNowTime";
import axios from "./hooks/axios";
import mousePosition from "./hooks/useMousePosition";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
  setup(props, context) {
    console.log(props);
    console.log(context);
    
    const user = ref(["tom", "jack", "ivan"]);
    const name = ref("");
    const clickName = (index: number) => {
      name.value = user.value[index];
    };

    const { result, loading, loaded } = axios("https://apiblog.jspang.com/default/getGirl");

    const { x, y } = mousePosition()

    return {
      user,
      name,
      clickName,
      nowDate,
      getDate,
      result,
      loading,
      loaded,
      x,
      y
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
