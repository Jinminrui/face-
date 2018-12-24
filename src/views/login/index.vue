<template>
  <div>
    <div class="login-container">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <h3 class="title">Face++人脸识别体验平台</h3>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            v-model="loginForm.username"
            name="username"
            type="text"
            auto-complete="on"
            placeholder="username"
          />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :type="pwdType"
            v-model="loginForm.password"
            name="password"
            auto-complete="on"
            placeholder="password"
            @keyup.enter.native="handleLogin"
          />
          <span
            class="show-pwd"
            @click="showPwd"
          >
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;"
            @click.native.prevent="handleLogin"
          >
            登陆
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="success"
            style="width:100%;"
            @click.native.prevent="handleRegister"
          >
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="register">
      <el-dialog
        :visible.sync="registerFormVisiable"
        :show-close="false"
        title="注册用户"
        width="370px"
      >
        <el-form
          ref="registerForm"
          :rules="formRules"
          :model="temp"
          label-position="left"
          label-width="80px"
          style="width: 100%"
          status-icon
        >
          <el-form-item
            label="用户名"
            prop="username"
          >
            <el-input v-model="temp.username" />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              v-model="temp.password"
              type="password"
            />
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="checkPass"
          >
            <el-input
              v-model="temp.checkPass"
              type="password"
            />
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="temp.phone" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="temp.email" />
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="registerFormVisiable = false">取消</el-button>
          <el-button
            type="primary"
            @click="registerUser"
          >注册并登陆</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import { registerUser } from '@/api/register'
export default {
  name: 'Login',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('请输入正确的用户名'))
    //   } else {
    //     callback()
    //   }
    // }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.temp.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空！' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空！' }]
      },
      temp: {
        username: '',
        password: '',
        checkPass: ''
      },
      formRules: {
        username: [{ required: true, trgger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      registerFormVisiable: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetTemp() {
      this.temp = {
        username: undefined,
        password: undefined,
        phone: '',
        mail: ''
      }
    },
    handleRegister() {
      this.resetTemp()
      this.registerFormVisiable = true
      this.$nextTick(() => {
        this.$refs['registerForm'].clearValidate()
      })
    },
    registerUser() {
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          registerUser(this.temp).then((res) => {
            this.registerFormVisiable = false
            if (res.data.code === '00') {
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            } else if (res.data.code === '01') {
              this.$notify({
                title: '失败',
                message: '用户名已存在',
                type: 'warning',
                duration: 2000
              })
            }
          }).catch(() => {
            this.$notify.error({
              title: '失败',
              message: '请检查您的网络',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
