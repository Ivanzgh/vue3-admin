import { reactive, toRefs } from 'vue'
import axios from 'axios'

export default (url: string) => {
    const state = reactive({
        loading: true,
        loaded: false,
        result: null,
        error: null
    })

    axios.get(url).then(res => {
        state.loading = false
        state.loaded = true
        state.result = res.data
    }).catch(err => {
        state.error = err
        state.loading = false
    })

    return { ...toRefs(state) }
}


