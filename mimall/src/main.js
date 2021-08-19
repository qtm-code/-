import Vue from 'vue'
import router from './router'//把router全部导入
import axios from 'axios'
//把axios挂载到vue上避免多次调用axios
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import App from './App.vue'
// import ElementUI from 'element-ui'
// import env from './env'
// mock开关
const mock = false;
if(mock){
  require('./mock/api');
}
// 根据前端的跨域方式做调整 /a/b : /api/a/b => /a/b
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5dc7afee2b69d9223b633cbb/mimall';
axios.defaults.baseURL = '/api';
//超时8秒
axios.defaults.timeout = 8000; 
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;
// 接口错误拦截
axios.interceptors.response.use(function(response){
  //获取接口返回值
  let res = response.data;
  // 获取地址
  let path = location.hash;
  //状态码为0成功
  if(res.status == 0){
    //返回给axios接口值
    return res.data;

  }else if(res.status == 10){//自定义10是未登录
    if(path!='#/index'){
       window.location.href = '/#/login';
    }
    return Promise.reject(res);
  }else{
    //弹出错误信息
    Message.warning(res.msg);
    return Promise.reject(res);
  }
},(error)=>{
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
});
//Vue.use加载插件
Vue.use(VueAxios,axios);//把axios对象挂载上去，发请求就可以用this调用
Vue.use(VueCookie);
Vue.use(VueLazyLoad,{
  loading:'/imgs/loading-svg/loading-bars.svg'
})
Vue.prototype.$message=Message;
Vue.config.productionTip = false//生产环境默认关闭

new Vue({
  store,
  router,//名字和属性不一样不可缩写即router:routers,
  render: h => h(App),
}).$mount('#app')
