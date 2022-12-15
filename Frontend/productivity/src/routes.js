import Vue from 'vue'
import VueRouter from 'vue-router'
import Log from './views/log.vue'
import Profil from './views/profil.vue'
import Post from './views/post.vue'
import FilActu from './views/Fil-Actu.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/log',
    component: Log,
}]