<template>
  <div class="personal-center">
    <div class="main-wrapper">
      <div class="avatar-wrapper">
        <img
          :src="data.AvatarUrl"
          width="150px"
          height="150px"
        >
      </div>
      <div class="info-wrapper">
        <p class="username">用户名：{{ data.username }}</p>
        <p class="mail">邮箱：{{ data.mail }}</p>
        <p class="phone">电话：{{ data.phone }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfo } from '@/api/login'

export default {
  data() {
    return {
      token: this.$store.state.user.token,
      data: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      getInfo(this.token).then(res => {
        this.data = res.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.personal-center {
  .main-wrapper {
    padding: 32px;
    .avatar-wrapper {
      width: 150px;
      height: 150px;
      img {
        border-radius: 50%;
        border: 1px solid rgb(221, 219, 219);
      }
    }
    .info-wrapper {
      padding-left: 16px;
      font-size: 18px;
      line-height: 30px;
    }
  }
}
</style>
