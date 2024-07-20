<!-- src/components/TodoList.vue -->
<template>
  <div class="todo-list">
    <h2>{{ currentUser }}的待办事项清单</h2>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodo" placeholder="添加新的待办事项" />
      <button type="submit">添加待办事项</button>
      <button type="button" @click="removeCompleted">删除已完成</button>
    </form>
    <ul>
      <li v-for="(todo, index) in filteredTodos" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" @change="toggleComplete(todo.id, todo.completed)" />
        <span :class="{ completed: todo.completed }">{{ index + 1 }}. {{ todo.text }}</span>
        <button @click="removeTodo(index)">删除</button>
      </li>
    </ul>
    <p>共有{{ todos.length }}项，还剩{{ remaining }}项未完成</p>
    <div>
      <button @click="filterTodos('all')">全部</button>
      <button @click="filterTodos('active')">待完成</button>
      <button @click="filterTodos('completed')">已完成</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: [],
      filter: 'all',
      currentUser: '' // 存储当前登录用户的信息
    };
  },
  computed: {
    filteredTodos() {
      if (this.filter === 'active') {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.filter === 'completed') {
        return this.todos.filter(todo => todo.completed);
      } else {
        return this.todos;
      }
    },
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        const newTodoItem = { id: Date.now(), text: this.newTodo, completed: false };
        this.todos.push(newTodoItem);
        this.saveTodos();
        this.newTodo = '';
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
      this.saveTodos();
    },
    removeCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
      this.saveTodos();
    },
    toggleComplete(id, completed) {
      const todo = this.todos.find(todo => todo.id === id);
      todo.completed = !completed;
      this.saveTodos();
    },
    filterTodos(filter) {
      this.filter = filter;
    },
    loadTodos() {
      const storedUser = localStorage.getItem('currentUser');
      this.currentUser = storedUser ? JSON.parse(storedUser).username : '未登录用户';
      const storedTodos = JSON.parse(localStorage.getItem(`todos_${this.currentUser}`));
      if (storedTodos) {
        this.todos = storedTodos;
      }
    },
    saveTodos() {
      localStorage.setItem(`todos_${this.currentUser}`, JSON.stringify(this.todos));
    }
  },
  created() {
    this.loadTodos();
  }
};
</script>

<style scoped>
.todo-list {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.todo-list h2 {
  text-align: center;
  margin-bottom: 20px;
}

.todo-list form {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.todo-list input[type="text"] {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}

.todo-list button {
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.todo-list button:hover {
  background-color: #0056b3;
}

.todo-list ul {
  list-style-type: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  transition: opacity 0.5s ease;
  opacity: 1;
}

.todo-list li:last-child {
  margin-bottom: 0;
}

.todo-list li.completed {
  opacity: 0.5;
}

.todo-list li input[type="checkbox"] {
  margin-right: 10px;
}

.todo-list .completed span {
  text-decoration: line-through;
  color: grey;
}

.todo-list button.delete {
  background-color: #ff4949;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-left: auto; /* Align to the right */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.todo-list button.delete:hover {
  background-color: #cc3232;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.filter-buttons button {
  margin: 0 5px;
  padding: 5px 10px;
}
</style>
