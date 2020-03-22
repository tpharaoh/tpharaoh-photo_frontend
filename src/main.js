import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Toastr from 'vue-toastr'
import wysiwyg from "vue-wysiwyg";

Vue.use(Toastr)
Vue.use(wysiwyg, {}); // config is optional. more below

//@import "~vue-wysiwyg/dist/vueWysiwyg.css";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
