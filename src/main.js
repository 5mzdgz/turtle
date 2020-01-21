import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/iconfont.css'
import '@/assets/styles/reset.css'
import '@/assets/styles/border.css'
import 'vant/lib/index.css'
import '@/assets/styles/common.scss'
import {
  Toast, Button, Tabbar, TabbarItem, Icon, Row, Col, NavBar, RadioGroup, Radio, CountDown, Loading, PullRefresh 
} from 'vant'
import TNavBar from './components/TNavBar'
import http from './http'

Vue.use(Toast).use(Button).use(Tabbar).use(TabbarItem).use(Icon).use(Row).use(Col).use(NavBar)
  .use(RadioGroup).use(Radio).use(Toast).use(CountDown).use(Loading).use(PullRefresh)

Vue.component('t-nav-bar', TNavBar)

Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
