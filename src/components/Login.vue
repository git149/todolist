<!-- src/views/Login.vue -->
<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
        <el-button type="success" @click="goToRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const storedUser = JSON.parse(localStorage.getItem('user'));
          if (storedUser && storedUser.username === this.loginForm.username && storedUser.password === this.loginForm.password) {
            alert('登录成功');
            localStorage.setItem('currentUser', JSON.stringify({ username: this.loginForm.username }));
            this.$router.push({ path: '/Home' }); 
          } else {
            alert('用户名或密码错误');
          }
        } else {
          console.log('验证失败');
          return false;
        }
      });
    },
    goToRegister() {
      this.$router.push('/register');
    }
  }
}
</script>

<style scoped>
.login-container {
  width: 300px;
  margin: 100px auto;
  text-align: center;
}

.login-container .el-button {
  width: 100%;
  margin-bottom: 10px;
}

.login-container .el-button:last-child {
  margin-bottom: 0;
}
</style>
