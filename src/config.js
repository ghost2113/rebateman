import {Toast} from 'antd-mobile'
import {axios} from 'axios'

//拦截请求
axios.interceptors.request.use(config=>{
  Toast.loading('加载中',0);
  return config;
})

//响应请求
axios.interceptors.response.use(config=>{
  Toast.hide();
  return config;
})