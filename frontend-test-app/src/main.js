import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap"
import 'bootstrap/dist/js/bootstrap.min'
import 'jquery/dist/jquery.min'

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
