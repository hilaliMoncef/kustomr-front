import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/style.scss"
import Toasted from 'vue-toasted'
import vSelect from 'vue-select'

Vue.config.productionTip = false

// Axios config
const baseURL = process.env.VUE_APP_SERVER_URL;
axios.defaults.baseURL = baseURL;
Vue.prototype.$http = axios;

// Using Toasted as error handling frontend
Vue.use(Toasted, {
  position: 'bottom-center',
  duration: 6000,
  keepOnHover: true,
  iconPack: 'fontawesome'
})

// Layouts components
import Default from "@/layouts/Default.vue"
import Fullpage from "@/layouts/Fullpage.vue"

Vue.component('default-layout', Default)
Vue.component('fullpage-layout', Fullpage)

// Using v-select
Vue.component('v-select', vSelect);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
