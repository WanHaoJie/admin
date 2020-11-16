import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入animate.css
import animated from 'animate.css';
Vue.use(animated);

//引入封装的axios
import http from './utils/http/index.js';
Vue.prototype.$http = http;

//引入全局过滤器
import './utils/filters/statusFormat.js';

// import 'sass';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
