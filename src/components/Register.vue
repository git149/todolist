<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="Username" prop="username">
        <el-input
          v-model="registerForm.username"
          placeholder="Username"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="Email" prop="email">
        <el-input v-model="registerForm.email" placeholder="Email"></el-input>
      </el-form-item> -->
      <el-form-item label="Password" prop="password">
        <el-input
          type="password"
          v-model="registerForm.password"
          placeholder="Password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">Register</el-button>
        <el-button type="success" @click="goTologin" >goTologin</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        username: "",
        email: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "Username is required", trigger: "blur" },
        ],
        email: [
          { required: true, message: "Email is required", trigger: "blur" },
          {
            type: "email",
            message: "Invalid email format",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            min: 6,
            message: "Password must be at least 6 characters long",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          const user = {
            username: this.registerForm.username,
            password: this.registerForm.password
          };
          localStorage.setItem('user', JSON.stringify(user));
            //  localStorage.setItem('user_' + this.registerForm.username, JSON.stringify(this.registerForm));
          alert('Registration successful');
          // 可以在这里跳转到登录页面或其他页面
         this.$router.push({ name: 'Login' })
        } else {
          console.log('Validation failed');
          return false;
        }
      });
    },
    goTologin() {
      this.$router.push("/Login");
    },
  },
};
</script>
<style scoped>
.register-container {
  width: 300px;
  margin: 100px auto;
  text-align: center;
}

.register-container .el-form-item {
  margin-bottom: 15px;
}

.register-container .el-button {
  width: 100%;
  margin-bottom: 10px;
}

.register-container .el-button:last-child {
  margin-bottom: 0;
}

</style>