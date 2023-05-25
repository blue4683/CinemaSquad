import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueGlide from 'vue-glide-js'
import 'vue-glide-js/dist/vue-glide.css'

Vue.config.productionTip = false
Vue.use(VueGlide)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
