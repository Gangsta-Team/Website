import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import $ from 'jquery'
window.$ = $;

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import hl from "highlight.js"
import 'highlight.js/styles/default.css';
window.hl = hl

import { marked } from 'marked';
window.marked = marked

import listjs from 'list.js'
window.listjs = listjs;

window.vueapp = createApp(App).use(store).use(router).mount('#app')