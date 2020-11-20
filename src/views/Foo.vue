<template>
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

  <Provide />
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  reactive,
  provide,
  readonly,
} from "vue";
import Provide from "@/components/Provide.vue";
import { nowDate, getDate } from "@/hooks/useNowTime";
import axios from "@/utils/axios";
import mousePosition from "@/hooks/useMousePosition";

export default defineComponent({
  name: "App",
  components: {
    Provide
  },
  setup(props, context) {
    console.log(props);
    console.log(context);

    const user = ref(["tom", "jack", "ivan"]);
    const name = ref("");
    const clickName = (index: number) => {
      name.value = user.value[index];
    };

    const { result, loading, loaded } = axios(
      "https://apiblog.jspang.com/default/getGirl"
    );

    const { x, y } = mousePosition();

    const location = ref("beijing");
    const lonlat = reactive({
      lon: 116.6,
      lat: 39.5,
    });
    const updateLocation = () => {
      location.value = "shanghai";
    };
    provide("location", readonly(location));
    provide("lonlat", readonly(lonlat));
    provide("updateLocation", updateLocation);

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
      y,
    };
  },
});
</script>

<style scoped lang="scss"></style>
