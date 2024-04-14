import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// eslint-disable-next-line vue/multi-word-component-names
app.component('Multiselect', Multiselect)
app.component('VueDatePicker', VueDatePicker)

app.mount('#app')
