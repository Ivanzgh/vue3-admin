import { ref } from 'vue'

const nowDate = ref('00:00:00')
const getDate = () => {
    const now = new Date()
    const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    const min = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    const sec = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
    nowDate.value = hour + ":" + min + ":" + sec
    setTimeout(getDate, 1000)
}

export { nowDate, getDate }