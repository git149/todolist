//Home
<template>
  <div class="home-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>欢迎页面</span>
            <div class="el-buttoncss">
              <el-button style="float: right" @click="logout"
                >退出当前用户</el-button
              >
              <el-button style="float: right" @click="logout1"
                >注销当前用户</el-button
              >
            </div>
          </div>
          <div class="text item">
            <h2>
              欢迎, <span>{{ username }}</span
              >!
            </h2>
            <p>这里是你的主控制面板，你可以在这里管理你的应用。</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-s-opportunity"></i>
            <span>功能模块一</span>
          </div>
          <div class="text item">
            <TodoList />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-s-management"></i>
            <span>功能模块二</span>
          </div>
          <div class="text item">
            <GroupTodoList @update-tasks-completed="updateTasksCompleted" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-s-tools"></i>
            <span>功能模块三</span>
          </div>
          <div class="text item">
            <ModuleThree :tasksCompleted="tasksCompleted" />
             <router-link to="/module-one">进入另一个组件</router-link>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GroupTodoList from "@/components/GroupTodoList.vue";
import TodoList from "@/components/TodoList.vue";
import ModuleThree from "@/components/ModuleThree.vue";

export default {
  components: {
    TodoList,
    GroupTodoList,
    ModuleThree,
  },
  //  provide(){
  //   return  remaining
  //  },
  data() {
    return {
      tasksCompleted: 0,
    };
  },
  computed: {
    username() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user ? user.username : "未知用户";
    },
  },
  methods: {
    logout() {
      // localStorage.removeItem('user');
      // this.$store.dispatch('logout');
      this.$router.push({ path: "/login" });
    },
    logout1() {
      localStorage.removeItem("user");
      this.$store.dispatch("logout");
      this.$router.push({ path: "/login" });
    },
    loadTodos() {
      const storedTodos = JSON.parse(
        localStorage.getItem(`todos_${this.currentUser}`)
      );
      if (storedTodos) {
        this.todos = storedTodos;
      }
    },
    saveTodos() {
      localStorage.setItem(
        `todos_${this.currentUser}`,
        JSON.stringify(this.todos)
      );
    },
    updateTasksCompleted(tasksCompleted) {
      this.tasksCompleted = tasksCompleted; // 更新任务完成量
    }

  },
  created() {
    this.$on('update-tasks-completed', this.updateTasksCompleted);
  },
  beforeDestroy() {
    this.$off('update-tasks-completed');
  },
};
</script>

<style scoped>
.home-container {
  margin: 30px;
}

.box-card {
  width: 100%;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

h2 {
  font-weight: normal;
  margin-bottom: 8px;
}

h2 span {
  color: #5daf34;
}

.module-link {
  display: block;
  margin-top: 10px;
  color: #409eff;
  text-decoration: none;
}

.module-link:hover {
  text-decoration: underline;
}
</style>