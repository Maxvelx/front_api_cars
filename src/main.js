import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store_admin from "@/store/modules/admin"
import axios from "axios";


axios.defaults.baseURL = 'http://localhost:8000'

const app = createApp(App)

app.use(router)
app.use(store_admin)

app.mount('#app_admin')
