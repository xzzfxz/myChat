<template>
  <div class="container">
    <div class="form-line">
      <span class="label">用户名：</span>
      <el-input class="input" v-model="state.registerParams.username" />
    </div>
    <div class="form-line">
      <span class="label">密码：</span>
      <el-input class="input" v-model="state.registerParams.password" />
    </div>
    <div class="form-line">
      <span class="label">确认密码：</span>
      <el-input class="input" v-model="state.registerParams.rePassword" />
      <span class="error-msg" v-if="state.showRePwd">两次密码输入不一致</span>
    </div>
    <div class="btn-container">
      <el-button @click="handleRegister">注册</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import Message from '@/utils/message';

const state = reactive({
  registerParams: {
    username: 'admin',
    password: '123456',
    rePassword: '',
  },
  showRePwd: false,
});

// 注册
const handleRegister = () => {
  console.log('注册成功');
  // ElMessage.success('注册成功');
  Message.success('测试');
};
</script>

<style lang="scss" scoped>
.form-line {
  margin-left: 10px;
  padding-top: 10px;
  display: flex;
  align-items: center;
  .label {
    width: 90px;
  }
  .input {
    width: 300px;
  }
  .error-msg {
    color: red;
    font-size: 12px;
  }
}
</style>
