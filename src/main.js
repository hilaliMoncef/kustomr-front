import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import jwt from './store/jwt'
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/style.scss"
import Toasted from 'vue-toasted'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import VueProgressBar from 'vue-progressbar'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faCog, faPowerOff, faUser, faUsers, faDivide, faBullhorn, faChartBar, faBook, faBriefcase, faShareAlt, faBroadcastTower, faEnvelope, faSearch, faBell, faPlus, faArrowUp, faArrowDown, faFilter, faSort, faEllipsisV, faHandHoldingUsd, faCheckCircle, faTimesCircle, faEuroSign, faPercentage, faCheck, faPen, faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Dropdown from "@/components/utils/Dropdown.vue"
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VModal from 'vue-js-modal'
import excel from 'vue-excel-export'
import VuePaginate from 'vue-paginate'
import Tabs from '@/components/utils/Tabs.vue'
import Tab from '@/components/utils/Tab.vue'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import ToggleButton from 'vue-js-toggle-button'
import VueYoutube from 'vue-youtube'

Vue.config.productionTip = false

// Font awesome
library.add(faHome, faCog, faPowerOff, faUser, faUsers, faDivide, faBullhorn, faChartBar, faBook, faBriefcase, faShareAlt, faBroadcastTower, faEnvelope, faSearch, faBell, faPlus, faArrowUp, faArrowDown, faFilter, faSort, faEllipsisV, faHandHoldingUsd, faCheckCircle, faTimesCircle, faEuroSign, faPercentage, faCheck, faPen, faSync)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// Custom Components
Vue.component('dropdown', Dropdown)

// Moment.js
const moment = require('moment')
require('moment/locale/fr')
 
Vue.use(require('vue-moment'), {
    moment
})

// Toggle Button
Vue.use(ToggleButton)

// Progressbar
Vue.use(VueProgressBar, {
  color: '#17b978',
  failedColor: '#874b4b',
  thickness: '2px'
})

// Vue Loading Overlay
Vue.use(Loading);

// Vue Modal
Vue.use(VModal, { componentName: "modal" })

// Excel export 
Vue.use(excel)

// Pagination
Vue.use(VuePaginate)

// Youtube
Vue.use(VueYoutube)

// Axios config
const baseURL = process.env.VUE_APP_SERVER_URL;
axios.defaults.baseURL = baseURL;
Vue.prototype.$http = axios;

axios.interceptors.response.use((response) => {
  // Return a successful response back to the calling service
  return response;
}, (error) => {
  // Return any error which is not due to authentication back to the calling service
  if (error.response.status !== 401) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  // if coming from Login.vue
  if (error.config.url == '/users/token/') {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  // Logout user if token refresh didn't work or user is disabled
  if (error.config.url == '/users/token/refresh/') {
    store.dispatch("logout").then(() => {
      Vue.toasted.global.success({message: 'Veuillez vous reconnecter.'})
    });
    delete axios.defaults.headers.common["Authorization"];
    router.push('/login');

    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  // Try request again with new token
  return jwt.refreshToken()
    .then((resp) => {
      console.log(resp.data);
      // New request with new token
      const config = error.config;
      store.dispatch('refreshAccessToken', resp.data);
      // Adding to axios defaults
      config.headers["Authorization"] = "Bearer " + resp.data.access;

      return new Promise((resolve, reject) => {
        axios.request(config).then(response => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        })
      });
    })
});

// Using Toasted as error handling frontend
Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 6000,
  keepOnHover: true,
  iconPack: 'fontawesome'
})

Vue.toasted.register('error',
  (payload) => {
    // if there is no message passed show default message
    if (!payload.message) {
      return "Oops.. Something Went Wrong.."
    }
    // if there is a message show it with the message
    return payload.message;
  },
  {
    type: 'error'
  }
)

Vue.toasted.register('success',
  (payload) => {
    // if there is no message passed show default message
    if (!payload.message) {
      return "OK."
    }
    // if there is a message show it with the message
    return payload.message;
  },
  {
    type: 'success'
  }
)

// Layouts components
import Default from "@/layouts/Default.vue"
import Fullpage from "@/layouts/Fullpage.vue"

Vue.component('default-layout', Default)
Vue.component('fullpage-layout', Fullpage)

// Using v-select
Vue.component('v-select', vSelect);

// Custom tabs
Vue.component('tabs', Tabs)
Vue.component('tab', Tab)

// Dropzone file upload
Vue.component('dropzone', vue2Dropzone)

// CTK Datetime Picker
Vue.component('datetime-picker', VueCtkDateTimePicker);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
