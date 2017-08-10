// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import '!style-loader!css-loader!less-loader!./theme/index.less'
import axiosUtil from './utils/axios'
import VueGoodTable from 'vue-good-table'

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(VueGoodTable)

Vue.prototype.$http = axiosUtil

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
