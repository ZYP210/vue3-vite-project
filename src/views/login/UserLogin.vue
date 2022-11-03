<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol" class="login-form">
    <a-form-item class="login-item enter-x-normal" v-bind="validateInfos.name">
      <a-input placeholder="请输入用户名" size="large" @keyup.enter="handleLogin" v-model:value.trim="modelRef.name">
        <template #prefix>
          <user-outlined />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item class="login-item enter-x-normal" v-bind="validateInfos.password">
      <a-input-password
        size="large"
        placeholder="请输入密码"
        @keyup.enter="handleLogin"
        v-model:value="modelRef.password"
        autocomplete="current-password"
      >
        <template #prefix>
          <lock-outlined />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item class="login-item enter-x-normal button">
      <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts" name="UserLogin">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { Form } from "ant-design-vue";

const router = useRouter();
const useForm = Form.useForm;
const labelCol = { span: 4 };
const wrapperCol = { span: 14 };
const modelRef = reactive({
  name: "",
  password: undefined,
});
const rulesRef = reactive({
  name: [
    {
      required: true,
      message: "Please input Activity name",
    },
    {
      min: 3,
      max: 5,
      message: "Length should be 3 to 5",
      trigger: "blur",
    },
  ],
  region: [
    {
      required: true,
      message: "Please select region",
    },
  ],
});
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);
const onSubmit = () => {
  validate()
    .then(() => {
      console.log(toRaw(modelRef));
    })
    .catch((err) => {
      console.log("error", err);
    });
};
const handleLogin = () => {
  router.push("/home");
};
</script>

<style scoped lang="less">
.login {
  &-item {
    justify-content: center;
    align-items: center;
  }
}
.button {
  text-align: center;
}
</style>
