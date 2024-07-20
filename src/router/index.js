import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Home from '@/components/Home.vue';
import ModuleOne from '@/components/ModuleOne.vue';
import ModuleTwo from '@/components/ModuleTwo.vue';
import ModuleThree from '@/components/ModuleThree.vue';
import GroupTodoList from '@/components/GroupTodoList.vue';
import TodoList from '@/components/TodoList.vue';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/module-one',
      name: 'ModuleOne',
      component: ModuleOne
    },
    {
      path: '/module-two',
      name: 'ModuleTwo',
      component: ModuleTwo
    },
    {
      path: '/module-three',
      name: 'ModuleThree',
      component: ModuleThree
    },
    {
      path: '/TodoList',
      name: 'TodoList',
      component: TodoList
    },
    {
      path: '/GroupTodoList',
      name: 'GroupTodoList',
      component: GroupTodoList
    }
  ]
});