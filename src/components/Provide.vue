<template>
    <h2>location: {{ loc }}</h2>
    <h2>lonlat: [ {{ lonlat.lon }}, {{ lonlat.lat }} ]</h2>
    <button @click="updateLocation">updateLocation</button>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue';

export default defineComponent({
  setup() {
    const loc = inject('location', 'shenzhen')     
    const lonlat = inject('lonlat')
    const updateLocation = inject('updateLocation')

    return {
        loc,
        lonlat,
        updateLocation
    }
  },
})
</script>

<style scoped>

</style>