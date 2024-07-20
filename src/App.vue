<template>
  <div id="app">
    <router-view />
  </div>
</template>

import register from './components/Register'
import login from './components/Login'
import home from './components/Home'
import todolist from './components/TodoList'
import GroupTodoList from './components/GroupTodoList'
import ModuleThree from './components/ModuleThree.vue'

export default {
  name: 'App',
  components: {
 login,
 register,
 home,
 todolist,
 GroupTodoList,
 ModuleThree
  },

};
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
