import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import router from './router'
import store from './store'

const app = createApp(App)

const toastiSettings = {
  theme: 'colored',
  autoClose: 1500,
  hideProgressBar: true,
  transition: 'slide',
}
// @ts-ignore
app.use(Vue3Toasity, toastiSettings as ToastContainerOptions)

app.use(router)
app.use(store)
app.mount('#app')
