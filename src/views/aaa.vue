<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单 -->
      <el-form
        :model="loginForm"
        :rules="rules"
        label-width="0px"
        class="login_form"
        ref="LoginFormRef"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button
            type="primary"
            round
            style="background-color: lightcoral; border: 1px solid #eee"
            @click="login"
            >登录</el-button
          >
          <el-button
            type="info"
            round
            style="background-color: #ddd; border: 1px solid #eee"
            @click="resetForm"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//导入登录接口模块
import { loginAPI } from "@/api";
export default {
  data() {
    return {
     // 表单数据对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
     // 表单数据验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户昵称:)", trigger: "blur" },
          {
            min: 2,
            max: 25,
            message: "长度在 2 到 25 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码~~", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6到 15 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //登录方法 再次校验-------------------------------
    login() {
      this.$refs.LoginFormRef.validate(async (result) => {
        if (!result) return;
        const loginData = { ...this.loginForm };
        //发起请求
        const { data: res } = await loginAPI(loginData);
        console.log(res);

        // 显示提示信息
        this.$message(res.meta.msg);
        // 如果失败  则停止执行
        if (res.meta.status !== 200) {
          return;   
        } else {
          // 如果成功
          // 将返回的token 保存到 sessionStorage
          console.log(11);
          window.sessionStorage.setItem("token", res.data.token);
          // 跳转到home页面
          this.$router.push("/home");
        }
      });
    },
    //添加表单重置方法
    resetForm() {
      this.$refs.LoginFormRef.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: lightcoral;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 0 10px #ddd; //阴影
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
   .avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px; //头像图片和头像盒子的距离
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
  background-color: #eee;
}
</style>
