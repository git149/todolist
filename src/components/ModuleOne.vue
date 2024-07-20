<template>
  <div>
    <h3>用户协作区</h3>
    <ul v-if="!showAll">
      <li v-for="message in currentPageMessages" :key="message.timestamp">
        <p>
          <strong>{{ message.sender }}:</strong> {{ message.content }}
        </p>
        <p class="timestamp">时间：{{ message.timestamp }}</p>
      </li>
    </ul>
    <ul v-else>
      <div class="message-container" @scroll="handleScroll">
        <ul>
          <li v-for="message in visibleMessages" :key="message.timestamp">
            <p>
              <strong>{{ message.sender }}:</strong> {{ message.content }}
            </p>
            <p class="timestamp">时间：{{ message.timestamp }}</p>
          </li>
        </ul>
      </div>
    </ul>
    <form @submit.prevent="sendMessage">
      <input type="text" v-model="newMessage" placeholder="输入消息内容" />
      <button type="submit">发送</button>
    </form>
    <!-- 分页导航 -->
    <div v-if="!showAll" class="pagination">
      <button @click="prevPage" :disabled="currentPage <= 1">上一页</button>
      <span>第 {{ currentPage }} 页 / 共 {{ pageCount }} 页</span>
      <button @click="nextPage" :disabled="currentPage >= pageCount">
        下一页
      </button>
    </div>
    <button @click="toggleShowAll">
      {{ showAll ? "分页显示" : "长列表展示" }}
    </button>
  </div>
</template>


<script>
export default {
  props: ["taskId"],
  data() {
    return {
      newMessage: "",
      messages: [], // 存储消息的数组
      currentPage: 1, // 当前页码
      perPage: 4, // 每页显示的消息数量
      showAll: false, // 是否显示长列表
      visibleMessagesCount: 10, // 初始显示的消息数量
      incrementCount: 10, // 每次加载的消息数量
    };
  },
  computed: {
    username() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user ? user.username : "未知用户";
    },
    pageCount() {
      return Math.ceil(this.messages.length / this.perPage);
    },
    currentPageMessages() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = this.currentPage * this.perPage;
      return this.messages.slice(start, end);
    },
    visibleMessages() {
      return this.messages.slice(0, this.visibleMessagesCount);
    },
  },

  created() {
    this.loadMessages();
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    sendMessage() {
      const message = {
        content: this.newMessage,
        sender: this.username,
        timestamp: new Date().toISOString(),
      };
      this.messages.push(message);
      this.saveMessages();
      this.newMessage = "";
    },
    saveMessages() {
      localStorage.setItem("messages", JSON.stringify(this.messages));
    },
    loadMessages() {
      const storedMessages = localStorage.getItem("messages");
      if (storedMessages) {
        this.messages = JSON.parse(storedMessages);
      }
    },
    toggleShowAll() {
      this.showAll = !this.showAll;
      if (!this.showAll) {
        this.currentPage = 1; // 重置分页显示的页码
      }
    },
    handleScroll(event) {
      const container = event.target;
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight
      ) {
        this.loadMoreMessages();
      }
    },
    loadMoreMessages() {
      if (this.visibleMessagesCount < this.messages.length) {
        this.visibleMessagesCount += this.incrementCount;
      }
    },
  },
};
</script>
/* UserCollaborationArea.vue */<style scoped>
div {
  font-family: "Arial", sans-serif;
  background: #fff;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  text-align: center;
  color: #333;
}

.message-container {
  max-height: 400px;
  overflow-y: auto;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}

li {
  background: #f9f9f9;
  border-left: 4px solid #007bff;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
}

.timestamp {
  font-size: 0.85em;
  color: #666;
  margin-top: 5px;
}

form {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

input[type="text"] {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 5px;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

/* 响应式设计 */
@media (max-width: 768px) {
  div {
    margin: 10px;
    padding: 10px;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-size: 16px; /* 根据需要调整字体大小 */
}

.pagination button {
  /* 按钮样式 */
  margin: 0 5px; /* 按钮之间的间隔 */
}

.pagination span {
  margin: 0 10px; /* 页码信息与按钮的间隔 */
}
</style>
