//import { createApp } from 'vue'
import Vue, { h } from 'vue'
import App from './App.vue'
import router from './routes'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import bootstrap from 'bootstrap/dist/css/'
import VueRouter from 'vue-router'


Vue.use(VueAxios, axios)

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

//createApp(App).mount('#app')
