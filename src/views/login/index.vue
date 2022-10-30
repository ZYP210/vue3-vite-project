<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-left">
        <img class="login-left-img enter-x" src="src/assets/svg/login-box-bg.svg" alt="" />
        <div class="login-left-title enter-x">
          <span>{{ VITE_GLOB_LOGIN_TITLE }}</span>
        </div>
      </div>
      <div class="login-right">
        <div class="login-main">
          <p class="login-title enter-x">登录</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalConfig } from "@/hooks/config/useGlobalConfig";
const { VITE_GLOB_LOGIN_TITLE } = useGlobalConfig();
</script>

<style scoped lang="less">
.login {
  &-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow: hidden;

    &::before {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin-left: -48%;
      background-image: url(src/assets/svg/login-bg.svg);
      background-position: 100%;
      background-repeat: no-repeat;
      background-size: auto 100%;
    }
  }

  &-wrapper {
    margin: 0 auto;
    width: 100%;
  }

  &-left,
  &-right {
    position: relative;
    min-height: 500px;
    align-items: center;
    display: flex;
  }

  &-left {
    justify-content: center;
    flex-direction: column;
    color: #fff;
    float: left;
    width: 50%;
    position: relative;
    box-sizing: border-box;

    &-img {
      max-width: 280px;
      transform: translate(-50px);
    }

    &-title {
      margin-top: 60px;
      text-align: center;
      color: #fff;
      letter-spacing: 2px;
      font-size: 28px;
      font-weight: 700;
      transform: translate(-50px);
    }
  }

  &-right {
    border-left: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    color: #fff;
    width: 50%;
    float: left;
    box-sizing: border-box;
  }

  &-main {
    margin: 0 auto;
    padding: 30px 50px;
    width: 70%;
    box-shadow: -4px 5px 10px #fff6;
    box-sizing: border-box;
  }

  &-title {
    color: #000;
    margin-bottom: 50px;
    font-weight: 700;
    font-size: 28px;
    text-align: center;
    letter-spacing: 4px;
    transform: translateX(50px);
  }
}

@media screen and (max-width: 992px) {
  .login {
    &-left {
      width: 100%;
      min-height: auto;

      &-title {
        margin: 20px 0;
        font-size: 24px;
      }

      &-img {
        display: none;
      }
    }

    &-right {
      border-radius: 5px;
      padding: 20px;
      margin: 0 auto;
      width: 100%;
    }

    &-main {
      width: 100%;
      background-color: #fff;
      padding: 10px 20px;
      box-shadow: none;
    }

    &-container {
      &::before {
        margin-left: 0;
      }
    }
  }

  .login-logo {
    padding-top: 30px;
    margin-left: -30px;
  }
}
</style>
