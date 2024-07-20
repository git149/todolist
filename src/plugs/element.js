import Vue from 'vue'
// 按需导入elementUI 模块
// 1. 导入elementUI 组件和样式文件
import {Button,Form, FormItem} from "element-ui";

// 2.注册elementUI组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)


Vue.prototype.$message = Message
