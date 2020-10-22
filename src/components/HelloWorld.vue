<template>
  <header>
    <h1>{{ overText }}</h1>
    <button @click="overAction">click me</button>
  </header>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button v-for="(item, index) in list" :key="index" @click="btnFun(index)">
      {{ index }} : {{ item }}
    </button>
    <h1>{{ listName }}</h1>
    <p>{{ count }}</p>
  </div>
  <div class="world">
    <input type="text" v-model="query">
    <p v-for="(item, index) in newsList" :key="index">
      <a :href="item.url" target="_blank">{{ item.title }}</a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onRenderTriggered, ref, watch, computed, watchEffect } from 'vue';

interface DataProps {
  list: string[];
  listName: string;
  btnFun: (index: number) => void;
  query: string;
  newsList: [];
}

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup() {
    console.log('开始创建组件')
    const data: DataProps = reactive({
      list: ['first', 'second', 'third'],
      listName: '',
      btnFun: (index: number) => {
        data.listName = data.list[index]
      },
      query: 'vue',
      newsList: []
    })

    const getData = async (query: string) => {
      const r = await fetch(`https://hn.algolia.com/api/v1/search?query=${query}`).then(r => r.json())
      data.newsList = r.hits
    }

    onBeforeMount(() => {
      console.log('挂载前')
    })

    onMounted(() => {
      console.log('完成挂载')

      // 立即执行
      watchEffect(() => {
        getData(data.query)
      })
    })

    onBeforeUpdate(() => {
      console.log('更新前')
    })

    onUpdated(() => {
      console.log('完成更新')
    })

    onRenderTriggered((event) => {
      console.log('状态触发')
      console.log(event)
    })

    const overText = ref('hello')
    const overAction = () => {
      overText.value = overText.value + 'world'
    }

    watch(overText, (newVal, oldVal) => {
      document.title = newVal
    })

    const count = computed(() => data.list.length)

    return { ...toRefs(data), count, overText, overAction }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
